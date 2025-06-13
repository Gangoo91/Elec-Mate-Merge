
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Shield, Clock, MapPin, AlertTriangle, Heart, MessageCircle } from "lucide-react";
import LocalResourceFinder from "@/components/mental-health/crisis/LocalResourceFinder";

const CrisisResourcesTab = () => {
  const emergencyContacts = [
    {
      name: "Emergency Services",
      number: "999",
      description: "For immediate life-threatening emergencies",
      availability: "24/7",
      type: "Emergency",
      priority: "urgent"
    },
    {
      name: "Samaritans",
      number: "116 123",
      description: "Free emotional support for anyone in distress",
      availability: "24/7",
      type: "Crisis Support",
      priority: "urgent"
    },
    {
      name: "Crisis Text Line",
      number: "Text SHOUT to 85258",
      description: "24/7 text support for crisis situations",
      availability: "24/7",
      type: "Text Support",
      priority: "urgent"
    },
    {
      name: "Mental Health Helpline",
      number: "0300 123 3393",
      description: "NHS mental health support and guidance",
      availability: "24/7",
      type: "NHS Support",
      priority: "high"
    }
  ];

  const crisisResources = [
    {
      title: "Immediate Safety Plan",
      description: "Step-by-step guide for crisis situations",
      icon: <Shield className="h-5 w-5 text-green-400" />,
      action: "Download Plan"
    },
    {
      title: "Local Crisis Teams",
      description: "Mental health crisis teams in your area",
      icon: <MapPin className="h-5 w-5 text-blue-400" />,
      action: "Find Local Team"
    },
    {
      title: "Hospital A&E Mental Health",
      description: "When to go to A&E for mental health crisis",
      icon: <AlertTriangle className="h-5 w-5 text-orange-400" />,
      action: "Learn More"
    },
    {
      title: "Crisis Apps & Tools",
      description: "Mobile apps for crisis support and management",
      icon: <Phone className="h-5 w-5 text-purple-400" />,
      action: "View Apps"
    }
  ];

  const warningSignsChecklist = [
    "Thoughts of suicide or self-harm",
    "Feeling completely hopeless or trapped",
    "Extreme mood changes or agitation",
    "Withdrawing from family and friends",
    "Increased use of alcohol or drugs",
    "Giving away possessions",
    "Talking about death or dying",
    "Feeling like a burden to others"
  ];

  const selfCareInCrisis = [
    "Remove access to means of self-harm",
    "Stay with trusted friends or family",
    "Contact your GP or mental health team",
    "Use breathing exercises to manage panic",
    "Remind yourself that feelings will pass",
    "Keep emergency numbers easily accessible",
    "Have a crisis plan ready and share it",
    "Consider going to A&E if unsafe"
  ];

  return (
    <div className="space-y-6">
      {/* Emergency Banner */}
      <Card className="border-red-500/40 bg-red-500/5 shadow-md">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Shield className="h-8 w-8 text-red-500 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-500">Emergency Support</h3>
              <p className="text-sm">
                If you're in immediate danger, call <span className="font-bold">999</span>. 
                For crisis support, contact Samaritans at{" "}
                <a href="tel:116123" className="font-bold text-red-500 hover:underline">116 123</a> (free, 24/7)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <CardTitle className="text-red-500">Crisis Resources & Emergency Support</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Immediate help and resources for mental health crises. These services are available 24/7 and provide 
            professional support when you need it most. Don't hesitate to reach out - help is always available.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Phone className="h-6 w-6 text-red-500 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">24/7 Helplines</div>
              <div className="text-xs text-muted-foreground">Always available</div>
            </div>
            <div className="text-center">
              <Clock className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Immediate</div>
              <div className="text-xs text-muted-foreground">Response time</div>
            </div>
            <div className="text-center">
              <Shield className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Confidential</div>
              <div className="text-xs text-muted-foreground">Private support</div>
            </div>
            <div className="text-center">
              <Heart className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Professional</div>
              <div className="text-xs text-muted-foreground">Trained support</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-red-500/20 bg-red-500/5">
          <CardHeader>
            <CardTitle className="text-red-500 flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="border border-red-500/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white">{contact.name}</h4>
                    <Badge className={
                      contact.priority === 'urgent' 
                        ? "bg-red-500 text-white" 
                        : "bg-orange-500/20 text-orange-400 border-orange-500/40"
                    }>
                      {contact.priority === 'urgent' ? 'URGENT' : 'IMPORTANT'}
                    </Badge>
                  </div>
                  <div className="text-lg font-bold text-red-400 mb-2">
                    <a href={`tel:${contact.number.replace(/\s/g, '')}`} className="hover:underline">
                      {contact.number}
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{contact.description}</p>
                  <div className="flex items-center gap-2 text-xs text-green-400">
                    <Clock className="h-3 w-3" />
                    <span>{contact.availability}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-elec-yellow flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Crisis Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {crisisResources.map((resource, index) => (
                <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    {resource.icon}
                    <h4 className="font-semibold text-white">{resource.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                  <Button size="sm" variant="outline" className="w-full">
                    {resource.action}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-orange-500/20 bg-orange-500/5">
          <CardHeader>
            <CardTitle className="text-orange-400 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Warning Signs to Watch For
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Recognise these warning signs in yourself or others that may indicate a mental health crisis:
            </p>
            <ul className="space-y-2">
              {warningSignsChecklist.map((sign, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <AlertTriangle className="h-3 w-3 text-orange-400 flex-shrink-0 mt-0.5" />
                  <span>{sign}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-green-500/20 bg-green-500/5">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Self-Care in Crisis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Immediate self-care steps to take during a mental health crisis:
            </p>
            <ul className="space-y-2">
              {selfCareInCrisis.map((step, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Heart className="h-3 w-3 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <LocalResourceFinder />
    </div>
  );
};

export default CrisisResourcesTab;
