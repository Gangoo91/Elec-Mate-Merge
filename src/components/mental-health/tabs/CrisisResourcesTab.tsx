
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Phone,
  Users,
  MapPin,
  Globe,
  AlertTriangle,
  Heart,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  MessageSquare,
  Clock
} from "lucide-react";
import LocalResourceFinder from "@/components/mental-health/crisis/LocalResourceFinder";
import { emergencyContacts, onlineResources } from "@/components/mental-health/crisis/CrisisResourcesData";

const CrisisResourcesTab = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>("helplines");

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Priority helplines to show prominently
  const priorityHelplines = emergencyContacts.filter(c =>
    c.type === 'emergency' || c.type === 'crisis'
  );

  const specialtyHelplines = emergencyContacts.filter(c =>
    c.type === 'support' || c.type === 'specialty'
  );

  return (
    <div className="space-y-4">
      {/* Emergency Call Banner - Always Prominent */}
      <Card className="border-red-500/50 bg-gradient-to-br from-red-600/20 to-red-500/10 shadow-lg shadow-red-500/10">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-red-500/30 flex items-center justify-center flex-shrink-0 animate-pulse">
              <Phone className="h-7 w-7 text-red-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-red-400 mb-1">Emergency? Call 999</h2>
              <p className="text-sm text-foreground/80">
                If you or someone else is in immediate danger
              </p>
            </div>
            <Button
              className="bg-red-500 hover:bg-red-600 text-foreground flex-shrink-0 h-12 px-5"
              asChild
            >
              <a href="tel:999">
                <Phone className="h-5 w-5 sm:mr-2" />
                <span className="hidden sm:inline">Call</span>
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Access - Main Crisis Lines */}
      <div className="grid grid-cols-2 gap-3">
        <a
          href="tel:116123"
          className="p-4 rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-500/20 to-blue-600/10
            active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-500/30 flex items-center justify-center">
              <Phone className="h-5 w-5 text-blue-400" />
            </div>
            <div className="text-xl font-bold text-blue-400">116 123</div>
          </div>
          <div className="text-sm font-medium text-foreground">Samaritans</div>
          <div className="text-xs text-white/80">Free 24/7 support</div>
        </a>

        <a
          href="sms:85258?body=SHOUT"
          className="p-4 rounded-xl border border-green-500/30 bg-gradient-to-br from-green-500/20 to-green-600/10
            active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-green-500/30 flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-green-400" />
            </div>
            <div className="text-xl font-bold text-green-400">85258</div>
          </div>
          <div className="text-sm font-medium text-foreground">Text SHOUT</div>
          <div className="text-xs text-white/80">Free text support</div>
        </a>
      </div>

      {/* Expandable Sections */}
      <div className="space-y-3">
        {/* Crisis Helplines Section */}
        <Card className="border-red-500/20 overflow-hidden">
          <button
            onClick={() => toggleSection("helplines")}
            className="w-full p-4 flex items-center justify-between bg-gradient-to-r from-red-500/10 to-transparent"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                <Phone className="h-5 w-5 text-red-400" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-foreground">Crisis Helplines</h3>
                <p className="text-xs text-white/80">{emergencyContacts.length} support lines available</p>
              </div>
            </div>
            {expandedSection === "helplines" ? (
              <ChevronUp className="h-5 w-5 text-white/80" />
            ) : (
              <ChevronDown className="h-5 w-5 text-white/80" />
            )}
          </button>

          {expandedSection === "helplines" && (
            <CardContent className="p-3 pt-0 space-y-2">
              {/* Priority Lines */}
              <div className="text-xs font-medium text-red-400 px-1 pt-2">Crisis Lines</div>
              {priorityHelplines.map((contact, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    contact.type === 'emergency'
                      ? 'border-red-500/40 bg-red-500/10'
                      : 'border-orange-500/30 bg-orange-500/5'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground text-sm">{contact.name}</h4>
                      <p className="text-xs text-white/80 line-clamp-2 mb-2">{contact.description}</p>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-yellow-400 font-mono font-bold">{contact.phone}</span>
                        <span className="text-white/80 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {contact.hours}
                        </span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className={contact.type === 'emergency' ? 'bg-red-500 hover:bg-red-600' : 'bg-orange-500 hover:bg-orange-600'}
                      asChild
                    >
                      <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>
                        <Phone className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              ))}

              {/* Specialty Lines */}
              <div className="text-xs font-medium text-blue-400 px-1 pt-3">Support Lines</div>
              {specialtyHelplines.map((contact, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg border border-white/10 bg-white/5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground text-sm">{contact.name}</h4>
                      <p className="text-xs text-white/80 line-clamp-2 mb-2">{contact.description}</p>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-blue-400 font-mono">{contact.phone}</span>
                        <span className="text-white/80">{contact.hours}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>
                        <Phone className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          )}
        </Card>

        {/* Local Services Section */}
        <Card className="border-green-500/20 overflow-hidden">
          <button
            onClick={() => toggleSection("local")}
            className="w-full p-4 flex items-center justify-between bg-gradient-to-r from-green-500/10 to-transparent"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-green-400" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-foreground">Find Local Support</h3>
                <p className="text-xs text-white/80">NHS services near you</p>
              </div>
            </div>
            {expandedSection === "local" ? (
              <ChevronUp className="h-5 w-5 text-white/80" />
            ) : (
              <ChevronDown className="h-5 w-5 text-white/80" />
            )}
          </button>

          {expandedSection === "local" && (
            <CardContent className="p-3 pt-0">
              <LocalResourceFinder />
            </CardContent>
          )}
        </Card>

        {/* Peer Support Section */}
        <Card className="border-purple-500/20 overflow-hidden">
          <button
            onClick={() => toggleSection("peer")}
            className="w-full p-4 flex items-center justify-between bg-gradient-to-r from-purple-500/10 to-transparent"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Users className="h-5 w-5 text-purple-400" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-foreground">Peer Support Groups</h3>
                <p className="text-xs text-white/80">Connect with others who understand</p>
              </div>
            </div>
            {expandedSection === "peer" ? (
              <ChevronUp className="h-5 w-5 text-white/80" />
            ) : (
              <ChevronDown className="h-5 w-5 text-white/80" />
            )}
          </button>

          {expandedSection === "peer" && (
            <CardContent className="p-3 pt-0 space-y-3">
              {/* Andy's Man Club */}
              <div className="p-4 rounded-lg border border-purple-500/30 bg-purple-500/10">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-purple-500/30 flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Andy's Man Club</h4>
                    <p className="text-xs text-white/80">#ITSOKAYTOTALK</p>
                  </div>
                </div>
                <p className="text-sm text-foreground/80 mb-3">
                  Free, peer-to-peer support groups for men. Meet every Monday at 7pm across the UK.
                </p>
                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-purple-500 hover:bg-purple-600"
                    onClick={() => window.open("https://andysmanclub.co.uk/find-your-nearest-group/", "_blank")}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Find Group
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="tel:08000239877">
                      <Phone className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* CALM */}
              <div className="p-4 rounded-lg border border-blue-500/30 bg-blue-500/10">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-blue-500/30 flex items-center justify-center flex-shrink-0">
                    <Heart className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">CALM</h4>
                    <p className="text-xs text-white/80">Campaign Against Living Miserably</p>
                  </div>
                </div>
                <p className="text-sm text-foreground/80 mb-3">
                  Support for men in the UK who are down or in crisis. Helpline and webchat available.
                </p>
                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-blue-500 hover:bg-blue-600"
                    onClick={() => window.open("https://www.thecalmzone.net/", "_blank")}
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    Visit Site
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="tel:0800585858">
                      <Phone className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Mates in Mind */}
              <div className="p-4 rounded-lg border border-amber-500/30 bg-amber-500/10">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-amber-500/30 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Mates in Mind</h4>
                    <p className="text-xs text-white/80">Construction Industry Support</p>
                  </div>
                </div>
                <p className="text-sm text-foreground/80 mb-3">
                  Mental health support specifically for construction workers and tradespeople.
                </p>
                <Button
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black"
                  onClick={() => window.open("https://www.matesinmind.org/", "_blank")}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Learn More
                </Button>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Online Resources Section */}
        <Card className="border-blue-500/20 overflow-hidden">
          <button
            onClick={() => toggleSection("online")}
            className="w-full p-4 flex items-center justify-between bg-gradient-to-r from-blue-500/10 to-transparent"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Globe className="h-5 w-5 text-blue-400" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-foreground">Online Resources</h3>
                <p className="text-xs text-white/80">{onlineResources.length} helpful websites</p>
              </div>
            </div>
            {expandedSection === "online" ? (
              <ChevronUp className="h-5 w-5 text-white/80" />
            ) : (
              <ChevronDown className="h-5 w-5 text-white/80" />
            )}
          </button>

          {expandedSection === "online" && (
            <CardContent className="p-3 pt-0 space-y-2">
              {onlineResources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 rounded-lg border border-white/10 bg-white/5
                    hover:bg-white/10 active:scale-[0.99] transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground text-sm">{resource.title}</h4>
                      <p className="text-xs text-white/80 line-clamp-2">{resource.description}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  </div>
                </a>
              ))}
            </CardContent>
          )}
        </Card>
      </div>

      {/* Important Information - Always Visible */}
      <Card className="border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <h3 className="font-semibold text-amber-400">When to seek immediate help</h3>
          </div>
          <ul className="space-y-2 text-sm text-foreground/80 ml-8">
            <li className="flex items-start gap-2">
              <span className="text-amber-400">•</span>
              Thoughts of suicide or self-harm
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400">•</span>
              Severe depression or anxiety affecting daily life
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400">•</span>
              Feeling disconnected from reality
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400">•</span>
              Substance abuse affecting your safety
            </li>
          </ul>
          <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <p className="text-sm text-blue-200 flex items-start gap-2">
              <Heart className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>Seeking help is a sign of strength. You deserve support and there are people who want to help.</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CrisisResourcesTab;
