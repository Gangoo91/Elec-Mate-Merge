import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Handshake, Car, Newspaper, Users, Megaphone, MapPin } from "lucide-react";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";

const TraditionalMarketingTab = () => {
  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Handshake className="h-6 w-6 text-elec-yellow" />
            <CardTitle>Traditional Marketing & Networking</CardTitle>
          </div>
          <CardDescription>
            Build strong local relationships and establish your presence in the community through proven traditional marketing methods.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center space-y-2">
              <Users className="h-8 w-8 text-elec-yellow mx-auto" />
              <h4 className="font-semibold">Networking</h4>
              <p className="text-xs text-muted-foreground">Build professional relationships</p>
            </div>
            <div className="text-center space-y-2">
              <Car className="h-8 w-8 text-elec-yellow mx-auto" />
              <h4 className="font-semibold">Vehicle Branding</h4>
              <p className="text-xs text-muted-foreground">Mobile advertising</p>
            </div>
            <div className="text-center space-y-2">
              <Newspaper className="h-8 w-8 text-elec-yellow mx-auto" />
              <h4 className="font-semibold">Local Press</h4>
              <p className="text-xs text-muted-foreground">Community visibility</p>
            </div>
            <div className="text-center space-y-2">
              <MapPin className="h-8 w-8 text-elec-yellow mx-auto" />
              <h4 className="font-semibold">Local Events</h4>
              <p className="text-xs text-muted-foreground">Community engagement</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Networking Opportunities */}
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-elec-yellow" />
            <CardTitle>Professional Networking</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-elec-yellow">Industry Associations</h4>
              <ul className="space-y-2 text-sm">
                <li>• <strong>NICEIC:</strong> Electrical contractor scheme</li>
                <li>• <strong>NAPIT:</strong> National association for professional inspectors</li>
                <li>• <strong>ECA:</strong> Electrical Contractors' Association</li>
                <li>• <strong>SELECT:</strong> Scotland's electrical trade association</li>
                <li>• <strong>Local trade groups:</strong> Regional contractor networks</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-elec-yellow">Business Networks</h4>
              <ul className="space-y-2 text-sm">
                <li>• <strong>BNI:</strong> Business referral networking</li>
                <li>• <strong>Chamber of Commerce:</strong> Local business community</li>
                <li>• <strong>Federation of Small Businesses:</strong> SME support network</li>
                <li>• <strong>Local breakfast meetings:</strong> Weekly networking events</li>
                <li>• <strong>Business exhibitions:</strong> Industry trade shows</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle & Signage */}
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Car className="h-6 w-6 text-elec-yellow" />
            <CardTitle>Vehicle Branding & Signage</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold">Vehicle Branding</h4>
              <ul className="space-y-2 text-sm">
                <li>• Company name & logo</li>
                <li>• Phone number (large font)</li>
                <li>• Website URL</li>
                <li>• Services offered</li>
                <li>• Professional certifications</li>
                <li>• "24/7 Emergency" if applicable</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Design Tips</h4>
              <ul className="space-y-2 text-sm">
                <li>• High contrast colours</li>
                <li>• Readable from 10+ metres</li>
                <li>• Professional appearance</li>
                <li>• Consistent branding</li>
                <li>• Weather-resistant materials</li>
                <li>• Regular maintenance</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Additional Signage</h4>
              <ul className="space-y-2 text-sm">
                <li>• Job site boards</li>
                <li>• Workshop signage</li>
                <li>• Safety barrier signs</li>
                <li>• Door magnets</li>
                <li>• Uniform branding</li>
                <li>• Business card holders</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Referral Programs */}
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Megaphone className="h-6 w-6 text-elec-yellow" />
            <CardTitle>Referral Programs</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-elec-yellow">Customer Referrals</h4>
              <div className="space-y-3">
                <div className="p-3 border border-elec-yellow/20 rounded">
                  <h5 className="font-medium">Incentive Structure</h5>
                  <ul className="text-sm space-y-1 mt-2">
                    <li>• £50 credit for successful referrals</li>
                    <li>• 10% discount on next service</li>
                    <li>• Free electrical safety check</li>
                  </ul>
                </div>
                <div className="p-3 border border-elec-yellow/20 rounded">
                  <h5 className="font-medium">Program Rules</h5>
                  <ul className="text-sm space-y-1 mt-2">
                    <li>• Minimum job value £200</li>
                    <li>• Reward after completion</li>
                    <li>• No limit on referrals</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-elec-yellow">Trade Partnerships</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                  <span>Plumbers</span>
                  <Badge variant="secondary">Cross-referrals</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                  <span>Builders</span>
                  <Badge variant="secondary">Subcontracting</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                  <span>Estate Agents</span>
                  <Badge variant="secondary">Property services</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                  <span>Architects</span>
                  <Badge variant="secondary">New builds</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Community Engagement */}
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <MapPin className="h-6 w-6 text-elec-yellow" />
            <CardTitle>Community Engagement</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-elec-yellow">Local Events</h4>
              <ul className="space-y-2 text-sm">
                <li>• Home improvement shows</li>
                <li>• Local business fairs</li>
                <li>• Community safety events</li>
                <li>• School career talks</li>
                <li>• Charity fundraisers</li>
                <li>• Council meetings</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-elec-yellow">Sponsorship Opportunities</h4>
              <ul className="space-y-2 text-sm">
                <li>• Local sports teams</li>
                <li>• Community newsletters</li>
                <li>• School events</li>
                <li>• Charity events</li>
                <li>• Local radio shows</li>
                <li>• Parish council initiatives</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TraditionalMarketingTab;