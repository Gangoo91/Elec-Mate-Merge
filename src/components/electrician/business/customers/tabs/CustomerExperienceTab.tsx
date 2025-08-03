import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, Clock, Users, MessageSquare, Award } from "lucide-react";

const CustomerExperienceTab = () => {
  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Star className="h-6 w-6 text-elec-yellow" />
            <CardTitle>Customer Experience & Service Excellence</CardTitle>
          </div>
          <CardDescription>
            Deliver exceptional customer service that builds trust, encourages referrals, and establishes your reputation as the preferred electrical contractor.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center space-y-2">
              <Shield className="h-8 w-8 text-elec-yellow mx-auto" />
              <h4 className="font-semibold">Professionalism</h4>
              <p className="text-xs text-muted-foreground">Certified & insured service</p>
            </div>
            <div className="text-center space-y-2">
              <Clock className="h-8 w-8 text-elec-yellow mx-auto" />
              <h4 className="font-semibold">Reliability</h4>
              <p className="text-xs text-muted-foreground">On-time, every time</p>
            </div>
            <div className="text-center space-y-2">
              <MessageSquare className="h-8 w-8 text-elec-yellow mx-auto" />
              <h4 className="font-semibold">Communication</h4>
              <p className="text-xs text-muted-foreground">Clear & transparent</p>
            </div>
            <div className="text-center space-y-2">
              <Award className="h-8 w-8 text-elec-yellow mx-auto" />
              <h4 className="font-semibold">Quality</h4>
              <p className="text-xs text-muted-foreground">BS7671 compliant work</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Standards */}
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-elec-yellow" />
            <CardTitle>Professional Service Standards</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-elec-yellow">Appearance & Presentation</h4>
              <ul className="space-y-2 text-sm">
                <li>• Clean, branded uniforms or workwear</li>
                <li>• Professional ID badges visible</li>
                <li>• Well-maintained vehicles & equipment</li>
                <li>• Personal grooming standards</li>
                <li>• Protective shoe covers for homes</li>
                <li>• Company literature and business cards</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-elec-yellow">Work Site Behaviour</h4>
              <ul className="space-y-2 text-sm">
                <li>• Respect customer's property</li>
                <li>• Use dust sheets and protective covers</li>
                <li>• Clean up daily and at completion</li>
                <li>• No smoking on customer premises</li>
                <li>• Professional language at all times</li>
                <li>• Mobile phone etiquette</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Communication Excellence */}
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <MessageSquare className="h-6 w-6 text-elec-yellow" />
            <CardTitle>Customer Communication Framework</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-elec-yellow">Pre-Work Communication</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Confirm appointment 24 hours ahead</li>
                  <li>• Provide arrival time window</li>
                  <li>• Explain what to expect</li>
                  <li>• List any customer preparations needed</li>
                  <li>• Share electrician's contact details</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-elec-yellow">During Work Communication</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Explain work being undertaken</li>
                  <li>• Discuss any changes needed</li>
                  <li>• Update on progress regularly</li>
                  <li>• Address customer questions</li>
                  <li>• Notify of any delays</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-elec-yellow">Post-Work Communication</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Walkthrough completed work</li>
                  <li>• Explain safety features installed</li>
                  <li>• Provide operating instructions</li>
                  <li>• Leave contact details for queries</li>
                  <li>• Follow up within 48 hours</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quality Assurance */}
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Award className="h-6 w-6 text-elec-yellow" />
            <CardTitle>Quality Assurance & Compliance</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-elec-yellow">Technical Standards</h4>
              <div className="space-y-3">
                <div className="p-3 border border-elec-yellow/20 rounded">
                  <h5 className="font-medium">BS7671:2018+A2:2022</h5>
                  <p className="text-xs text-muted-foreground">18th Edition Wiring Regulations compliance</p>
                </div>
                <ul className="space-y-1 text-sm">
                  <li>• Proper testing and inspection procedures</li>
                  <li>• Electrical Installation Certificates</li>
                  <li>• Part P Building Regulations compliance</li>
                  <li>• Safe isolation procedures</li>
                  <li>• RCD protection implementation</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-elec-yellow">Documentation & Certification</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                  <span>Installation Certificates</span>
                  <Badge variant="secondary">Required</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                  <span>Test Results</span>
                  <Badge variant="secondary">Documented</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                  <span>Warranty Information</span>
                  <Badge variant="secondary">Provided</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                  <span>Safety Instructions</span>
                  <Badge variant="secondary">Explained</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Feedback Systems */}
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-elec-yellow" />
            <CardTitle>Customer Feedback & Improvement</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-elec-yellow">Feedback Collection Methods</h4>
              <div className="space-y-3">
                <div className="p-3 border border-elec-yellow/20 rounded">
                  <h5 className="font-medium">Immediate Feedback</h5>
                  <ul className="text-sm space-y-1 mt-2">
                    <li>• Verbal feedback at completion</li>
                    <li>• Quick satisfaction survey</li>
                    <li>• Photo of completed work</li>
                  </ul>
                </div>
                <div className="p-3 border border-elec-yellow/20 rounded">
                  <h5 className="font-medium">Follow-Up Feedback</h5>
                  <ul className="text-sm space-y-1 mt-2">
                    <li>• Email survey within 48 hours</li>
                    <li>• Phone call after one week</li>
                    <li>• Online review requests</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-elec-yellow">Performance Metrics</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                  <span>Customer Satisfaction</span>
                  <Badge variant="secondary">Target: 95%+</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                  <span>On-Time Completion</span>
                  <Badge variant="secondary">Target: 98%+</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                  <span>First-Time Fix Rate</span>
                  <Badge variant="secondary">Target: 90%+</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border border-elec-yellow/20 rounded">
                  <span>Referral Rate</span>
                  <Badge variant="secondary">Target: 25%+</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Problem Resolution */}
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Clock className="h-6 w-6 text-elec-yellow" />
            <CardTitle>Issue Resolution & Recovery</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-orange-500/5 border border-orange-500/20 rounded">
              <h4 className="font-semibold text-orange-600 mb-2">Service Recovery Process</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
                <div className="text-center">
                  <div className="font-medium">Listen</div>
                  <div className="text-xs text-muted-foreground">Understand the issue</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">Apologise</div>
                  <div className="text-xs text-muted-foreground">Take responsibility</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">Fix</div>
                  <div className="text-xs text-muted-foreground">Resolve quickly</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">Follow-Up</div>
                  <div className="text-xs text-muted-foreground">Ensure satisfaction</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-elec-yellow">Common Issues & Solutions</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Delays:</strong> Communicate early, offer compensation</li>
                  <li>• <strong>Quality concerns:</strong> Immediate return to rectify</li>
                  <li>• <strong>Damage claims:</strong> Insurance process explanation</li>
                  <li>• <strong>Billing disputes:</strong> Detailed breakdown provision</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-elec-yellow">Recovery Actions</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Free return visits if needed</li>
                  <li>• Partial refunds for inconvenience</li>
                  <li>• Additional warranty periods</li>
                  <li>• Priority booking for future work</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerExperienceTab;