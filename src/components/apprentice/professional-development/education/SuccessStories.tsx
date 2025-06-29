
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Quote, TrendingUp, Clock, MapPin } from "lucide-react";

const successStories = [
  {
    id: 1,
    name: "James Mitchell",
    age: 28,
    location: "Manchester",
    journey: {
      from: "Apprentice Electrician",
      to: "Electrical Design Engineer",
      timeline: "4 years"
    },
    education: "HND Electrical Engineering (Part-time)",
    funding: ["Advanced Learner Loan", "Employer Support"],
    salaryIncrease: "£8,000",
    story: "After completing my apprenticeship, I felt ready for more technical challenges. My employer supported me through an HND, allowing flexible study hours. The qualification opened doors to design work I never thought possible. The loan repayments are manageable, and the salary increase more than covers them.",
    keyTips: [
      "Discuss study plans with your employer early",
      "Part-time study worked well with shift patterns",
      "The practical experience really helped with theoretical modules"
    ]
  },
  {
    id: 2,
    name: "Sarah Thompson",
    age: 32,
    location: "Birmingham",
    journey: {
      from: "Maintenance Electrician",
      to: "Renewable Energy Specialist",
      timeline: "2 years"
    },
    education: "Multiple specialist courses (Solar PV, Heat Pumps, Battery Storage)",
    funding: ["Skills Development Grant", "Self-investment"],
    salaryIncrease: "£6,500",
    story: "I saw the renewable energy sector growing and wanted to be part of it. I used a combination of grants and savings to fund specialist courses. Within six months of completing my first solar PV course, I was earning 30% more. Now I run my own renewable energy installation business.",
    keyTips: [
      "Research growing market sectors",
      "Start with one specialisation and build from there",
      "Network with other professionals in the field"
    ]
  },
  {
    id: 3,
    name: "David Chen",
    age: 24,
    location: "London",
    journey: {
      from: "Commercial Electrician",
      to: "Project Manager",
      timeline: "3 years"
    },
    education: "HNC + Project Management Certification",
    funding: ["Advanced Learner Loan", "IET Grant"],
    salaryIncrease: "£12,000",
    story: "I always enjoyed the planning side of electrical work more than the hands-on installation. The HNC gave me the technical foundation, and the project management certification opened management opportunities. At 24, I'm now managing projects worth over £500k.",
    keyTips: [
      "Identify your strengths and interests early",
      "Combine technical and soft skills training",
      "Don't let age hold you back from leadership roles"
    ]
  },
  {
    id: 4,
    name: "Lisa Rodriguez",
    age: 35,
    location: "Edinburgh",
    journey: {
      from: "Industrial Electrician",
      to: "Technical Training Manager",
      timeline: "5 years"
    },
    education: "Degree in Electrical Engineering + Teaching Qualification",
    funding: ["Student Finance", "Career Development Loan"],
    salaryIncrease: "£15,000",
    story: "After 10 years as an electrician, I wanted to help train the next generation. I completed a degree through distance learning while working, then added a teaching qualification. Now I develop training programmes for a major engineering company and love seeing apprentices grow.",
    keyTips: [
      "Distance learning is perfect for career changers",
      "Teaching qualifications open unexpected doors",
      "Your practical experience is invaluable in education"
    ]
  },
  {
    id: 5,
    name: "Mark Williams",
    age: 29,
    location: "Cardiff",
    journey: {
      from: "Self-employed Electrician",
      to: "Smart Home Technology Consultant",
      timeline: "2 years"
    },
    education: "Smart Home & IoT Integration Courses",
    funding: ["Self-funded", "Business Development Grant"],
    salaryIncrease: "£10,000",
    story: "My customers started asking about smart home installations, so I invested in specialist training. The technology changes rapidly, but the premium rates make it worthwhile. I now charge £150/hour for smart home consultations compared to £45/hour for standard electrical work.",
    keyTips: [
      "Listen to what customers are asking for",
      "Embrace new technology trends",
      "Premium skills command premium rates"
    ]
  },
  {
    id: 6,
    name: "Rachel Baker",
    age: 26,
    location: "Bristol",
    journey: {
      from: "Apprentice (Level 3)",
      to: "Graduate Engineer",
      timeline: "4 years"
    },
    education: "Degree Apprenticeship in Electrical & Electronic Engineering",
    funding: ["Apprenticeship Levy", "No student debt"],
    salaryIncrease: "£14,000",
    story: "I went straight from Level 3 to a degree apprenticeship with a major engineering firm. Four years later, I graduated debt-free with a BEng and four years' paid experience. I'm now working on smart grid projects and earning more than many of my university friends who have student loans.",
    keyTips: [
      "Degree apprenticeships are an excellent debt-free option",
      "Large companies often have structured programmes",
      "You can earn while you learn at degree level"
    ]
  }
];

const SuccessStories = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">Real Success Stories</h3>
        <p className="text-muted-foreground">
          Learn from apprentices who've successfully funded and completed further education
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {successStories.map((story) => (
          <Card key={story.id} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{story.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{story.age} years old</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {story.location}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-green-400">+{story.salaryIncrease}</div>
                  <div className="text-xs text-muted-foreground">salary increase</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Journey Timeline */}
              <div className="bg-elec-dark/50 p-3 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-elec-yellow" />
                  <span className="font-semibold text-sm">Career Journey</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>{story.journey.from}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {story.journey.timeline}
                  </div>
                  <span className="text-elec-yellow font-semibold">{story.journey.to}</span>
                </div>
              </div>

              {/* Education & Funding */}
              <div>
                <div className="text-sm font-semibold mb-2">Education Path:</div>
                <div className="text-sm mb-2">{story.education}</div>
                <div className="flex flex-wrap gap-1">
                  {story.funding.map((fund, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {fund}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Story Quote */}
              <div className="relative">
                <Quote className="h-4 w-4 text-elec-yellow mb-2" />
                <p className="text-sm italic text-muted-foreground">
                  "{story.story}"
                </p>
              </div>

              {/* Key Tips */}
              <div>
                <div className="text-sm font-semibold mb-2 text-elec-yellow">Key Tips:</div>
                <div className="space-y-1">
                  {story.keyTips.map((tip, idx) => (
                    <div key={idx} className="text-xs bg-elec-dark/30 p-2 rounded">
                      • {tip}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Statistics */}
      <Card className="border-elec-yellow/20 bg-elec-gray/50">
        <CardHeader>
          <CardTitle>Success Story Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-elec-yellow">£9,250</div>
              <div className="text-sm text-muted-foreground">Average salary increase</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-elec-yellow">3.2 years</div>
              <div className="text-sm text-muted-foreground">Average study duration</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-elec-yellow">85%</div>
              <div className="text-sm text-muted-foreground">Used employer support</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-elec-yellow">100%</div>
              <div className="text-sm text-muted-foreground">Would recommend it</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/20 bg-green-500/10">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2 text-green-400">Share Your Success Story</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Have you successfully completed further education? Help inspire other apprentices by sharing your journey.
            </p>
            <Badge variant="outline" className="cursor-pointer hover:bg-green-500/20">
              Submit Your Story
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessStories;
