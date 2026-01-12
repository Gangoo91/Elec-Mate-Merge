import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  Calculator,
  FileText,
  PoundSterling,
  TrendingUp,
  AlertTriangle,
  Clock,
  Shield,
  PiggyBank,
  CheckCircle,
  Building,
  Users,
  Briefcase,
  Receipt,
  Car,
  Wrench,
  Home,
  Phone,
  Wallet,
  BarChart3,
  Calendar,
  CreditCard,
  Banknote,
  Scale,
  Heart,
  Target,
  ArrowUpRight,
} from "lucide-react";
import { BusinessPageLayout, SectionNav, ContentBlock, DataGrid, InfoList } from "@/components/business-hub";

const TaxFinances = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSection = searchParams.get("section") || "structure";
  const setActiveSection = (section: string) => setSearchParams({ section }, { replace: false });

  const sections = [
    { id: "structure", label: "Structure", icon: FileText },
    { id: "expenses", label: "Expenses", icon: Calculator },
    { id: "cashflow", label: "Cash Flow", icon: TrendingUp },
    { id: "vat", label: "VAT & HMRC", icon: PoundSterling },
    { id: "tax-planning", label: "Tax Planning", icon: Clock },
    { id: "insurance", label: "Insurance", icon: Shield },
    { id: "retirement", label: "Pensions", icon: PiggyBank },
  ];

  const keyStats = [
    { label: "Tax Year End", value: "5 April", sublabel: "Plan ahead" },
    { label: "VAT Threshold", value: "£90,000", sublabel: "2024/25" },
    { label: "Personal Allowance", value: "£12,570", sublabel: "Tax-free" },
    { label: "Basic Rate", value: "20%", sublabel: "Up to £50,270" },
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

  const canonical = `${window.location.origin}/electrician/business-development/tax-finances`;

  return (
    <>
      <Helmet>
        <title>Tax & Finances for Electricians | Elec-Mate</title>
        <meta
          name="description"
          content="Comprehensive financial management and tax guidance for UK electrical contractors."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <BusinessPageLayout
        title="Tax & Finances"
        subtitle="Financial management and tax guidance for electrical contractors"
        icon={Calculator}
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
          {/* Business Structure Section */}
          <ContentBlock
            id="structure"
            title="Business Structure"
            icon={FileText}
            summary={
              <p className="text-white">
                Choosing the right business structure affects your tax liability, personal liability, and administrative requirements.
                Most electricians start as sole traders and consider incorporation as they grow.
              </p>
            }
          >
            <div className="space-y-6">
              {/* Structure Comparison */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-base font-semibold text-white">Sole Trader</h4>
                  </div>
                  <p className="text-sm text-white mb-3">
                    The simplest structure. You are the business and personally responsible for all debts and obligations.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Easy to set up - register with HMRC</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Minimal paperwork and accounting</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Keep all profits after tax</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Unlimited personal liability</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs bg-yellow-400/10 text-yellow-400 rounded-lg border border-yellow-400/20">Best under £50k profit</span>
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Building className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-base font-semibold text-white">Limited Company</h4>
                  </div>
                  <p className="text-sm text-white mb-3">
                    A separate legal entity. Limited liability protection, but more compliance requirements.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Limited liability protection</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Corporation Tax often lower than Income Tax</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">More credibility with commercial clients</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">More admin and accountancy costs</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs bg-yellow-400/10 text-yellow-400 rounded-lg border border-yellow-400/20">Best over £50k profit</span>
                  </div>
                </div>
              </div>

              {/* When to Incorporate */}
              <div className="p-4 rounded-xl bg-yellow-400/5 border border-yellow-400/20">
                <h4 className="text-sm font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                  <ArrowUpRight className="h-4 w-4" />
                  When to Consider Incorporating
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Profits consistently exceed £50,000/year</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Need limited liability protection</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Working with corporate clients regularly</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Planning to take on employees</span>
                  </div>
                </div>
              </div>
            </div>
          </ContentBlock>

          {/* Expenses Section */}
          <ContentBlock
            id="expenses"
            title="Allowable Expenses"
            icon={Calculator}
            summary={
              <p className="text-white">
                Claiming all allowable expenses reduces your taxable profit and tax bill.
                Keep receipts and records for all business expenses for at least 6 years.
              </p>
            }
          >
            <div className="space-y-6">
              {/* Expense Categories */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                    <Car className="h-5 w-5 text-yellow-400" />
                    Vehicle & Travel
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Van purchase, lease, or finance costs</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Fuel for business journeys</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Insurance, tax, MOT, repairs</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Parking and congestion charges</span>
                    </div>
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-yellow-400" />
                    Tools & Equipment
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Hand tools and power tools</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Test equipment and calibration</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Safety equipment and PPE</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Tool storage and van racking</span>
                    </div>
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                    <Home className="h-5 w-5 text-yellow-400" />
                    Home Office
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Proportion of rent/mortgage interest</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Utilities (gas, electric, water)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Council tax proportion</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Broadband and office supplies</span>
                    </div>
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-yellow-400" />
                    Business Costs
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Professional memberships and subscriptions</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Insurance premiums (all types)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Training and certification courses</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Accountancy and legal fees</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Record Keeping */}
              <InfoList
                variant="numbered"
                items={[
                  { title: "Keep All Receipts", description: "Store physical or digital copies of all receipts and invoices for at least 6 years" },
                  { title: "Use Accounting Software", description: "FreeAgent, Xero, or QuickBooks make expense tracking and tax returns easier" },
                  { title: "Separate Business Account", description: "Keep business and personal finances separate for clearer record keeping" },
                  { title: "Regular Bookkeeping", description: "Update records weekly to avoid year-end scramble and missed claims" },
                ]}
              />
            </div>
          </ContentBlock>

          {/* Cash Flow Section */}
          <ContentBlock
            id="cashflow"
            title="Cash Flow Management"
            icon={TrendingUp}
            summary={
              <p className="text-white">
                Cash flow is the lifeblood of your business. Poor cash flow is the number one cause of business failure,
                even for profitable businesses. Plan ahead for tax payments and quiet periods.
              </p>
            }
          >
            <div className="space-y-6">
              {/* Cash Flow Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <p className="text-2xl font-bold text-white">3-6 mo</p>
                  <p className="text-xs text-white/90 mt-1">Reserve target</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <p className="text-2xl font-bold text-white">14-30</p>
                  <p className="text-xs text-white/90 mt-1">Days payment terms</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <p className="text-2xl font-bold text-white">25-50%</p>
                  <p className="text-xs text-white/90 mt-1">Deposit target</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <p className="text-2xl font-bold text-white">30%</p>
                  <p className="text-xs text-white/90 mt-1">Tax reserve</p>
                </div>
              </div>

              {/* Cash Flow Tips */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-yellow-400" />
                  Cash Flow Best Practices
                </h4>
                <InfoList
                  variant="checklist"
                  items={[
                    { title: "Collect Deposits", description: "Request 25-50% deposits on larger jobs to cover material costs and secure commitment" },
                    { title: "Invoice Immediately", description: "Send invoices on job completion day with clear payment terms and bank details" },
                    { title: "Chase Promptly", description: "Follow up on overdue invoices at 7, 14, and 21 days with increasing urgency" },
                    { title: "Build Reserves", description: "Set aside 30% of income for tax and maintain 3-6 months operating expenses in reserve" },
                  ]}
                />
              </div>

              {/* Payment Terms */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Receipt className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-base font-semibold text-white">Domestic Customers</h4>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Payment on completion is standard. Consider card payments for convenience and faster settlement.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Accept card payments (2-3% fee)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Bank transfer for larger jobs</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Cash with written receipt</span>
                    </div>
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Building className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-base font-semibold text-white">Commercial Customers</h4>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Formal invoicing with 14-30 day payment terms. Factor cash flow impact into pricing.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Professional invoices with PO numbers</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Stage payments for larger projects</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Credit check new commercial clients</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ContentBlock>

          {/* VAT Section */}
          <ContentBlock
            id="vat"
            title="VAT & HMRC"
            icon={PoundSterling}
            summary={
              <p className="text-white">
                VAT registration is mandatory when your taxable turnover exceeds £90,000 (2024/25 threshold).
                You can voluntarily register earlier, which has pros and cons to consider.
              </p>
            }
          >
            <div className="space-y-6">
              {/* VAT Schemes */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Scale className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-base font-semibold text-white">Standard VAT</h4>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Charge 20% VAT to customers, reclaim VAT on business purchases. Good if you have significant VAT-able expenses.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Reclaim VAT on all business purchases</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Better for high material costs</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">More admin and record keeping</span>
                    </div>
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Calculator className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-base font-semibold text-white">Flat Rate Scheme</h4>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Pay a fixed percentage of gross turnover (14.5% for electricians). Simpler but can't reclaim VAT on purchases.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Simpler quarterly returns</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Better for labour-heavy work</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Can't reclaim VAT on purchases</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Deadlines */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-yellow-400" />
                  Key Tax Deadlines
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-white">Self Assessment Registration</span>
                      <span className="text-xs text-yellow-400">5 October</span>
                    </div>
                    <p className="text-sm text-white/90">Register by 5 Oct after year you started</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-white">Paper Tax Return</span>
                      <span className="text-xs text-yellow-400">31 October</span>
                    </div>
                    <p className="text-sm text-white/90">Paper returns due 31 Oct</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-white">Online Tax Return</span>
                      <span className="text-xs text-yellow-400">31 January</span>
                    </div>
                    <p className="text-sm text-white/90">Online returns and payment due 31 Jan</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-white">Second Payment on Account</span>
                      <span className="text-xs text-yellow-400">31 July</span>
                    </div>
                    <p className="text-sm text-white/90">Second payment on account due 31 Jul</p>
                  </div>
                </div>
              </div>

              {/* CIS Information */}
              <div className="p-4 rounded-xl bg-yellow-400/5 border border-yellow-400/20">
                <h4 className="text-sm font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                  <Banknote className="h-4 w-4" />
                  Construction Industry Scheme (CIS)
                </h4>
                <p className="text-sm text-white mb-3">
                  If you work for contractors, they must deduct CIS tax (usually 20%) from your payments. Register as a subcontractor to reduce this to 0% once you have a good compliance record.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Standard deduction: 20%</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Gross payment status: 0%</span>
                  </div>
                </div>
              </div>
            </div>
          </ContentBlock>

          {/* Tax Planning Section */}
          <ContentBlock
            id="tax-planning"
            title="Tax Planning"
            icon={Clock}
            summary={
              <p className="text-white">
                Proactive tax planning legally minimises your tax liability. The key is timing income and expenses,
                maximising allowances, and choosing the right business structure.
              </p>
            }
          >
            <div className="space-y-6">
              {/* Tax Saving Strategies */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5 text-yellow-400" />
                  Tax Saving Strategies
                </h4>
                <InfoList
                  variant="checklist"
                  items={[
                    { title: "Maximise Pension Contributions", description: "Contributions reduce taxable profit. Up to £60,000/year or 100% of earnings (whichever is lower)" },
                    { title: "Claim All Allowable Expenses", description: "Many electricians miss legitimate expenses. Review regularly with your accountant" },
                    { title: "Use Annual Investment Allowance", description: "100% tax relief on qualifying equipment up to £1 million per year" },
                    { title: "Time Income and Expenses", description: "Bring forward expenses or delay income near year end if beneficial" },
                  ]}
                />
              </div>

              {/* Tax Rates 2024/25 */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-yellow-400" />
                  Income Tax Rates 2024/25
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-white">Personal Allowance</span>
                      <span className="text-xs text-yellow-400">0%</span>
                    </div>
                    <p className="text-sm text-white/90">£0 - £12,570</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-white">Basic Rate</span>
                      <span className="text-xs text-yellow-400">20%</span>
                    </div>
                    <p className="text-sm text-white/90">£12,571 - £50,270</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-white">Higher Rate</span>
                      <span className="text-xs text-yellow-400">40%</span>
                    </div>
                    <p className="text-sm text-white/90">£50,271 - £125,140</p>
                  </div>
                </div>
              </div>
            </div>
          </ContentBlock>

          {/* Insurance Section */}
          <ContentBlock
            id="insurance"
            title="Business Insurance"
            icon={Shield}
            summary={
              <p className="text-white">
                Adequate insurance protects you from financial ruin due to accidents, claims, or unexpected events.
                Public liability is essential; other covers depend on your work type and risk level.
              </p>
            }
          >
            <div className="space-y-6">
              {/* Essential Insurance */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-yellow-400" />
                  Essential Insurance Cover
                </h4>
                <InfoList
                  variant="checklist"
                  items={[
                    { title: "Public Liability (£2-5m)", description: "Covers injury to third parties and damage to their property. Essential for all electricians. Typically £150-300/year" },
                    { title: "Employers Liability (£10m)", description: "Legal requirement if you employ anyone, including apprentices. Around £100-200/year" },
                    { title: "Professional Indemnity", description: "Covers claims arising from your professional advice or design work. Important for certification. £200-400/year" },
                    { title: "Tools & Equipment", description: "Covers theft, loss, or damage to tools. Van insurance may have limited cover. £100-300/year" },
                  ]}
                />
              </div>

              {/* Additional Cover */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Car className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-base font-semibold text-white">Vehicle Insurance</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Commercial vehicle insurance required</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Include goods in transit cover</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Breakdown cover for work vehicles</span>
                    </div>
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Heart className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-base font-semibold text-white">Personal Protection</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Income protection insurance</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Critical illness cover</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Life insurance for dependents</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ContentBlock>

          {/* Retirement Section */}
          <ContentBlock
            id="retirement"
            title="Pensions & Retirement"
            icon={PiggyBank}
            summary={
              <p className="text-white">
                Self-employed workers don't have employer pension contributions, making personal pension planning essential.
                Contributions reduce your tax bill while building retirement savings.
              </p>
            }
          >
            <div className="space-y-6">
              {/* Pension Options */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <PiggyBank className="h-5 w-5 text-yellow-400" />
                  Pension Options for Self-Employed
                </h4>
                <InfoList
                  variant="checklist"
                  items={[
                    { title: "Personal Pension (SIPP)", description: "Flexible pension with wide investment choice. Contributions get tax relief at your marginal rate" },
                    { title: "Stakeholder Pension", description: "Simple, low-cost pension with capped charges. Good starting option with lower amounts" },
                    { title: "NEST Pension", description: "Government-backed, low-cost option. Simple to set up and manage with flexible contributions" },
                  ]}
                />
              </div>

              {/* Pension Benefits */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <p className="text-2xl font-bold text-white">£60k</p>
                  <p className="text-xs text-white/90 mt-1">Annual allowance</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <p className="text-2xl font-bold text-white">20-45%</p>
                  <p className="text-xs text-white/90 mt-1">Tax relief rate</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <p className="text-2xl font-bold text-white">25%</p>
                  <p className="text-xs text-white/90 mt-1">Tax-free at 55</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <p className="text-2xl font-bold text-white">55-57</p>
                  <p className="text-xs text-white/90 mt-1">Access age</p>
                </div>
              </div>

              {/* Planning Tips */}
              <div className="p-4 rounded-xl bg-yellow-400/5 border border-yellow-400/20">
                <h4 className="text-sm font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Retirement Planning Tips
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Start early - compound growth matters</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Aim for 10-15% of income</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Consider spouse contributions</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Review annually with advisor</span>
                  </div>
                </div>
              </div>
            </div>
          </ContentBlock>
        </div>

        {/* Disclaimer Card */}
        <div className="mt-8 p-5 rounded-2xl bg-yellow-400/5 border border-yellow-400/20">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-yellow-400/10 border border-yellow-400/20">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white mb-2">Important Disclaimer</h3>
              <p className="text-sm text-white leading-relaxed">
                This information is for general guidance only and does not constitute professional financial
                or tax advice. Tax laws change frequently. Always consult a qualified accountant or tax
                advisor for advice specific to your business.
              </p>
            </div>
          </div>
        </div>
      </BusinessPageLayout>
    </>
  );
};

export default TaxFinances;
