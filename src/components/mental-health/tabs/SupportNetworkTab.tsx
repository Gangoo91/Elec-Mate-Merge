
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Clock, Zap, ExternalLink, ChevronRight, MessageSquare, PhoneCall } from "lucide-react";

const SupportNetworkTab = () => {
  // Quick contact cards data
  const quickContacts = [
    {
      name: "Samaritans",
      phone: "116123",
      displayPhone: "116 123",
      availability: "24/7, 365 days",
      icon: PhoneCall
    },
    {
      name: "Crisis Text Line",
      phone: "85258",
      displayPhone: "Text SHOUT to 85258",
      availability: "24/7 text support",
      icon: MessageSquare,
      isSMS: true
    },
    {
      name: "NHS 111",
      phone: "111",
      displayPhone: "111 (Option 2)",
      availability: "24/7 mental health",
      icon: Phone
    },
    {
      name: "Mind",
      phone: "03001233393",
      displayPhone: "0300 123 3393",
      availability: "Mon-Fri 9am-6pm",
      icon: Phone
    }
  ];

  // Industry-specific contacts
  const industryContacts = [
    {
      name: "Electrical Industries Charity",
      phone: "01895823726",
      displayPhone: "01895 823 726",
      description: "Comprehensive support for electrical sector workers and families"
    },
    {
      name: "Mates in Mind",
      phone: "02035105960",
      displayPhone: "0203 510 5960",
      description: "Mental health in construction and related industries"
    },
    {
      name: "Lighthouse Charity",
      phone: "03456051956",
      displayPhone: "0345 605 1956",
      description: "24/7 helpline for construction workers and families"
    }
  ];

  // Online resources
  const onlineResources = [
    {
      name: "NHS Talking Therapies",
      url: "https://www.nhs.uk/mental-health/talking-therapies-medicine-treatments/talking-therapies-and-counselling/",
      description: "Free psychological therapies on the NHS"
    },
    {
      name: "Andy's Man Club",
      url: "https://andysmanclub.co.uk",
      description: "Free weekly peer support groups for men"
    },
    {
      name: "CALM (Campaign Against Living Miserably)",
      url: "https://www.thecalmzone.net",
      description: "Support for men in crisis"
    },
    {
      name: "Hub of Hope",
      url: "https://hubofhope.co.uk",
      description: "Find local mental health services"
    },
    {
      name: "Mental Health Mates",
      url: "https://mentalhealthmates.co.uk",
      description: "Peer support walks and communities"
    }
  ];

  return (
    <div className="space-y-6">
      {/* 1. EMERGENCY BANNER - Always Visible */}
      <Card className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-500/30">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Phone className="h-12 w-12 text-red-400 animate-pulse" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1">In Crisis?</h3>
              <p className="text-sm text-white">Talk to someone now - free, confidential support 24/7</p>
            </div>
          </div>
          <a href="tel:116123" className="block w-full mt-4">
            <Button className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-bold text-lg">
              <PhoneCall className="h-5 w-5 mr-2" />
              Call Samaritans: 116 123
            </Button>
          </a>
        </CardContent>
      </Card>

      {/* 2. QUICK CONTACT CARDS - 2x2 Grid */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-3">Quick Contact</h2>
        <div className="grid grid-cols-2 gap-3">
          {quickContacts.map((contact, index) => {
            const Icon = contact.icon;
            const href = contact.isSMS ? `sms:${contact.phone}` : `tel:${contact.phone}`;

            return (
              <a key={index} href={href} className="block">
                <Card className="border-blue-500/20 bg-blue-500/10 hover:bg-blue-500/20 transition-all cursor-pointer h-full">
                  <CardContent className="p-4 h-full flex flex-col">
                    <Icon className="h-8 w-8 text-blue-400 mb-2" />
                    <h3 className="font-semibold text-white text-sm mb-1">{contact.name}</h3>
                    <p className="text-sm text-white font-medium mb-2">{contact.displayPhone}</p>
                    <div className="flex items-center gap-1 mt-auto">
                      <Clock className="h-3 w-3 text-white" />
                      <span className="text-xs text-white">{contact.availability}</span>
                    </div>
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>
      </div>

      {/* 3. INDUSTRY-SPECIFIC SECTION - Amber/Yellow Theme */}
      <Card className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border-amber-500/30">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-amber-400" />
            <CardTitle className="text-amber-300 text-lg">Electrical Industry Support</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {industryContacts.map((contact, index) => (
            <div key={index} className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/20">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-sm mb-1">{contact.name}</h3>
                  <p className="text-sm text-white mb-2">{contact.description}</p>
                  <a href={`tel:${contact.phone}`} className="inline-flex items-center gap-2 text-amber-300 font-medium hover:text-amber-200">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">{contact.displayPhone}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 4. ONLINE RESOURCES SECTION */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-3">Online Resources</h2>
        <Card className="border-green-500/20 bg-green-500/10">
          <CardContent className="p-3">
            <div className="space-y-1">
              {onlineResources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 hover:bg-green-500/20 rounded-lg transition-all group min-h-[48px]"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <ExternalLink className="h-5 w-5 text-green-400 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white text-sm">{resource.name}</h3>
                      <p className="text-sm text-white truncate">{resource.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-white shrink-0 group-hover:translate-x-1 transition-transform" />
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Important Information Footer */}
      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardContent className="p-4">
          <p className="text-sm text-white text-center">
            All services listed are free and confidential. Don't hesitate to reach out - help is available.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportNetworkTab;
