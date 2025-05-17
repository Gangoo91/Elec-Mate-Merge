
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ArrowLeft, Target, Award, Star, TrendingUp, MessageSquare, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import BusinessTips from "@/components/electrician/business/BusinessTips";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { logger } from "@/utils/logger";

const BusinessCustomers = () => {
  const saveToFavourites = () => {
    toast({
      title: "Saved to favourites",
      description: "This customer acquisition guide has been saved to your favourites",
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
        <h1 className="text-2xl font-bold">Customer Acquisition for Electricians</h1>
      </div>
      
      <Alert className="border-elec-yellow/20 bg-elec-yellow/5">
        <AlertTitle className="flex items-center gap-2">
          <Target className="h-4 w-4" /> Strategic Approach
        </AlertTitle>
        <AlertDescription>
          Building a solid customer base requires both strategy and consistency. This comprehensive guide offers proven methods for UK electrical contractors to attract, convert and retain valuable customers.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Market Research & Targeting Card */}
        <Card className="border-elec-yellow/20">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <Target className="h-6 w-6 text-elec-yellow" />
              <div>
                <CardTitle>Market Research & Customer Targeting</CardTitle>
                <CardDescription>Understanding your ideal customers and market positioning</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-slate-200">
            <p>Effective customer acquisition begins with identifying precisely who your ideal clients are:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Conduct local market research to identify underserved niches (e.g., smart home installations, rapid response emergency services, etc.)</li>
              <li>Analyse demographic data from your local council to identify areas with higher concentrations of your target customers</li>
              <li>Create customer personas for different market segments (homeowners, landlords, commercial property managers, etc.)</li>
              <li>Research typical customer journey for electrical services in your region</li>
              <li>Evaluate competitors' strengths and weaknesses through Google reviews and local reputation</li>
              <li>Consider seasonal demand patterns specific to your area to plan marketing efforts accordingly</li>
              <li>Identify client pain points through surveys with existing customers</li>
            </ul>
          </CardContent>
        </Card>
        
        {/* Digital Marketing Strategies Card */}
        <Card className="border-elec-yellow/20">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-elec-yellow" />
              <div>
                <CardTitle>Digital Marketing for Electricians</CardTitle>
                <CardDescription>Building your online presence to attract local customers</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-slate-200">
            <ul className="list-disc pl-6 space-y-2">
              <li>Develop a mobile-responsive website with clear service descriptions and easy contact options</li>
              <li>Optimise for local SEO with relevant keywords like "emergency electrician in [your town]" or "EICR testing [your county]"</li>
              <li>Create Google Business Profile and ensure all information is complete and accurate</li>
              <li>Implement a review generation strategy to build Google and Trustpilot reviews</li>
              <li>Set up targeted local Facebook and Instagram ad campaigns with precise geographic targeting</li>
              <li>Develop educational content like "how to spot dangerous wiring" or "preparing your home for an electrical inspection"</li>
              <li>Consider Google Local Service Ads which appear at the top of search results</li>
              <li>Use remarketing campaigns to reach potential customers who've visited your website</li>
              <li>List your business on industry-specific directories such as Checkatrade, MyBuilder, and Rated People</li>
            </ul>
          </CardContent>
        </Card>
        
        {/* Traditional Marketing Card */}
        <Card className="border-elec-yellow/20">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <BadgeCheck className="h-6 w-6 text-elec-yellow" />
              <div>
                <CardTitle>Traditional Marketing Approaches</CardTitle>
                <CardDescription>Offline strategies that still deliver strong results</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-slate-200">
            <ul className="list-disc pl-6 space-y-2">
              <li>Design professional vehicle livery that serves as a mobile advertisement</li>
              <li>Create branded uniforms and PPE for enhanced professionalism and recognition</li>
              <li>Consider local newspaper advertorials about electrical safety or energy efficiency</li>
              <li>Distribute door drop leaflets in targeted neighbourhoods with relevant service offerings</li>
              <li>Partner with complementary trades (plumbers, builders, etc.) for mutual referrals</li>
              <li>Attend local home improvement shows and community events</li>
              <li>Offer free electrical safety checks to community organisations to build goodwill</li>
              <li>Create referral incentive programmes for existing customers</li>
              <li>Sponsor local sports teams or community events for increased visibility</li>
              <li>Develop relationships with local estate agents and letting agencies who need reliable electrical contractors</li>
            </ul>
          </CardContent>
        </Card>
        
        {/* Client Conversion Card */}
        <Card className="border-elec-yellow/20">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <Award className="h-6 w-6 text-elec-yellow" />
              <div>
                <CardTitle>Client Conversion Techniques</CardTitle>
                <CardDescription>Turning enquiries into paying customers</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-slate-200">
            <ul className="list-disc pl-6 space-y-2">
              <li>Develop a standardised enquiry handling process with rapid response times</li>
              <li>Create professional quotation templates that clearly explain the value proposition</li>
              <li>Offer tiered service packages to accommodate different budgets</li>
              <li>Provide detailed explanations of technical requirements in simple terms</li>
              <li>Include testimonials and case studies from similar projects in your proposals</li>
              <li>Implement clear follow-up schedules for quotes (48 hours, 1 week, etc.)</li>
              <li>Consider financing options for larger electrical installations</li>
              <li>Offer booking incentives such as priority scheduling for quote acceptance within X days</li>
              <li>Prepare for common customer objections with clear, value-focused responses</li>
              <li>Train staff on consultative selling techniques rather than pressure tactics</li>
              <li>Highlight your certifications, insurance and professional memberships in all communications</li>
              <li>Create a sense of urgency by highlighting limited availability or seasonal demand</li>
            </ul>
          </CardContent>
        </Card>
        
        {/* Customer Experience Card */}
        <Card className="border-elec-yellow/20">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <Star className="h-6 w-6 text-elec-yellow" />
              <div>
                <CardTitle>Customer Experience Excellence</CardTitle>
                <CardDescription>Creating delighted customers who become advocates</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-slate-200">
            <ul className="list-disc pl-6 space-y-2">
              <li>Implement a customer communication system with appointment reminders and updates</li>
              <li>Train technicians on customer service skills as well as technical ability</li>
              <li>Establish clear expectations about arrival times, project duration, and cleanup</li>
              <li>Use protective measures like floor coverings and dust sheets even for small jobs</li>
              <li>Provide detailed explanations of completed work with documentation and photos</li>
              <li>Follow up after service completion to ensure customer satisfaction</li>
              <li>Create maintenance reminder systems for regular service intervals</li>
              <li>Develop a customer portal for scheduling service and accessing documentation</li>
              <li>Implement a loyalty programme with discounts on future services</li>
              <li>Consider offering extended warranties on installations to build long-term relationships</li>
              <li>Add small touches like leaving behind promotional items (notepads, pens, etc.)</li>
            </ul>
          </CardContent>
        </Card>
        
        {/* Client Retention Card */}
        <Card className="border-elec-yellow/20">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-elec-yellow" />
              <div>
                <CardTitle>Long-Term Client Retention</CardTitle>
                <CardDescription>Nurturing relationships for repeat business and referrals</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-slate-200">
            <ul className="list-disc pl-6 space-y-2">
              <li>Create a CRM system to track customer touchpoints and service history</li>
              <li>Develop an email newsletter with electrical safety tips and seasonal service reminders</li>
              <li>Establish a structured feedback collection system after each job</li>
              <li>Implement a service maintenance programme with scheduled check-ups</li>
              <li>Consider annual electrical safety inspections for regular clients</li>
              <li>Develop trade account systems for business customers with preferential rates</li>
              <li>Create a formal referral programme with incentives (discounts or gift cards)</li>
              <li>Send personalised communications for important milestones (service anniversaries)</li>
              <li>Offer complementary minor services (e.g., visual inspections) with major work</li>
              <li>Develop case studies featuring successful projects (with customer permission)</li>
              <li>Hold customer appreciation events or workshops on electrical safety</li>
              <li>Train staff to identify additional service opportunities during routine visits</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <Card className="border-elec-yellow/20 bg-elec-gray/50 p-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Success Case Studies</CardTitle>
          <CardDescription>How UK electrical contractors turned customer acquisition strategies into business growth</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium text-elec-yellow">London Electrical Solutions</h4>
            <p className="text-sm">From a sole trader to a team of five electricians in two years by specialising in smart home installations and security systems. Created video content demonstrating system capabilities which generated consistent enquiries.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-elec-yellow">Northern Emergency Electricians</h4>
            <p className="text-sm">Built a 24/7 emergency service business by developing partnerships with property management companies and insurance providers. Implemented an online booking system with real-time availability that converted at 32% versus 18% for phone enquiries.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-elec-yellow">Midlands Commercial Electrical</h4>
            <p className="text-sm">Grew commercial client base by 40% in 12 months through a targeted LinkedIn campaign focusing on facilities managers. Offered free electrical safety seminars to potential clients which established them as industry authorities.</p>
          </div>
        </CardContent>
      </Card>
      
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
    </div>
  );
};

export default BusinessCustomers;
