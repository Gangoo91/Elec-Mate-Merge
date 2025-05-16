
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCheck, ArrowLeft, CheckCircle, PoundSterling, FileText, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BusinessElectricians = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-2">
        <Link to="/electrician/business-development">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Hiring Electricians</h1>
      </div>
      
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <UserCheck className="h-6 w-6 text-elec-yellow" />
            <CardTitle>Finding the Right Electricians for Your Business</CardTitle>
          </div>
          <CardDescription>Essential guidance for recruiting qualified electricians in the UK</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Having the right team is critical to your electrical business's success. This guide will help you find, evaluate, and hire qualified electricians who will contribute positively to your company.</p>
          
          <Tabs defaultValue="finding" className="mt-6">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="finding">Finding Candidates</TabsTrigger>
              <TabsTrigger value="evaluating">Evaluating Skills</TabsTrigger>
              <TabsTrigger value="costs">Costs & Contracts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="finding" className="space-y-4">
              <h3 className="text-lg font-semibold mb-2">Where to Find Qualified Electricians</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Industry-specific job boards (JIB Jobs, Electrical Careers, etc.)</li>
                <li>Local technical colleges with electrical courses</li>
                <li>Trade associations like ECA and SELECT</li>
                <li>Recommendations from suppliers and wholesalers</li>
                <li>LinkedIn and professional social networks</li>
                <li>Existing employee referrals (establish a referral bonus scheme)</li>
                <li>Local job centres and employment agencies specialising in trades</li>
              </ul>
              
              <div className="bg-amber-50/10 border border-amber-200/20 rounded-md p-4 mt-4">
                <h4 className="font-semibold text-amber-200 flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Pro Tip
                </h4>
                <p className="text-sm mt-1">
                  Develop relationships with local electrical training providers. They can recommend promising students approaching qualification, giving you first access to emerging talent.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="evaluating" className="space-y-4">
              <h3 className="text-lg font-semibold mb-2">What to Look for in a Qualified Electrician</h3>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="qualifications">
                  <AccordionTrigger className="py-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-elec-yellow opacity-80" />
                      <span>Essential Qualifications</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                      <li>Level 3 NVQ Diploma in Electrotechnical Services</li>
                      <li>City & Guilds 2365 Diploma or equivalent</li>
                      <li>18th Edition Wiring Regulations qualification (BS7671)</li>
                      <li>ECS Gold Card or JIB Approved Electrician status</li>
                      <li>BS 7671 Inspection and Testing certification</li>
                      <li>Valid CSCS card for construction site work</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="experience">
                  <AccordionTrigger className="py-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-elec-yellow opacity-80" />
                      <span>Experience & Skills Assessment</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">Evaluate these key areas during interviews and practical assessments:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Experience with similar projects to your business focus</li>
                      <li>Ability to read and interpret electrical diagrams and plans</li>
                      <li>Fault-finding and diagnostic abilities</li>
                      <li>Understanding of different wiring systems and installation methods</li>
                      <li>Knowledge of current regulations and safety requirements</li>
                      <li>Practical demonstration of skills (consider a paid trial day)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="characteristics">
                  <AccordionTrigger className="py-2">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-elec-yellow opacity-80" />
                      <span>Personal Characteristics</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">Beyond technical skills, look for these important traits:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Strong attention to detail and commitment to quality</li>
                      <li>Good communication skills with both colleagues and customers</li>
                      <li>Problem-solving abilities and adaptability</li>
                      <li>Reliability and punctuality (check references carefully)</li>
                      <li>Safety-conscious approach to all work</li>
                      <li>Professional appearance and conduct</li>
                      <li>Ability to work both independently and as part of a team</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <div className="bg-amber-50/10 border border-amber-200/20 rounded-md p-4 mt-4">
                <h4 className="font-semibold text-amber-200 flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Pro Tip
                </h4>
                <p className="text-sm mt-1">
                  Always verify qualifications and certifications directly with issuing bodies. Consider a practical skills assessment for all candidates, regardless of their paper qualifications.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="costs" className="space-y-4">
              <h3 className="text-lg font-semibold mb-2">Employment Costs & Considerations</h3>
              
              <Card className="border border-elec-yellow/20 bg-elec-gray/40 mb-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <PoundSterling className="h-5 w-5 text-elec-yellow" />
                    Salary Ranges (2025 UK Market)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-elec-gray pb-2">
                      <span className="font-medium">Newly Qualified Electrician:</span>
                      <span>£26,000 - £30,000 per annum</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-elec-gray pb-2">
                      <span className="font-medium">Experienced Electrician (3-5 years):</span>
                      <span>£30,000 - £38,000 per annum</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-elec-gray pb-2">
                      <span className="font-medium">Senior Electrician:</span>
                      <span>£38,000 - £45,000 per annum</span>
                    </div>
                    <div className="flex justify-between items-center pb-2">
                      <span className="font-medium">Specialist/Supervisor:</span>
                      <span>£40,000 - £55,000+ per annum</span>
                    </div>
                    <p className="text-sm text-muted-foreground pt-2">
                      *Rates vary by region, with London and South East typically 10-15% higher
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <h4 className="font-medium mt-4">Additional Employment Costs</h4>
              <ul className="list-disc pl-5 space-y-1 mt-1">
                <li>Employer's National Insurance contributions (13.8% above threshold)</li>
                <li>Workplace pension contributions (minimum 3% of qualifying earnings)</li>
                <li>Vehicle costs (£5,000-£10,000 annually per vehicle)</li>
                <li>Tools and equipment allowance (£500-£1,500 annually)</li>
                <li>Training and certification renewal costs (£300-£800 per year)</li>
                <li>Work clothing and PPE (£200-£400 per year)</li>
                <li>Additional insurance costs (employer's liability, etc.)</li>
              </ul>
              
              <h4 className="font-medium mt-4">Employment Contract Essentials</h4>
              <ul className="list-disc pl-5 space-y-1 mt-1">
                <li>Clear job description and responsibilities</li>
                <li>Working hours and overtime arrangements</li>
                <li>Salary, payment schedule, and method</li>
                <li>Probationary period details (typically 3-6 months)</li>
                <li>Holiday entitlement (minimum 28 days including bank holidays)</li>
                <li>Sickness and absence procedures</li>
                <li>Notice periods for termination</li>
                <li>Any restrictive covenants (non-compete clauses, etc.)</li>
              </ul>
              
              <div className="bg-amber-50/10 border border-amber-200/20 rounded-md p-4 mt-4">
                <h4 className="font-semibold text-amber-200 flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Pro Tip
                </h4>
                <p className="text-sm mt-1">
                  Consider offering a tiered pay structure based on qualifications and performance. This provides clear progression paths for employees and incentivises continuous professional development.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-lg">Interview Questions for Electricians</CardTitle>
          <CardDescription>Key questions to help assess candidates effectively</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="technical">
              <AccordionTrigger>Technical Knowledge Questions</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Explain the difference between a RCD and an RCBO and when you would use each.</li>
                  <li>What is the maximum Zs value for a 32A circuit breaker on a standard domestic ring final circuit?</li>
                  <li>Describe the testing sequence you would follow when completing an electrical installation.</li>
                  <li>What amendments were made in the 18th edition regulations regarding surge protection?</li>
                  <li>Explain how you would diagnose and fix a tripping circuit breaker.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="experience">
              <AccordionTrigger>Experience & Scenario Questions</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Describe the most challenging electrical fault you've diagnosed and how you resolved it.</li>
                  <li>Tell me about a time when you had to adapt an installation due to unexpected site conditions.</li>
                  <li>How do you prioritise tasks when working on multiple aspects of an installation?</li>
                  <li>Describe a situation where you identified a potential safety issue and how you addressed it.</li>
                  <li>What types of electrical projects are you most experienced with?</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="personal">
              <AccordionTrigger>Personal & Professional Questions</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>How do you ensure your knowledge stays current with changing regulations?</li>
                  <li>Describe how you would handle a difficult customer who is unhappy with an aspect of your work.</li>
                  <li>How do you maintain quality standards when working under time pressure?</li>
                  <li>What do you consider to be the most important safety practices in electrical work?</li>
                  <li>Where do you see your electrical career developing over the next five years?</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-lg">Employment vs. Subcontracting</CardTitle>
          <CardDescription>Understanding different engagement models</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-elec-yellow/20 rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2">Direct Employment Benefits</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Greater control over scheduling and availability</li>
                <li>Builds team loyalty and company culture</li>
                <li>Consistent quality standards and working practices</li>
                <li>Easier training implementation and skills development</li>
                <li>Potentially better customer service consistency</li>
              </ul>
            </div>
            
            <div className="border border-elec-yellow/20 rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2">Subcontractor Benefits</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Flexibility to scale workforce as needed</li>
                <li>Reduced administrative burden (PAYE, pensions, etc.)</li>
                <li>Specialist skills available without long-term commitment</li>
                <li>Lower overheads during quiet periods</li>
                <li>No requirement for tools and equipment provision</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-amber-50/10 border border-amber-200/20 rounded-md p-4 mt-6">
            <h4 className="font-semibold text-amber-200">Legal Consideration</h4>
            <p className="text-sm mt-1">
              Ensure any subcontractor arrangement meets HMRC's IR35 requirements to avoid potential tax implications. Consult with an accountant familiar with the construction industry to review your arrangements.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/20 bg-elec-gray mt-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Retention Strategies</CardTitle>
          <CardDescription>Key approaches to keep your best electricians</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-medium">Competitive compensation:</span> Regular salary reviews based on market rates and performance</li>
            <li><span className="font-medium">Career progression:</span> Clear paths for advancement and increased responsibility</li>
            <li><span className="font-medium">Ongoing training:</span> Investment in professional development and new skills</li>
            <li><span className="font-medium">Recognition programmes:</span> Acknowledging exceptional work and dedication</li>
            <li><span className="font-medium">Work-life balance:</span> Reasonable hours and flexible working options where possible</li>
            <li><span className="font-medium">Quality tools:</span> Providing high-standard equipment and materials</li>
            <li><span className="font-medium">Team building:</span> Creating a positive and supportive work environment</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessElectricians;
