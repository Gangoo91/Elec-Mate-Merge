import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MessageCircle, Clock, Target, CheckCircle, Users, FileText } from "lucide-react";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";

const LeadGenerationTab = () => {
  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Target className="h-6 w-6 text-elec-yellow" />
            <CardTitle>Lead Generation & Conversion</CardTitle>
          </div>
          <CardDescription>
            Transform potential customers into paying clients through effective lead generation strategies and professional conversion processes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center space-y-2">
              <Phone className="h-8 w-8 text-elec-yellow mx-auto" />
              <h4 className="font-semibold">Quick Response</h4>
              <p className="text-xs text-muted-foreground">Answer within 2 rings</p>
            </div>
            <div className="text-center space-y-2">
              <Mail className="h-8 w-8 text-elec-yellow mx-auto" />
              <h4 className="font-semibold">Follow Up</h4>
              <p className="text-xs text-muted-foreground">Systematic lead nurturing</p>
            </div>
            <div className="text-center space-y-2">
              <MessageCircle className="h-8 w-8 text-elec-yellow mx-auto" />
              <h4 className="font-semibold">Clear Communication</h4>
              <p className="text-xs text-muted-foreground">Professional dialogue</p>
            </div>
            <div className="text-center space-y-2">
              <CheckCircle className="h-8 w-8 text-elec-yellow mx-auto" />
              <h4 className="font-semibold">Close the Deal</h4>
              <p className="text-xs text-muted-foreground">Convert to customers</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lead Sources */}
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Target className="h-6 w-6 text-elec-yellow" />
            <CardTitle>Lead Generation Sources</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-elec-yellow">Online Sources</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                  <span className="text-sm">Google Ads</span>
                  <Badge variant="secondary">High Intent</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                  <span className="text-sm">Facebook Ads</span>
                  <Badge variant="secondary">Local Reach</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                  <span className="text-sm">Website Contact</span>
                  <Badge variant="secondary">Organic</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                  <span className="text-sm">Trade Websites</span>
                  <Badge variant="secondary">Qualified</Badge>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-elec-yellow">Referral Sources</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                  <span className="text-sm">Customer Referrals</span>
                  <Badge variant="secondary">High Quality</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                  <span className="text-sm">Trade Partners</span>
                  <Badge variant="secondary">Professional</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                  <span className="text-sm">Repeat Customers</span>
                  <Badge variant="secondary">Loyal</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                  <span className="text-sm">Word of Mouth</span>
                  <Badge variant="secondary">Trusted</Badge>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-elec-yellow">Traditional Sources</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                  <span className="text-sm">Vehicle Branding</span>
                  <Badge variant="secondary">Local</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                  <span className="text-sm">Yellow Pages</span>
                  <Badge variant="secondary">Established</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                  <span className="text-sm">Local Press</span>
                  <Badge variant="secondary">Community</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                  <span className="text-sm">Door Hangers</span>
                  <Badge variant="secondary">Direct</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Initial Contact Process */}
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Phone className="h-6 w-6 text-elec-yellow" />
            <CardTitle>Initial Contact Best Practices</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-elec-yellow">Phone Etiquette</h4>
              <div className="space-y-3">
                <div className="p-3 border border-elec-yellow/20 rounded">
                  <h5 className="font-medium text-sm">Professional Greeting</h5>
                  <p className="text-xs text-muted-foreground mt-1">
                    "Good morning, [Company Name], this is [Your Name]. How can I help you today?"
                  </p>
                </div>
                <ul className="space-y-1 text-sm">
                  <li>• Answer within 3 rings</li>
                  <li>• Speak clearly and professionally</li>
                  <li>• Listen actively to customer needs</li>
                  <li>• Take detailed notes</li>
                  <li>• Confirm next steps</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-elec-yellow">Information Gathering</h4>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Contact Details:</strong> Name, phone, email, address</li>
                <li>• <strong>Problem Description:</strong> What exactly is the issue?</li>
                <li>• <strong>Urgency Level:</strong> Emergency or planned work?</li>
                <li>• <strong>Property Type:</strong> Residential, commercial, industrial</li>
                <li>• <strong>Previous Electrician:</strong> Any ongoing relationships</li>
                <li>• <strong>Budget Range:</strong> Financial parameters</li>
                <li>• <strong>Timeline:</strong> When work needs completing</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quote & Estimation Process */}
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Clock className="h-6 w-6 text-elec-yellow" />
            <CardTitle>Professional Quoting Process</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-elec-yellow">Site Visit Preparation</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Schedule within 24-48 hours</li>
                  <li>• Confirm appointment details</li>
                  <li>• Bring measuring tools</li>
                  <li>• Professional appearance</li>
                  <li>• Company ID and insurance docs</li>
                  <li>• Tablet/phone for photos</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-elec-yellow">Quote Presentation</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Detailed breakdown of costs</li>
                  <li>• Materials and labour separate</li>
                  <li>• Timeline for completion</li>
                  <li>• Payment terms</li>
                  <li>• Warranty information</li>
                  <li>• Professional formatting</li>
                </ul>
              </div>
            </div>
            
            <div className="p-4 bg-elec-yellow/5 border border-elec-yellow/20 rounded">
              <h4 className="font-semibold text-elec-yellow mb-2">Quote Follow-Up Timeline</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
                <div className="text-center">
                  <div className="font-medium">Day 1</div>
                  <div className="text-xs text-muted-foreground">Send quote</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">Day 3</div>
                  <div className="text-xs text-muted-foreground">First follow-up</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">Day 7</div>
                  <div className="text-xs text-muted-foreground">Second follow-up</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">Day 14</div>
                  <div className="text-xs text-muted-foreground">Final follow-up</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conversion Strategies */}
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-elec-yellow" />
            <CardTitle>Lead Conversion Strategies</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-elec-yellow">Value Propositions</h4>
              <ul className="space-y-2 text-sm">
                <li>• Qualified & certified electricians</li>
                <li>• Fully insured & guaranteed work</li>
                <li>• Emergency call-out service</li>
                <li>• Competitive pricing</li>
                <li>• Local knowledge & experience</li>
                <li>• Customer testimonials</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-elec-yellow">Objection Handling</h4>
              <div className="space-y-2 text-sm">
                <div className="p-2 border border-elec-yellow/20 rounded">
                  <strong>"Too expensive"</strong>
                  <p className="text-xs">Explain value and payment options</p>
                </div>
                <div className="p-2 border border-elec-yellow/20 rounded">
                  <strong>"Need to think about it"</strong>
                  <p className="text-xs">Offer limited-time incentives</p>
                </div>
                <div className="p-2 border border-elec-yellow/20 rounded">
                  <strong>"Getting other quotes"</strong>
                  <p className="text-xs">Emphasise unique benefits</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-elec-yellow">Closing Techniques</h4>
              <ul className="space-y-2 text-sm">
                <li>• Assumptive close</li>
                <li>• Alternative choice close</li>
                <li>• Urgency close</li>
                <li>• Summary close</li>
                <li>• Question close</li>
                <li>• Trial close</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadGenerationTab;