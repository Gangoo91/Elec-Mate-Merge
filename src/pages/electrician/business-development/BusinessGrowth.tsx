
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, ArrowLeft, Rocket, Award, Star, Briefcase, Users, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import BusinessTips from "@/components/electrician/business/BusinessTips";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { logger } from "@/utils/logger";

const BusinessGrowth = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  
  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
    logger.debug(`Toggled section: ${section}`);
  };
  
  const saveToFavourites = () => {
    toast({
      title: "Saved to favourites",
      description: "This growth guide has been saved to your favourites",
      variant: "success",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="flex items-center gap-2">
        <Link to="/electrician/business-development">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Growing Your Electrical Business</h1>
      </div>
      
      <Card className="border-elec-yellow/20">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-elec-yellow" />
            <div>
              <div className="flex items-center gap-2">
                <CardTitle>Business Growth Strategies</CardTitle>
                <Badge variant="yellow" className="ml-2">UK Guide</Badge>
              </div>
              <CardDescription>Comprehensive strategies for expanding your electrical contracting business in the UK market</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert className="border-elec-yellow/20 bg-elec-yellow/5">
            <AlertTitle className="flex items-center gap-2">
              <Star className="h-4 w-4" /> Success Mindset
            </AlertTitle>
            <AlertDescription>
              Growing an electrical business requires both technical expertise and business acumen. This guide offers practical strategies tailored for UK electrical contractors looking to expand their operations.
            </AlertDescription>
          </Alert>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="market-positioning">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-elec-yellow" />
                  <span>Market Positioning & Specialisation</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-slate-200">
                <p>Determining your niche within the electrical industry can significantly impact your growth potential:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Consider specialising in high-demand areas such as electric vehicle charging points, renewable energy installations, or smart building technology</li>
                  <li>Research local market needs—some areas may lack electrical contractors who specialise in commercial installations or specific industrial work</li>
                  <li>Obtain additional certifications that differentiate your business (e.g., EV charge point certification, solar PV installation, or energy efficiency assessments)</li>
                  <li>Position your business as an authority in a specific sector rather than attempting to compete on all fronts</li>
                  <li>Track emerging trends in the electrical industry, such as green energy solutions that are receiving government incentives</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="marketing">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-elec-yellow" />
                  <span>Effective Marketing Strategies</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-slate-200">
                <p>Building visibility in your local market and beyond:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Create a professional website optimised for local SEO with clear information about your services and qualifications</li>
                  <li>Establish Google Business Profile and ensure your business appears on local maps</li>
                  <li>Generate customer reviews on TrustPilot, Checkatrade, or MyBuilder to build credibility</li>
                  <li>Consider targeted Facebook and Instagram advertising for specific services within defined geographic areas</li>
                  <li>Develop relationships with local estate agents, property managers and building contractors who can refer business</li>
                  <li>Create informative content about electrical safety, energy efficiency tips or maintenance advice on your website and social media</li>
                  <li>Consider branded vehicles, which serve as mobile billboards throughout your service area</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="operations">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-elec-yellow" />
                  <span>Operational Excellence & Efficiency</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-slate-200">
                <p>Streamline your processes to handle increased workload:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Implement job management software like SimPRO, Tradify or ServiceM8 to streamline scheduling, quotations, and invoicing</li>
                  <li>Develop standardised processes for common electrical jobs to ensure consistent quality</li>
                  <li>Create digital forms for site surveys, quotes and certification to reduce paperwork</li>
                  <li>Establish relationships with reliable suppliers for preferential pricing and account terms</li>
                  <li>Review travel routes and job clustering to minimise travel time between appointments</li>
                  <li>Consider inventory management systems to track stock levels and reduce waste</li>
                  <li>Set up automated payment reminders to improve cash flow and reduce chasing late payments</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="team">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-elec-yellow" />
                  <span>Team Building & Development</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-slate-200">
                <p>Growing beyond a one-person operation:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Consider hiring apprentices through recognised UK apprenticeship schemes with government incentives</li>
                  <li>Build relationships with local colleges offering electrical courses for potential recruitment</li>
                  <li>Explore flexible working arrangements like subcontractors for handling peak workloads</li>
                  <li>Invest in continuous professional development for yourself and your team to stay current with regulations</li>
                  <li>Consider specialist roles as you grow, such as a dedicated estimator or project manager</li>
                  <li>Establish clear procedures and training protocols to maintain quality as your team expands</li>
                  <li>Research employment grant schemes available for small businesses in your region</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="finance">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-elec-yellow" />
                  <span>Financial Management & Growth Funding</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-slate-200">
                <p>Managing and funding your business growth:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Work with an accountant who understands construction and trades businesses to maximise tax efficiency</li>
                  <li>Consider asset finance for vehicle or equipment purchases rather than outright buying</li>
                  <li>Research Small Business Grants through your Local Enterprise Partnership (LEP)</li>
                  <li>Explore the UK Government's Enterprise Finance Guarantee for business expansion loans</li>
                  <li>Monitor key financial metrics like gross profit margin per job type to focus on the most profitable work</li>
                  <li>Consider factoring or invoice financing to improve cash flow on larger commercial projects</li>
                  <li>Build a cash reserve for expansion opportunities or unexpected business challenges</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="diversification">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-elec-yellow" />
                  <span>Service Diversification</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-slate-200">
                <p>Expanding your service offerings strategically:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Consider offering electrical maintenance contracts to commercial clients for recurring revenue</li>
                  <li>Explore complementary services like PAT testing, fire alarm installation or security system installation</li>
                  <li>Research emerging technologies like home automation systems or energy monitoring</li>
                  <li>Consider getting approved for grant-funded work like ECO4 energy efficiency measures</li>
                  <li>Evaluate potential for electrical condition reports (EICR) for landlords with multiple properties</li>
                  <li>Develop partnerships with other trades to offer comprehensive property services</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full border-elec-yellow/30 hover:bg-elec-yellow/10 flex items-center justify-center gap-2">
                <Lightbulb className="h-4 w-4" />
                <span>Show Success Stories</span>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <Card className="border-elec-yellow/20 bg-elec-gray/50 p-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Real-World Growth Examples</CardTitle>
                  <CardDescription>How UK electrical businesses achieved sustainable growth</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-elec-yellow">Manchester Electrical Services</h4>
                    <p className="text-sm">Started as a one-person operation in 2017, specialised in commercial emergency call-outs, grew to a team of 8 within three years by focusing on 4-hour response guarantees for retail clients.</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-elec-yellow">South Coast Electricians</h4>
                    <p className="text-sm">Expanded from domestic work to specialise in holiday let electrical safety certificates across the south coast, creating a consistent revenue stream during traditional quiet periods.</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-elec-yellow">GreenSpark Electrical</h4>
                    <p className="text-sm">Pivoted to focus exclusively on renewable energy installations, particularly solar PV and battery storage, growing from £120k to £1.2m turnover in two years through government green home initiatives.</p>
                  </div>
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>
          
          <BusinessTips />
          
          <div className="flex justify-end mt-4">
            <Button 
              variant="study" 
              className="text-elec-yellow border-elec-yellow/50 hover:bg-elec-yellow/10"
              onClick={saveToFavourites}
            >
              Save to Favourites
            </Button>
          </div>
        </CardContent>
      </Card>
      
    </div>
  );
};

export default BusinessGrowth;
