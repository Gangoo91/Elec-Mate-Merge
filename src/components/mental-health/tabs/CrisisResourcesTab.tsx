
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Phone, MapPin, Heart, Clock, Users, AlertTriangle, ExternalLink } from "lucide-react";
import LocalResourceFinder from "@/components/mental-health/crisis/LocalResourceFinder";
import EmergencyBanner from "@/components/mental-health/crisis/EmergencyBanner";

const CrisisResourcesTab = () => {
  const emergencyContacts = [
    {
      name: "Emergency Services",
      number: "999",
      description: "For life-threatening emergencies",
      available: "24/7",
      type: "emergency"
    },
    {
      name: "Samaritans",
      number: "116 123",
      description: "Free emotional support for anyone in distress",
      available: "24/7",
      type: "crisis"
    },
    {
      name: "CALM (Campaign Against Living Miserably)",
      number: "0800 58 58 58",
      description: "Support for men experiencing mental health issues",
      available: "5pm-midnight daily",
      type: "support"
    },
    {
      name: "Mind Infoline",
      number: "0300 123 3393",
      description: "Information and signposting service",
      available: "9am-6pm Mon-Fri",
      type: "support"
    },
    {
      name: "NHS 111",
      number: "111",
      description: "Non-emergency medical advice",
      available: "24/7",
      type: "medical"
    },
    {
      name: "PAPYRUS Prevention of Young Suicide",
      number: "0800 068 41 41",
      description: "Support for young people under 35",
      available: "9am-10pm Mon-Fri, 2pm-10pm weekends",
      type: "youth"
    }
  ];

  const onlineSupport = [
    {
      title: "Crisis Text Line",
      description: "Text SHOUT to 85258 for free 24/7 crisis support",
      url: "https://www.crisistextline.org.uk/",
      type: "text"
    },
    {
      title: "Mental Health Chat",
      description: "Online chat support with trained volunteers",
      url: "https://www.mentalhealthchat.org.uk/",
      type: "chat"
    },
    {
      title: "7 Cups",
      description: "Free emotional support and counselling online",
      url: "https://www.7cups.com/",
      type: "chat"
    },
    {
      title: "Big White Wall",
      description: "Online mental health support community",
      url: "https://www.togetherall.com/",
      type: "community"
    }
  ];

  const selfHelpResources = [
    {
      title: "Mental Health First Aid Kit",
      description: "Essential steps to take during a mental health crisis",
      items: ["Remove immediate dangers", "Stay calm and listen", "Encourage professional help", "Follow up regularly"]
    },
    {
      title: "Coping Strategies",
      description: "Immediate techniques to manage overwhelming feelings",
      items: ["Box breathing (4-4-4-4)", "5-4-3-2-1 grounding technique", "Cold water on face/wrists", "Progressive muscle relaxation"]
    },
    {
      title: "Safety Planning",
      description: "Create a personal safety plan for crisis situations",
      items: ["Identify warning signs", "List coping strategies", "Emergency contacts", "Professional support details"]
    }
  ];

  return (
    <div className="space-y-6">
      <EmergencyBanner />

      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Crisis Support & Resources</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            If you're experiencing a mental health crisis, you're not alone. Access immediate support, 
            find local services, and get the help you need right now.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400 mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">Crisis Support</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow mb-1">Free</div>
              <div className="text-sm text-muted-foreground">All Services</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">Local</div>
              <div className="text-sm text-muted-foreground">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Confidential</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Local Resource Finder - Now prominently featured */}
      <LocalResourceFinder />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-red-500/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Emergency Helplines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="border border-red-500/20 rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-white">{contact.name}</h4>
                    <Badge 
                      className={`${
                        contact.type === 'emergency' ? 'bg-red-500/20 text-red-400 border-red-500/40' :
                        contact.type === 'crisis' ? 'bg-orange-500/20 text-orange-400 border-orange-500/40' :
                        'bg-blue-500/20 text-blue-400 border-blue-500/40'
                      }`}
                    >
                      {contact.type}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold text-elec-yellow mb-2">
                    <a href={`tel:${contact.number}`} className="hover:underline">
                      {contact.number}
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{contact.description}</p>
                  <div className="flex items-center gap-2 text-xs text-green-400">
                    <Clock className="h-3 w-3" />
                    <span>{contact.available}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Online Crisis Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {onlineSupport.map((support, index) => (
                <div key={index} className="border border-blue-500/20 rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-white">{support.title}</h4>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/40">
                      {support.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{support.description}</p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.open(support.url, '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Access Support
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-green-500/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Self-Help Crisis Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selfHelpResources.map((resource, index) => (
              <div key={index} className="border border-green-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{resource.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                <ul className="space-y-1">
                  {resource.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm flex items-center gap-2">
                      <div className="h-1 w-1 bg-green-400 rounded-full flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-500/20 bg-purple-500/5">
        <CardHeader>
          <CardTitle className="text-purple-400">If You're Supporting Someone Else</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Do:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="h-1 w-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Listen without judgement</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1 w-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Stay calm and reassuring</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1 w-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Encourage professional help</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1 w-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Remove any means of self-harm</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1 w-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Stay with them or ensure someone else can</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Don't:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="h-1 w-1 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Promise to keep secrets about safety</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1 w-1 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Try to be their therapist</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1 w-1 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Minimise their feelings</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1 w-1 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Leave them alone if they're at risk</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1 w-1 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Argue with their thoughts or feelings</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CrisisResourcesTab;
