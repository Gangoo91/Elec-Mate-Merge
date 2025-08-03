import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Monitor, Smartphone, Globe, Star, MessageSquare, Camera } from "lucide-react";

const DigitalMarketingTab = () => {
  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Monitor className="h-6 w-6 text-elec-yellow" />
            <CardTitle>Digital Marketing Strategies</CardTitle>
          </div>
          <CardDescription>
            Leverage digital platforms to reach more customers and build your online reputation in the electrical contracting industry.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center space-y-2">
              <Globe className="h-8 w-8 text-elec-yellow mx-auto" />
              <h4 className="font-semibold">Website</h4>
              <p className="text-xs text-muted-foreground">Professional online presence</p>
            </div>
            <div className="text-center space-y-2">
              <Star className="h-8 w-8 text-elec-yellow mx-auto" />
              <h4 className="font-semibold">Reviews</h4>
              <p className="text-xs text-muted-foreground">Build trust and credibility</p>
            </div>
            <div className="text-center space-y-2">
              <MessageSquare className="h-8 w-8 text-elec-yellow mx-auto" />
              <h4 className="font-semibold">Social Media</h4>
              <p className="text-xs text-muted-foreground">Engage with customers</p>
            </div>
            <div className="text-center space-y-2">
              <Smartphone className="h-8 w-8 text-elec-yellow mx-auto" />
              <h4 className="font-semibold">Local SEO</h4>
              <p className="text-xs text-muted-foreground">Be found locally</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Website Essentials */}
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Globe className="h-6 w-6 text-elec-yellow" />
            <CardTitle>Professional Website Essentials</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-elec-yellow">Essential Pages</h4>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Home:</strong> Clear value proposition</li>
                <li>• <strong>Services:</strong> Detailed service descriptions</li>
                <li>• <strong>About:</strong> Team credentials & certifications</li>
                <li>• <strong>Contact:</strong> Multiple contact methods</li>
                <li>• <strong>Gallery:</strong> Before/after project photos</li>
                <li>• <strong>Testimonials:</strong> Customer reviews</li>
                <li>• <strong>Emergency:</strong> 24/7 contact information</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-elec-yellow">Key Features</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Mobile Responsive</Badge>
                  <span className="text-xs">Works on all devices</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Fast Loading</Badge>
                  <span className="text-xs">Under 3 seconds</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">SSL Certificate</Badge>
                  <span className="text-xs">Secure browsing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Clear CTAs</Badge>
                  <span className="text-xs">Easy to contact you</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Google My Business */}
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Star className="h-6 w-6 text-elec-yellow" />
            <CardTitle>Google My Business Optimisation</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold">Profile Setup</h4>
              <ul className="space-y-1 text-sm">
                <li>• Complete business information</li>
                <li>• Professional photos</li>
                <li>• Service area mapping</li>
                <li>• Business hours</li>
                <li>• Contact details</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Regular Updates</h4>
              <ul className="space-y-1 text-sm">
                <li>• Post project photos</li>
                <li>• Share safety tips</li>
                <li>• Announce special offers</li>
                <li>• Update service hours</li>
                <li>• Respond to reviews</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Review Management</h4>
              <ul className="space-y-1 text-sm">
                <li>• Ask satisfied customers</li>
                <li>• Respond professionally</li>
                <li>• Address complaints quickly</li>
                <li>• Show appreciation</li>
                <li>• Learn from feedback</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Media Strategy */}
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Camera className="h-6 w-6 text-elec-yellow" />
            <CardTitle>Social Media Strategy</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-elec-yellow">Content Ideas</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Before/after project photos</li>
                  <li>• Electrical safety tips</li>
                  <li>• Team member spotlights</li>
                  <li>• Behind-the-scenes videos</li>
                  <li>• Customer testimonials</li>
                  <li>• Certification updates</li>
                  <li>• Emergency response stories</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-elec-yellow">Platform Strategy</h4>
                <div className="space-y-2 text-sm">
                  <div className="p-2 border border-elec-yellow/20 rounded">
                    <strong>Facebook:</strong> Local community engagement
                  </div>
                  <div className="p-2 border border-elec-yellow/20 rounded">
                    <strong>Instagram:</strong> Visual project showcases
                  </div>
                  <div className="p-2 border border-elec-yellow/20 rounded">
                    <strong>LinkedIn:</strong> Commercial client networking
                  </div>
                  <div className="p-2 border border-elec-yellow/20 rounded">
                    <strong>YouTube:</strong> Educational content & tutorials
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DigitalMarketingTab;