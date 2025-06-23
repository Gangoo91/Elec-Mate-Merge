
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, MessageCircle, Calendar, MapPin, Clock, Star, BookOpen, Target } from "lucide-react";

const StudyGroupsTab = () => {
  const studyGroups = [
    {
      name: "18th Edition Warriors",
      members: 24,
      location: "Manchester",
      nextSession: "Tomorrow, 7:00 PM",
      focus: "BS 7671 Regulations",
      level: "Intermediate",
      rating: 4.8,
      description: "Dedicated group focusing on mastering the 18th Edition. Weekly sessions with mock exams and regulation deep-dives.",
      tags: ["18th Edition", "Mock Exams", "Regulations"]
    },
    {
      name: "Level 3 Theory Masters",
      members: 18,
      location: "Birmingham", 
      nextSession: "Saturday, 10:00 AM",
      focus: "AC Theory & Calculations",
      level: "Advanced",
      rating: 4.9,
      description: "Advanced theory group tackling complex calculations and AC principles. Perfect for Level 3 diploma preparation.",
      tags: ["Level 3", "AC Theory", "Calculations"]
    },
    {
      name: "AM2 Practice Squad",
      members: 12,
      location: "London",
      nextSession: "Sunday, 2:00 PM", 
      focus: "Practical Skills",
      level: "Advanced",
      rating: 4.7,
      description: "Hands-on practice group for AM2 preparation. Access to practice rigs and testing equipment.",
      tags: ["AM2", "Practical", "Testing"]
    },
    {
      name: "Apprentice Beginners",
      members: 35,
      location: "Online",
      nextSession: "Tonight, 8:00 PM",
      focus: "Fundamentals",
      level: "Beginner",
      rating: 4.6,
      description: "Welcoming group for new apprentices. Covers basic electrical principles and industry knowledge.",
      tags: ["Beginners", "Online", "Fundamentals"]
    }
  ];

  const groupBenefits = [
    {
      icon: Users,
      title: "Peer Learning",
      description: "Learn from fellow apprentices and share experiences",
      benefits: ["Different perspectives on complex topics", "Motivation through shared goals", "Real-world application examples"]
    },
    {
      icon: MessageCircle,
      title: "Discussion & Debate",
      description: "Engage in meaningful discussions about electrical concepts",
      benefits: ["Clarify confusing topics", "Test your understanding", "Learn teaching skills"]
    },
    {
      icon: Target,
      title: "Accountability",
      description: "Stay motivated with regular group commitments",
      benefits: ["Consistent study schedule", "Progress tracking", "Mutual encouragement"]
    },
    {
      icon: BookOpen,
      title: "Resource Sharing",
      description: "Access pooled study materials and resources",
      benefits: ["Shared notes and summaries", "Practice questions", "Industry insights"]
    }
  ];

  const virtualStudyTips = [
    {
      platform: "Discord Study Servers",
      description: "Join dedicated electrical study Discord servers for 24/7 support",
      features: ["Voice study rooms", "Screen sharing", "File sharing", "Study timers"]
    },
    {
      platform: "Zoom Study Sessions",
      description: "Organised video calls with structured learning activities",
      features: ["Recorded sessions", "Breakout rooms", "Whiteboard sharing", "Calendar integration"]
    },
    {
      platform: "WhatsApp Groups",
      description: "Quick questions and daily motivation through messaging groups",
      features: ["Instant messaging", "Photo sharing", "Voice messages", "File documents"]
    },
    {
      platform: "Study Apps",
      description: "Collaborative study apps for shared flashcards and quizzes",
      features: ["Shared flashcard decks", "Group challenges", "Progress tracking", "Leaderboards"]
    }
  ];

  const studyGroupFormats = [
    {
      format: "Question & Answer Sessions",
      duration: "1-2 hours",
      description: "Focused sessions where members bring their toughest questions",
      structure: ["Problem presentation (10 mins)", "Group discussion (20 mins)", "Solution summary (10 mins)", "Next problem"]
    },
    {
      format: "Mock Exam Practice",
      duration: "2-3 hours", 
      description: "Timed practice exams followed by group review and discussion",
      structure: ["Exam setup (15 mins)", "Timed exam (90 mins)", "Break (15 mins)", "Group review (45 mins)"]
    },
    {
      format: "Teaching Rotations",
      duration: "1.5-2 hours",
      description: "Members take turns teaching topics to reinforce their own learning",
      structure: ["Preparation time (15 mins)", "Teaching session (20 mins)", "Q&A (10 mins)", "Feedback (5 mins)"]
    },
    {
      format: "Case Study Analysis",
      duration: "2 hours",
      description: "Real-world electrical scenarios discussed and solved as a group",
      structure: ["Case presentation (20 mins)", "Individual analysis (30 mins)", "Group discussion (60 mins)", "Summary (10 mins)"]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Study Groups & Collaborative Learning</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Join fellow electrical apprentices in structured study groups. Research shows that collaborative learning 
            can improve retention by up to 90% compared to studying alone.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 border border-elec-yellow/20 rounded-lg">
              <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <p className="text-lg font-bold text-white">150+</p>
              <p className="text-xs text-muted-foreground">Active Groups</p>
            </div>
            <div className="text-center p-3 border border-elec-yellow/20 rounded-lg">
              <MessageCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-lg font-bold text-white">1,200+</p>
              <p className="text-xs text-muted-foreground">Members</p>
            </div>
            <div className="text-center p-3 border border-elec-yellow/20 rounded-lg">
              <Calendar className="h-8 w-8 text-elec-yellow mx-auto mb-2" />
              <p className="text-lg font-bold text-white">Daily</p>
              <p className="text-xs text-muted-foreground">Sessions</p>
            </div>
            <div className="text-center p-3 border border-elec-yellow/20 rounded-lg">
              <Star className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <p className="text-lg font-bold text-white">4.8/5</p>
              <p className="text-xs text-muted-foreground">Avg Rating</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Study Groups */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Find Your Study Group</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studyGroups.map((group, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-white mb-1">{group.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {group.members}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {group.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {group.rating}
                      </span>
                    </div>
                  </div>
                  <Badge variant="outline" className={`text-xs ${
                    group.level === 'Beginner' ? 'border-green-400 text-green-400' :
                    group.level === 'Intermediate' ? 'border-yellow-400 text-yellow-400' :
                    'border-red-400 text-red-400'
                  }`}>
                    {group.level}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{group.description}</p>
                
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-4 w-4 text-elec-yellow" />
                  <span className="text-sm text-white">Next: {group.nextSession}</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {group.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs border-white/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">Join Group</Button>
                  <Button size="sm" variant="outline">View Details</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Benefits of Study Groups */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
        <CardHeader>
          <CardTitle className="text-green-400">Why Study Groups Work</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groupBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="border border-green-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <IconComponent className="h-6 w-6 text-green-400" />
                    <h4 className="font-semibold text-white">{benefit.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{benefit.description}</p>
                  <ul className="space-y-1">
                    {benefit.benefits.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-xs text-muted-foreground flex items-start gap-2">
                        <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Virtual Study Options */}
      <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
        <CardHeader>
          <CardTitle className="text-blue-400">Virtual Study Platforms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {virtualStudyTips.map((tip, index) => (
              <div key={index} className="border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{tip.platform}</h4>
                <p className="text-sm text-muted-foreground mb-3">{tip.description}</p>
                <div className="space-y-1">
                  {tip.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="text-xs text-blue-300 flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Study Group Formats */}
      <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
        <CardHeader>
          <CardTitle className="text-purple-400">Effective Study Group Formats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {studyGroupFormats.map((format, index) => (
              <div key={index} className="border border-purple-500/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white">{format.format}</h4>
                  <Badge variant="outline" className="text-xs border-purple-400/30 text-purple-400">
                    {format.duration}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{format.description}</p>
                <div className="bg-purple-500/10 rounded-lg p-3">
                  <h5 className="font-medium text-purple-300 mb-2">Typical Structure:</h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {format.structure.map((step, stepIndex) => (
                      <div key={stepIndex} className="text-xs text-muted-foreground">
                        <span className="text-purple-400 font-medium">{stepIndex + 1}.</span> {step}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-orange-500/10">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-semibold text-elec-yellow mb-2">Ready to Join a Study Group?</h3>
          <p className="text-muted-foreground mb-4">
            Connect with fellow apprentices and accelerate your learning through collaborative study.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
              Find Groups Near Me
            </Button>
            <Button variant="outline" className="border-elec-yellow/30">
              Create New Group
            </Button>
            <Button variant="outline" className="border-elec-yellow/30">
              Join Online Session
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyGroupsTab;
