import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  FileText,
  Download,
  ClipboardList,
  Receipt,
  FileCheck,
  Users,
  Shield,
  Calendar,
  CheckCircle,
  ExternalLink,
  Briefcase,
  Calculator,
  PoundSterling,
  Clock,
  Mail,
  Wrench,
  AlertTriangle,
  Star,
} from "lucide-react";
import { BusinessPageLayout, SectionNav, ContentBlock, DataGrid, InfoList } from "@/components/business-hub";

const BusinessTemplates = () => {
  const [activeSection, setActiveSection] = useState("quotes-invoices");

  const sections = [
    { id: "quotes-invoices", label: "Quotes", icon: Receipt },
    { id: "contracts", label: "Contracts", icon: FileCheck },
    { id: "operations", label: "Operations", icon: ClipboardList },
    { id: "hr-safety", label: "HR & Safety", icon: Shield },
  ];

  const keyStats = [
    { label: "Template Types", value: "20+", sublabel: "Essential documents" },
    { label: "Time Saved", value: "5+ hrs", sublabel: "Per week" },
    { label: "Professional", value: "100%", sublabel: "Industry standard" },
    { label: "Customisable", value: "Yes", sublabel: "Your branding" },
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

  const canonical = `${window.location.origin}/electrician/business-development/templates`;

  return (
    <>
      <Helmet>
        <title>Business Templates & Tools | Elec-Mate</title>
        <meta
          name="description"
          content="Professional templates and tools for running your electrical contracting business efficiently."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <BusinessPageLayout
        title="Business Templates"
        subtitle="Professional templates and tools for your electrical business"
        icon={FileText}
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
          {/* Quotes & Invoices Section */}
          <ContentBlock
            id="quotes-invoices"
            title="Quotes & Invoices"
            icon={Receipt}
            summary={
              <p className="text-white">
                Professional quotes and invoices are essential for winning work and getting paid on time.
                Clear, detailed documentation builds trust and reduces disputes.
              </p>
            }
          >
            <div className="space-y-6">
              {/* Quote Templates */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-yellow-400" />
                  Quote Templates
                </h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-white/[0.03] border border-white/10">
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="text-sm font-semibold text-white">Domestic Quote Template</h5>
                      <Star className="h-4 w-4 text-yellow-400" />
                    </div>
                    <p className="text-sm text-white mb-3">Standard quote for residential electrical work with itemised pricing and terms.</p>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 text-xs bg-yellow-400/10 text-yellow-400 rounded-lg border border-yellow-400/20">PDF</span>
                      <span className="px-2 py-1 text-xs bg-white/5 text-white/90 rounded-lg border border-white/10">Word</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-white/[0.03] border border-white/10">
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="text-sm font-semibold text-white">Commercial Quote Template</h5>
                      <Star className="h-4 w-4 text-yellow-400" />
                    </div>
                    <p className="text-sm text-white mb-3">Detailed quote for business clients with project breakdown and payment schedules.</p>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 text-xs bg-yellow-400/10 text-yellow-400 rounded-lg border border-yellow-400/20">PDF</span>
                      <span className="px-2 py-1 text-xs bg-white/5 text-white/90 rounded-lg border border-white/10">Word</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-white/[0.03] border border-white/10">
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="text-sm font-semibold text-white">EICR Quote Template</h5>
                    </div>
                    <p className="text-sm text-white mb-3">Specific quote for Electrical Installation Condition Reports with testing scope.</p>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 text-xs bg-yellow-400/10 text-yellow-400 rounded-lg border border-yellow-400/20">PDF</span>
                      <span className="px-2 py-1 text-xs bg-white/5 text-white/90 rounded-lg border border-white/10">Word</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-white/[0.03] border border-white/10">
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="text-sm font-semibold text-white">EV Charger Quote Template</h5>
                    </div>
                    <p className="text-sm text-white mb-3">Specialised quote for EV charging point installation with grant details.</p>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 text-xs bg-yellow-400/10 text-yellow-400 rounded-lg border border-yellow-400/20">PDF</span>
                      <span className="px-2 py-1 text-xs bg-white/5 text-white/90 rounded-lg border border-white/10">Word</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Invoice Templates */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <PoundSterling className="h-5 w-5 text-yellow-400" />
                  Invoice Templates
                </h4>
                <InfoList
                  variant="checklist"
                  items={[
                    { title: "Standard Invoice", description: "Professional invoice with your logo, payment terms, and bank details. VAT and non-VAT versions available" },
                    { title: "Itemised Invoice", description: "Detailed breakdown of labour, materials, and additional charges for transparency" },
                    { title: "Staged Invoice", description: "For larger projects with multiple payment milestones and progress tracking" },
                    { title: "Credit Note", description: "For refunds or adjustments to previously issued invoices" },
                  ]}
                />
              </div>

              {/* Quote Essentials */}
              <div className="p-4 rounded-xl bg-yellow-400/5 border border-yellow-400/20">
                <h4 className="text-sm font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  What Every Quote Should Include
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Your business details and registration</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Clear scope of work description</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Itemised pricing breakdown</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Payment terms and validity period</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">What's included and excluded</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Warranty and guarantee terms</span>
                  </div>
                </div>
              </div>
            </div>
          </ContentBlock>

          {/* Contracts Section */}
          <ContentBlock
            id="contracts"
            title="Contracts & Terms"
            icon={FileCheck}
            summary={
              <p className="text-white">
                Proper contracts protect both you and your customers. Clear terms and conditions reduce disputes
                and ensure you have legal recourse if things go wrong.
              </p>
            }
          >
            <div className="space-y-6">
              {/* Contract Templates */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <FileCheck className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-base font-semibold text-white">Terms & Conditions</h4>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Comprehensive T&Cs covering payment, liability, warranties, and dispute resolution.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Domestic customer version</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Commercial client version</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Subcontractor version</span>
                    </div>
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Briefcase className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-base font-semibold text-white">Service Agreements</h4>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Contracts for ongoing maintenance, retainer work, and service level agreements.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Maintenance contract template</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Annual inspection agreement</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Emergency call-out terms</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legal Documents */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-yellow-400" />
                  Legal Protection Documents
                </h4>
                <InfoList
                  variant="checklist"
                  items={[
                    { title: "Variation Order Form", description: "Document changes to original scope with pricing and customer approval signatures" },
                    { title: "Completion Certificate", description: "Formal confirmation of job completion with customer sign-off and snag list" },
                    { title: "Warranty Registration", description: "Template for registering warranties with manufacturers and customers" },
                    { title: "Data Protection Notice", description: "GDPR-compliant privacy notice for customer data handling" },
                  ]}
                />
              </div>
            </div>
          </ContentBlock>

          {/* Operations Section */}
          <ContentBlock
            id="operations"
            title="Operations & Admin"
            icon={ClipboardList}
            summary={
              <p className="text-white">
                Streamline your daily operations with checklists, job sheets, and tracking templates.
                Good systems save time and ensure nothing falls through the cracks.
              </p>
            }
          >
            <div className="space-y-6">
              {/* Job Management */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-yellow-400" />
                  Job Management Templates
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-white/[0.03] border border-white/10">
                    <h5 className="text-sm font-semibold text-white mb-2">Job Sheet Template</h5>
                    <p className="text-sm text-white">Record work details, materials used, time spent, and customer signature</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/[0.03] border border-white/10">
                    <h5 className="text-sm font-semibold text-white mb-2">Site Survey Form</h5>
                    <p className="text-sm text-white">Capture site details, existing installation info, and access requirements</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/[0.03] border border-white/10">
                    <h5 className="text-sm font-semibold text-white mb-2">Daily Timesheet</h5>
                    <p className="text-sm text-white">Track time allocation across multiple jobs for accurate billing</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/[0.03] border border-white/10">
                    <h5 className="text-sm font-semibold text-white mb-2">Materials Log</h5>
                    <p className="text-sm text-white">Record materials used per job for inventory and cost tracking</p>
                  </div>
                </div>
              </div>

              {/* Checklists */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-yellow-400" />
                  Operational Checklists
                </h4>
                <InfoList
                  variant="checklist"
                  items={[
                    { title: "Pre-Job Checklist", description: "Ensure you have all tools, materials, and information before arriving on site" },
                    { title: "Installation Completion Checklist", description: "Step-by-step verification that all work meets standards before sign-off" },
                    { title: "Vehicle Stock Checklist", description: "Weekly check of van stock levels to ensure you're always prepared" },
                    { title: "Tool Calibration Tracker", description: "Log for tracking test equipment calibration dates and certificates" },
                  ]}
                />
              </div>

              {/* Tracking Spreadsheets */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <Calculator className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-white">Quote Tracker</p>
                  <p className="text-xs text-white/90 mt-1">Monitor conversions</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <Calendar className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-white">Job Scheduler</p>
                  <p className="text-xs text-white/90 mt-1">Plan your week</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <PoundSterling className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-white">Income Tracker</p>
                  <p className="text-xs text-white/90 mt-1">Monitor cash flow</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <Clock className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-white">Expense Log</p>
                  <p className="text-xs text-white/90 mt-1">Track deductibles</p>
                </div>
              </div>
            </div>
          </ContentBlock>

          {/* HR & Safety Section */}
          <ContentBlock
            id="hr-safety"
            title="HR & Safety"
            icon={Shield}
            summary={
              <p className="text-white">
                Essential documents for managing employees, apprentices, and maintaining workplace safety.
                Compliance with employment and health & safety law is mandatory.
              </p>
            }
          >
            <div className="space-y-6">
              {/* Employment Documents */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-yellow-400" />
                  Employment Documents
                </h4>
                <InfoList
                  variant="checklist"
                  items={[
                    { title: "Employment Contract Template", description: "Standard employment contract covering terms, duties, pay, and benefits. Compliant with UK employment law" },
                    { title: "Apprenticeship Agreement", description: "Formal agreement for apprentice placements including training commitments and supervision" },
                    { title: "Subcontractor Agreement", description: "Contract for self-employed subcontractors covering scope, rates, and CIS requirements" },
                    { title: "Employee Handbook Template", description: "Policies covering conduct, absence, grievance, and disciplinary procedures" },
                  ]}
                />
              </div>

              {/* Safety Documents */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-base font-semibold text-white">Risk Assessments</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Generic electrical work risk assessment</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Working at height risk assessment</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Live working risk assessment</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Site-specific risk assessment template</span>
                    </div>
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-base font-semibold text-white">Method Statements</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Consumer unit replacement RAMS</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Rewire method statement</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">EV charger installation RAMS</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Testing and inspection procedure</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compliance Note */}
              <div className="p-4 rounded-xl bg-yellow-400/5 border border-yellow-400/20">
                <h4 className="text-sm font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Compliance Requirements
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">H&S documentation legally required</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Keep records for 5+ years</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Review risk assessments annually</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Train staff on all procedures</span>
                  </div>
                </div>
              </div>
            </div>
          </ContentBlock>
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-8 p-5 rounded-2xl bg-yellow-400/5 border border-yellow-400/20">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-yellow-400/10 border border-yellow-400/20">
              <Download className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white mb-2">Templates Coming Soon</h3>
              <p className="text-sm text-white leading-relaxed">
                We're currently developing downloadable versions of all these templates. They'll be available
                in Word, Excel, and PDF formats, fully customisable with your business branding. Check back soon
                or sign up for notifications when they're ready.
              </p>
            </div>
          </div>
        </div>
      </BusinessPageLayout>
    </>
  );
};

export default BusinessTemplates;
