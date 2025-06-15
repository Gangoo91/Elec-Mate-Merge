
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageCircle, Heart, Building, Phone, MapPin } from "lucide-react";

const SupportNetworkTab = () => {
  const supportTypes = [
    {
      title: "Workplace Support",
      icon: <Building className="h-5 w-5 text-blue-400" />,
      description: "Employee assistance programmes and occupational health services",
      contacts: [
        { name: "HR Department", description: "Employee assistance and support policies" },
        { name: "Occupational Health", description: "Work-related mental health support" },
        { name: "Trade Union", description: "Member support and advocacy services" }
      ]
    },
    {
      title: "Industry-Specific Support",
      icon: <Users className="h-5 w-5 text-purple-400" />,
      description: "Mental health support tailored to electrical industry professionals",
      contacts: [
        { name: "Electrical Industries Charity", description: "Comprehensive support for electrical sector workers" },
        { name: "Mates in Mind", description: "Construction industry mental health support" },
        { name: "Industry Mentorship Programmes", description: "Connect with experienced professionals" }
      ]
    },
    {
      title: "Professional Services",
      icon: <Heart className="h-5 w-5 text-red-400" />,
      description: "Qualified mental health professionals and counselling services",
      contacts: [
        { name: "NHS Mental Health Services", description: "Free healthcare mental health support" },
        { name: "Private Counselling", description: "Professional therapy and counselling" },
        { name: "Cognitive Behavioural Therapy", description: "Evidence-based psychological therapy" }
      ]
    },
    {
      title: "Peer Support Networks",
      icon: <MessageCircle className="h-5 w-5 text-green-400" />,
      description: "Connect with others who understand your experiences",
      contacts: [
        { name: "Andy's Man Club", description: "Free peer-to-peer support groups for men" },
        { name: "Mental Health Support Groups", description: "Local community support meetings" },
        { name: "Online Communities", description: "Digital peer support platforms" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-green-500/20 bg-gradient-to-r from-green-500/5 to-green-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-green-400" />
            <CardTitle className="text-green-300">Support Network & Community</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Building a strong support network is crucial for mental wellbeing. You don't have to face 
            challenges alone - there are people, services, and communities ready to help.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Building className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Workplace</div>
              <div className="text-xs text-muted-foreground">Professional support</div>
            </div>
            <div className="text-center">
              <Users className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Industry</div>
              <div className="text-xs text-muted-foreground">Sector-specific help</div>
            </div>
            <div className="text-center">
              <Heart className="h-6 w-6 text-red-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Professional</div>
              <div className="text-xs text-muted-foreground">Qualified therapists</div>
            </div>
            <div className="text-center">
              <MessageCircle className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Peer Support</div>
              <div className="text-xs text-muted-foreground">Community connections</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {supportTypes.map((type, index) => (
          <Card key={index} className="border-gray-600/30 bg-gray-800/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 text-lg">
                {type.icon}
                {type.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{type.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {type.contacts.map((contact, contactIndex) => (
                  <div key={contactIndex} className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white text-sm">{contact.name}</h4>
                        <p className="text-xs text-muted-foreground">{contact.description}</p>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs">
                        Learn More
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Finding Local Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <Phone className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">NHS 111</div>
              <div className="text-xs text-muted-foreground">Call 111 for mental health advice</div>
            </div>
            <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <MapPin className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Local Services</div>
              <div className="text-xs text-muted-foreground">Find services in your area</div>
            </div>
            <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Support Groups</div>
              <div className="text-xs text-muted-foreground">Connect with local communities</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportNetworkTab;
