import { Badge } from "@/components/ui/badge";
import { Globe, Star, Share2, Search, Monitor, MapPin } from "lucide-react";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";

const DigitalMarketingTab = () => {
  return (
    <div className="space-y-4">
      <MobileAccordion type="multiple" className="space-y-4">
        {/* Digital Marketing Overview */}
        <MobileAccordionItem value="overview" className="bg-card border border-elec-yellow/20 rounded-lg overflow-hidden">
          <MobileAccordionTrigger
            icon={<Globe className="h-6 w-6 text-elec-yellow" />}
            className="bg-card border-b border-elec-yellow/20"
          >
            Digital Marketing Strategy
          </MobileAccordionTrigger>
          <MobileAccordionContent className="bg-card/50 backdrop-blur border-0">
            <div className="p-6 space-y-4">
              <p className="text-muted-foreground">
                Build a strong online presence to attract and convert customers through digital channels. Focus on local SEO, reviews, and professional website presence.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center space-y-2">
                  <Monitor className="h-8 w-8 text-elec-yellow mx-auto" />
                  <h4 className="font-semibold">Website</h4>
                  <p className="text-xs text-muted-foreground">Professional online presence</p>
                </div>
                <div className="text-center space-y-2">
                  <Star className="h-8 w-8 text-elec-yellow mx-auto" />
                  <h4 className="font-semibold">Reviews</h4>
                  <p className="text-xs text-muted-foreground">Customer testimonials</p>
                </div>
                <div className="text-center space-y-2">
                  <Share2 className="h-8 w-8 text-elec-yellow mx-auto" />
                  <h4 className="font-semibold">Social Media</h4>
                  <p className="text-xs text-muted-foreground">Community engagement</p>
                </div>
                <div className="text-center space-y-2">
                  <Search className="h-8 w-8 text-elec-yellow mx-auto" />
                  <h4 className="font-semibold">Local SEO</h4>
                  <p className="text-xs text-muted-foreground">Search visibility</p>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        {/* Website Essentials */}
        <MobileAccordionItem value="website" className="bg-card border border-elec-yellow/20 rounded-lg overflow-hidden">
          <MobileAccordionTrigger
            icon={<Monitor className="h-6 w-6 text-elec-yellow" />}
            className="bg-card border-b border-elec-yellow/20"
          >
            Professional Website Essentials
          </MobileAccordionTrigger>
          <MobileAccordionContent className="bg-card/50 backdrop-blur border-0">
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-elec-yellow">Essential Pages</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                      <span className="text-sm">Home</span>
                      <Badge variant="secondary">Required</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                      <span className="text-sm">Services</span>
                      <Badge variant="secondary">Required</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                      <span className="text-sm">About</span>
                      <Badge variant="secondary">Required</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                      <span className="text-sm">Contact</span>
                      <Badge variant="secondary">Required</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                      <span className="text-sm">Gallery</span>
                      <Badge variant="secondary">Recommended</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                      <span className="text-sm">Testimonials</span>
                      <Badge variant="secondary">Recommended</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                      <span className="text-sm">Emergency</span>
                      <Badge variant="secondary">Optional</Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-elec-yellow">Key Features</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Mobile-responsive design</li>
                    <li>• Fast loading speeds (under 3 seconds)</li>
                    <li>• SSL certificate for security</li>
                    <li>• Clear call-to-action buttons</li>
                    <li>• Contact forms and phone numbers</li>
                    <li>• Local business schema markup</li>
                    <li>• Professional photography</li>
                    <li>• Customer testimonials</li>
                    <li>• Service area information</li>
                    <li>• Certification displays</li>
                  </ul>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        {/* Google My Business */}
        <MobileAccordionItem value="gmb" className="bg-card border border-elec-yellow/20 rounded-lg overflow-hidden">
          <MobileAccordionTrigger
            icon={<MapPin className="h-6 w-6 text-elec-yellow" />}
            className="bg-card border-b border-elec-yellow/20"
          >
            Google My Business Optimisation
          </MobileAccordionTrigger>
          <MobileAccordionContent className="bg-card/50 backdrop-blur border-0">
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-elec-yellow">Profile Setup</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Complete business information</li>
                    <li>• Accurate contact details</li>
                    <li>• Service area definition</li>
                    <li>• Business hours (including emergency)</li>
                    <li>• Professional photos</li>
                    <li>• Business description with keywords</li>
                    <li>• Service categories selection</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-elec-yellow">Regular Updates</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Weekly posts with photos</li>
                    <li>• Safety tips and advice</li>
                    <li>• Special offers and promotions</li>
                    <li>• Before/after project photos</li>
                    <li>• Seasonal electrical tips</li>
                    <li>• Company news and updates</li>
                    <li>• Customer success stories</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-elec-yellow">Review Management</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 border border-elec-yellow/20 rounded">
                    <h5 className="font-medium mb-2">Asking for Reviews</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Ask satisfied customers directly</li>
                      <li>• Send follow-up emails with links</li>
                      <li>• Provide simple review instructions</li>
                      <li>• Offer small incentives (discount coupons)</li>
                    </ul>
                  </div>
                  <div className="p-3 border border-elec-yellow/20 rounded">
                    <h5 className="font-medium mb-2">Responding to Reviews</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Thank customers for positive reviews</li>
                      <li>• Address negative reviews professionally</li>
                      <li>• Offer to resolve issues offline</li>
                      <li>• Respond within 24 hours</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        {/* Social Media Strategy */}
        <MobileAccordionItem value="social" className="bg-card border border-elec-yellow/20 rounded-lg overflow-hidden">
          <MobileAccordionTrigger
            icon={<Share2 className="h-6 w-6 text-elec-yellow" />}
            className="bg-card border-b border-elec-yellow/20"
          >
            Social Media Strategy
          </MobileAccordionTrigger>
          <MobileAccordionContent className="bg-card/50 backdrop-blur border-0">
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-elec-yellow">Content Ideas</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <h5 className="font-medium">Project Showcase</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Before/after photos</li>
                      <li>• Work in progress videos</li>
                      <li>• Complex installation highlights</li>
                      <li>• Customer satisfaction moments</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium">Educational Content</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Electrical safety tips</li>
                      <li>• Energy saving advice</li>
                      <li>• DIY vs professional guidance</li>
                      <li>• Regulation updates</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium">Business Updates</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Team introductions</li>
                      <li>• New certification announcements</li>
                      <li>• Community involvement</li>
                      <li>• Behind-the-scenes content</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-elec-yellow">Platform Strategy</h4>
                <div className="space-y-3">
                  <div className="p-3 border border-elec-yellow/20 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">Facebook</h5>
                      <Badge variant="secondary">Local Focus</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Best for local community engagement, event promotion, and customer testimonials. Join local groups and participate in community discussions.
                    </p>
                  </div>
                  <div className="p-3 border border-elec-yellow/20 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">Instagram</h5>
                      <Badge variant="secondary">Visual Content</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Perfect for showcasing completed projects, behind-the-scenes work, and building a visual portfolio of your electrical installations.
                    </p>
                  </div>
                  <div className="p-3 border border-elec-yellow/20 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">LinkedIn</h5>
                      <Badge variant="secondary">B2B Networking</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Ideal for connecting with commercial clients, other trades, and industry professionals. Share industry insights and company updates.
                    </p>
                  </div>
                  <div className="p-3 border border-elec-yellow/20 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">YouTube</h5>
                      <Badge variant="secondary">Educational</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Create educational content about electrical safety, showcase complex installations, and establish expertise in your field.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </div>
  );
};

export default DigitalMarketingTab;