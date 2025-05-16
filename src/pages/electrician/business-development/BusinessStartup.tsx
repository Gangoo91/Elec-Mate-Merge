
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Briefcase, ArrowLeft, FileText, LucideShieldCheck, CreditCard, Users, Briefcase as BriefcaseSolid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

const BusinessStartup = () => {
  const [openSection, setOpenSection] = useState<string | null>("legal");

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-2">
        <Link to="/electrician/business-development">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Starting an Electrical Business</h1>
      </div>
      
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Briefcase className="h-6 w-6 text-elec-yellow" />
            <CardTitle>Essential Business Startup Guide for UK Electricians</CardTitle>
          </div>
          <CardDescription>Comprehensive guidance to establish your electrical contracting business in the UK market</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-elec-gray/50 p-4 rounded-md border border-elec-yellow/20">
            <p className="font-medium text-elec-yellow mb-2">Why start your own electrical business?</p>
            <p className="text-sm">
              Running your own electrical contracting business offers excellent earning potential, flexibility, and the opportunity to build 
              something of your own. With the UK's ongoing demand for qualified electricians, particularly with the push towards renewable 
              energy and smart home technologies, there's never been a better time to establish your own electrical business.
            </p>
          </div>

          <Collapsible 
            open={openSection === "legal"} 
            onOpenChange={() => toggleSection("legal")}
            className="border rounded-md overflow-hidden border-elec-yellow/20"
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-elec-gray/70">
              <div className="flex items-center gap-3">
                <LucideShieldCheck className="h-5 w-5 text-elec-yellow" />
                <h3 className="font-semibold">Legal Requirements & Qualifications</h3>
              </div>
              <span>{openSection === "legal" ? "−" : "+"}</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-0 border-t border-elec-yellow/20 bg-elec-gray/30">
              <div className="space-y-4 pt-4">
                <div>
                  <h4 className="font-medium mb-2">Essential Qualifications</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Level 3 NVQ Diploma in Electrotechnical Services</li>
                    <li>City & Guilds 2365 Diploma in Electrical Installations</li>
                    <li>18th Edition Wiring Regulations (BS7671)</li>
                    <li>Inspection and Testing qualification (2391 or 2394/2395)</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Competent Person Scheme Registration</h4>
                  <p className="text-sm mb-2">
                    You should register with one of the following competent person schemes:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>NICEIC (National Inspection Council for Electrical Installation Contracting)</li>
                    <li>NAPIT (National Association of Professional Inspectors and Testers)</li>
                    <li>ELECSA</li>
                    <li>SELECT (Scotland)</li>
                  </ul>
                  <p className="text-sm mt-2">
                    These organisations will assess your technical competence and provide certification that allows you to self-certify 
                    your work as compliant with Building Regulations, including Part P for domestic work.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Business Registration</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Register with HMRC as self-employed (sole trader) or establish a limited company via Companies House</li>
                    <li>Register for VAT if your turnover exceeds £85,000 (as of 2023/24 tax year)</li>
                    <li>Set up proper accounting systems to track income and expenses</li>
                    <li>Register with the Information Commissioner's Office (ICO) if handling customer data</li>
                  </ul>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible 
            open={openSection === "financial"} 
            onOpenChange={() => toggleSection("financial")}
            className="border rounded-md overflow-hidden border-elec-yellow/20"
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-elec-gray/70">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-elec-yellow" />
                <h3 className="font-semibold">Financial Planning & Insurance</h3>
              </div>
              <span>{openSection === "financial" ? "−" : "+"}</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-0 border-t border-elec-yellow/20 bg-elec-gray/30">
              <div className="space-y-4 pt-4">
                <div>
                  <h4 className="font-medium mb-2">Essential Insurance</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><span className="font-medium">Public Liability Insurance</span> - Protects against claims for injury or damage caused to third parties or property (typically £2-5 million cover)</li>
                    <li><span className="font-medium">Professional Indemnity Insurance</span> - Covers errors or omissions in your work or advice</li>
                    <li><span className="font-medium">Employers' Liability Insurance</span> - Mandatory if you employ anyone (minimum £5 million cover)</li>
                    <li><span className="font-medium">Tool and Equipment Insurance</span> - Protects your tools against theft, damage or loss</li>
                    <li><span className="font-medium">Personal Accident Insurance</span> - Provides income if you're unable to work due to injury</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Startup Costs Estimation</h4>
                  <p className="text-sm mb-2">Typical startup costs include:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Tools and equipment: £2,000-£5,000</li>
                    <li>Vehicle and signage: £5,000-£15,000</li>
                    <li>Insurance: £500-£1,500 annually</li>
                    <li>Competent person scheme registration: £500-£1,000 annually</li>
                    <li>Accounting software: £10-£30 monthly</li>
                    <li>Marketing and website: £500-£2,000</li>
                    <li>Initial operational costs (3 months): £3,000-£5,000</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Pricing Your Services</h4>
                  <p className="text-sm">
                    When setting your rates, consider:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Your overhead costs (vehicle, tools, insurance, certifications)</li>
                    <li>Material costs and markup (typically 10-20%)</li>
                    <li>Your desired hourly rate (£30-£60 depending on location and expertise)</li>
                    <li>Market rates in your area (research competitors)</li>
                    <li>Include travel time and parking costs</li>
                    <li>Factor in time for quoting and administrative tasks</li>
                  </ul>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible 
            open={openSection === "operations"} 
            onOpenChange={() => toggleSection("operations")}
            className="border rounded-md overflow-hidden border-elec-yellow/20"
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-elec-gray/70">
              <div className="flex items-center gap-3">
                <BriefcaseSolid className="h-5 w-5 text-elec-yellow" />
                <h3 className="font-semibold">Business Operations & Marketing</h3>
              </div>
              <span>{openSection === "operations" ? "−" : "+"}</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-0 border-t border-elec-yellow/20 bg-elec-gray/30">
              <div className="space-y-4 pt-4">
                <div>
                  <h4 className="font-medium mb-2">Essential Business Systems</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><span className="font-medium">Quoting system</span> - Standardised quoting process to ensure accuracy and consistency</li>
                    <li><span className="font-medium">Invoicing system</span> - Professional invoices with clear payment terms</li>
                    <li><span className="font-medium">Job scheduling</span> - System to track and manage appointments</li>
                    <li><span className="font-medium">Document management</span> - For certificates, invoices, and compliance documents</li>
                    <li><span className="font-medium">Customer database</span> - To build and maintain customer relationships</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Effective Marketing Strategies</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><span className="font-medium">Professional website</span> - With examples of your work, services, and contact information</li>
                    <li><span className="font-medium">Google My Business</span> - Essential for local search visibility</li>
                    <li><span className="font-medium">Social media presence</span> - Particularly Facebook and Instagram to showcase work</li>
                    <li><span className="font-medium">Vehicle branding</span> - A mobile billboard for your business</li>
                    <li><span className="font-medium">Local advertising</span> - Community noticeboards, local papers</li>
                    <li><span className="font-medium">Partnerships</span> - With builders, property managers, and estate agents</li>
                    <li><span className="font-medium">Customer reviews</span> - Build and showcase positive feedback</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Building Customer Trust</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Always provide detailed written quotes before starting work</li>
                    <li>Explain work clearly and in non-technical language</li>
                    <li>Be punctual and communicate any delays immediately</li>
                    <li>Leave work areas clean and tidy</li>
                    <li>Provide all necessary certification promptly</li>
                    <li>Offer warranties on your workmanship</li>
                    <li>Follow up after completing jobs</li>
                  </ul>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible 
            open={openSection === "scalability"} 
            onOpenChange={() => toggleSection("scalability")}
            className="border rounded-md overflow-hidden border-elec-yellow/20"
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-elec-gray/70">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-elec-yellow" />
                <h3 className="font-semibold">Growth & Building a Team</h3>
              </div>
              <span>{openSection === "scalability" ? "−" : "+"}</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-0 border-t border-elec-yellow/20 bg-elec-gray/30">
              <div className="space-y-4 pt-4">
                <div>
                  <h4 className="font-medium mb-2">Growing Your Business</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Focus on a specific niche (domestic, commercial, industrial, renewable)</li>
                    <li>Develop recurring revenue streams (maintenance contracts, periodic testing)</li>
                    <li>Expand your service offering (EV chargers, smart home installations)</li>
                    <li>Pursue larger contracts as your capacity grows</li>
                    <li>Invest in efficiency improvements (tools, software, systems)</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Taking on Staff</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Understand employer responsibilities (PAYE, National Insurance, pensions)</li>
                    <li>Consider subcontractors initially before full-time employees</li>
                    <li>Create clear job descriptions and performance expectations</li>
                    <li>Ensure proper health and safety policies are in place</li>
                    <li>Invest in training and development</li>
                    <li>Consider apprenticeships to develop talent with government support</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Common Pitfalls to Avoid</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Undercharging for services</li>
                    <li>Poor cash flow management</li>
                    <li>Taking on too much work too quickly</li>
                    <li>Inadequate record-keeping</li>
                    <li>Not setting aside funds for tax obligations</li>
                    <li>Failing to adapt to regulatory changes</li>
                    <li>Not investing in continued professional development</li>
                  </ul>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <div className="bg-elec-yellow/10 p-4 rounded-md border border-elec-yellow/30 mt-6">
            <h3 className="font-semibold text-elec-yellow mb-2">Expert Tips for Success</h3>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li><span className="font-medium">Focus on reputation</span> - Word-of-mouth is your most powerful marketing tool</li>
              <li><span className="font-medium">Stay current</span> - Keep up with the latest regulations and technology trends</li>
              <li><span className="font-medium">Network effectively</span> - Join trade associations and local business groups</li>
              <li><span className="font-medium">Manage your finances carefully</span> - Set aside tax money and maintain a cash reserve</li>
              <li><span className="font-medium">Value your time</span> - Charge appropriately for your expertise and experience</li>
              <li><span className="font-medium">Invest in quality tools</span> - They increase efficiency and demonstrate professionalism</li>
              <li><span className="font-medium">Consider specialising</span> - Develop expertise in growing areas like renewable energy</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4 pt-0">
          <Separator className="w-full bg-elec-yellow/20" />
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-elec-yellow" />
            <p className="text-sm font-medium">Need more help? Download our comprehensive business startup checklist</p>
          </div>
          <Button className="bg-elec-yellow hover:bg-elec-yellow/80 text-black">
            Download Business Startup Checklist
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BusinessStartup;
