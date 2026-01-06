
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Quote, TrendingUp, Clock, MapPin, Star, Users, Sparkles, MessageCircle } from "lucide-react";

const successStories = [
  {
    id: 1,
    name: "James Mitchell",
    age: 28,
    location: "Manchester",
    journey: { from: "Apprentice Electrician", to: "Electrical Design Engineer", timeline: "4 years" },
    education: "HND Electrical Engineering (Part-time)",
    funding: ["Advanced Learner Loan", "Employer Support"],
    salaryIncrease: "£8,000",
    story: "After completing my apprenticeship, I felt ready for more technical challenges. My employer supported me through an HND, allowing flexible study hours. The qualification opened doors to design work I never thought possible.",
    keyTips: ["Discuss study plans with your employer early", "Part-time study worked well with shift patterns", "The practical experience really helped with theoretical modules"],
    color: "blue"
  },
  {
    id: 2,
    name: "Sarah Thompson",
    age: 32,
    location: "Birmingham",
    journey: { from: "Maintenance Electrician", to: "Renewable Energy Specialist", timeline: "2 years" },
    education: "Multiple specialist courses (Solar PV, Heat Pumps, Battery Storage)",
    funding: ["Skills Development Grant", "Self-investment"],
    salaryIncrease: "£6,500",
    story: "I saw the renewable energy sector growing and wanted to be part of it. I used a combination of grants and savings to fund specialist courses. Within six months of completing my first solar PV course, I was earning 30% more.",
    keyTips: ["Research growing market sectors", "Start with one specialisation and build from there", "Network with other professionals in the field"],
    color: "green"
  },
  {
    id: 3,
    name: "David Chen",
    age: 24,
    location: "London",
    journey: { from: "Commercial Electrician", to: "Project Manager", timeline: "3 years" },
    education: "HNC + Project Management Certification",
    funding: ["Advanced Learner Loan", "IET Grant"],
    salaryIncrease: "£12,000",
    story: "I always enjoyed the planning side of electrical work more than the hands-on installation. The HNC gave me the technical foundation, and the project management certification opened management opportunities. At 24, I'm now managing projects worth over £500k.",
    keyTips: ["Identify your strengths and interests early", "Combine technical and soft skills training", "Don't let age hold you back from leadership roles"],
    color: "purple"
  },
  {
    id: 4,
    name: "Lisa Rodriguez",
    age: 35,
    location: "Edinburgh",
    journey: { from: "Industrial Electrician", to: "Technical Training Manager", timeline: "5 years" },
    education: "Degree in Electrical Engineering + Teaching Qualification",
    funding: ["Student Finance", "Career Development Loan"],
    salaryIncrease: "£15,000",
    story: "After 10 years as an electrician, I wanted to help train the next generation. I completed a degree through distance learning while working, then added a teaching qualification. Now I develop training programmes for a major engineering company.",
    keyTips: ["Distance learning is perfect for career changers", "Teaching qualifications open unexpected doors", "Your practical experience is invaluable in education"],
    color: "yellow"
  },
  {
    id: 5,
    name: "Mark Williams",
    age: 29,
    location: "Cardiff",
    journey: { from: "Self-employed Electrician", to: "Smart Home Technology Consultant", timeline: "2 years" },
    education: "Smart Home & IoT Integration Courses",
    funding: ["Self-funded", "Business Development Grant"],
    salaryIncrease: "£10,000",
    story: "My customers started asking about smart home installations, so I invested in specialist training. I now charge £150/hour for smart home consultations compared to £45/hour for standard electrical work.",
    keyTips: ["Listen to what customers are asking for", "Embrace new technology trends", "Premium skills command premium rates"],
    color: "cyan"
  },
  {
    id: 6,
    name: "Rachel Baker",
    age: 26,
    location: "Bristol",
    journey: { from: "Apprentice (Level 3)", to: "Graduate Engineer", timeline: "4 years" },
    education: "Degree Apprenticeship in Electrical & Electronic Engineering",
    funding: ["Apprenticeship Levy", "No student debt"],
    salaryIncrease: "£14,000",
    story: "I went straight from Level 3 to a degree apprenticeship with a major engineering firm. Four years later, I graduated debt-free with a BEng and four years' paid experience. I'm now working on smart grid projects.",
    keyTips: ["Degree apprenticeships are an excellent debt-free option", "Large companies often have structured programmes", "You can earn while you learn at degree level"],
    color: "orange"
  }
];

const colorMap: Record<string, { bg: string; border: string; icon: string; badge: string; glow: string }> = {
  blue: {
    bg: "bg-gradient-to-br from-white/5 to-blue-950/20",
    border: "border-blue-500/30",
    icon: "text-blue-400",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    glow: "bg-blue-500/5"
  },
  green: {
    bg: "bg-gradient-to-br from-white/5 to-green-950/20",
    border: "border-green-500/30",
    icon: "text-green-400",
    badge: "bg-green-500/10 text-green-400 border-green-500/30",
    glow: "bg-green-500/5"
  },
  purple: {
    bg: "bg-gradient-to-br from-white/5 to-purple-950/20",
    border: "border-purple-500/30",
    icon: "text-purple-400",
    badge: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    glow: "bg-purple-500/5"
  },
  yellow: {
    bg: "bg-gradient-to-br from-white/5 to-yellow-950/20",
    border: "border-elec-yellow/30",
    icon: "text-elec-yellow",
    badge: "bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30",
    glow: "bg-elec-yellow/5"
  },
  cyan: {
    bg: "bg-gradient-to-br from-white/5 to-cyan-950/20",
    border: "border-cyan-500/30",
    icon: "text-cyan-400",
    badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    glow: "bg-cyan-500/5"
  },
  orange: {
    bg: "bg-gradient-to-br from-white/5 to-orange-950/20",
    border: "border-orange-500/30",
    icon: "text-orange-400",
    badge: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    glow: "bg-orange-500/5"
  }
};

const SuccessStories = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 border border-elec-yellow/30 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-elec-yellow/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
            <Star className="h-5 w-5 text-elec-yellow" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Real Success Stories</h3>
            <p className="text-sm text-white/70">
              Learn from electricians who've successfully funded and completed further education
            </p>
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {successStories.map((story) => {
          const colors = colorMap[story.color];
          return (
            <Card key={story.id} className={`${colors.bg} ${colors.border} border overflow-hidden relative`}>
              <div className={`absolute top-0 right-0 w-48 h-48 ${colors.glow} rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`} />
              <CardHeader className="relative pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-white">{story.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-[10px] bg-white/5 text-white/60 border-white/20">
                        {story.age} years old
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-white/60">
                        <MapPin className="h-3 w-3" />
                        {story.location}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-green-400">+{story.salaryIncrease}</div>
                    <div className="text-[10px] text-white/60">salary increase</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 relative">
                {/* Journey Timeline */}
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className={`h-4 w-4 ${colors.icon}`} />
                    <span className="font-semibold text-sm text-white">Career Journey</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">{story.journey.from}</span>
                    <div className="flex items-center gap-1 text-white/40">
                      <Clock className="h-3 w-3" />
                      {story.journey.timeline}
                    </div>
                    <span className={`font-semibold ${colors.icon}`}>{story.journey.to}</span>
                  </div>
                </div>

                {/* Education & Funding */}
                <div>
                  <div className="text-sm font-semibold mb-2 text-white">Education Path:</div>
                  <div className="text-sm mb-2 text-white/70">{story.education}</div>
                  <div className="flex flex-wrap gap-1">
                    {story.funding.map((fund, idx) => (
                      <Badge key={idx} variant="outline" className={`text-[10px] ${colors.badge}`}>
                        {fund}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Story Quote */}
                <div className="relative p-3 rounded-lg bg-white/5">
                  <Quote className={`h-4 w-4 ${colors.icon} mb-2`} />
                  <p className="text-sm italic text-white/70">
                    "{story.story}"
                  </p>
                </div>

                {/* Key Tips */}
                <div>
                  <div className={`text-sm font-semibold mb-2 ${colors.icon}`}>Key Tips:</div>
                  <div className="space-y-1">
                    {story.keyTips.map((tip, idx) => (
                      <div key={idx} className="text-xs p-2 rounded bg-white/5 text-white/70 flex items-start gap-2">
                        <Sparkles className={`h-3 w-3 ${colors.icon} mt-0.5 flex-shrink-0`} />
                        {tip}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary Statistics */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-elec-yellow/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
              <TrendingUp className="h-5 w-5 text-elec-yellow" />
            </div>
            Success Story Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
              <div className="text-2xl font-bold text-elec-yellow">£9,250</div>
              <div className="text-xs text-white/60">Average salary increase</div>
            </div>
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">3.2 years</div>
              <div className="text-xs text-white/60">Average study duration</div>
            </div>
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">85%</div>
              <div className="text-xs text-white/60">Used employer support</div>
            </div>
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-400">100%</div>
              <div className="text-xs text-white/60">Would recommend it</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Share Your Story */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/30">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-green-500/20">
            <MessageCircle className="h-5 w-5 text-green-400" />
          </div>
          <div>
            <p className="font-medium text-green-400 mb-1">Share Your Success Story</p>
            <p className="text-sm text-white/70">
              Have you successfully completed further education? Help inspire other apprentices by sharing your journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
