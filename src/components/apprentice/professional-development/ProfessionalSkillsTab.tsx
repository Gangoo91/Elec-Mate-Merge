
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  MessageSquare, 
  Clock, 
  Target, 
  Lightbulb, 
  CheckCircle,
  TrendingUp,
  Shield
} from "lucide-react";

const ProfessionalSkillsTab = () => {
  const skillCategories = [
    {
      title: "Communication Skills",
      icon: <MessageSquare className="h-6 w-6 text-blue-400" />,
      description: "Essential skills for effective workplace communication",
      skills: [
        "Client consultation and needs assessment",
        "Clear technical explanations to non-technical clients", 
        "Written communication for quotes and reports",
        "Active listening and questioning techniques",
        "Handling difficult conversations and complaints"
      ],
      importance: "Critical",
      color: "blue"
    },
    {
      title: "Time Management",
      icon: <Clock className="h-6 w-6 text-green-400" />,
      description: "Managing time effectively across multiple projects",
      skills: [
        "Project planning and scheduling",
        "Prioritising urgent vs important tasks",
        "Managing multiple client expectations",
        "Efficient job sequencing and routing",
        "Buffer time for unexpected complications"
      ],
      importance: "High",
      color: "green"
    },
    {
      title: "Problem Solving",
      icon: <Lightbulb className="h-6 w-6 text-amber-400" />,
      description: "Analytical thinking and creative solutions",
      skills: [
        "Systematic fault diagnosis approaches",
        "Creative solutions within budget constraints",
        "Risk assessment and mitigation planning",
        "Learning from mistakes and near-misses",
        "Adapting to unexpected site conditions"
      ],
      importance: "Critical",
      color: "amber"
    },
    {
      title: "Leadership & Teamwork",
      icon: <Users className="h-6 w-6 text-purple-400" />,
      description: "Working effectively with others and leading projects",
      skills: [
        "Mentoring junior colleagues and apprentices",
        "Coordinating with other trades on site",
        "Leading small project teams",
        "Conflict resolution between team members",
        "Building positive working relationships"
      ],
      importance: "High",
      color: "purple"
    },
    {
      title: "Business Acumen",
      icon: <TrendingUp className="h-6 w-6 text-elec-yellow" />,
      description: "Understanding the commercial side of electrical work",
      skills: [
        "Accurate job costing and pricing",
        "Understanding profit margins and overheads",
        "Customer service excellence",
        "Building long-term client relationships",
        "Basic financial management"
      ],
      importance: "Medium",
      color: "yellow"
    },
    {
      title: "Safety Leadership",
      icon: <Shield className="h-6 w-6 text-red-400" />,
      description: "Promoting and maintaining safe working practices",
      skills: [
        "Risk assessment and method statements",
        "Safety briefings and toolbox talks",
        "Challenging unsafe practices confidently",
        "Incident investigation and reporting",
        "Continuous safety improvement mindset"
      ],
      importance: "Critical",
      color: "red"
    }
  ];

  const developmentActivities = [
    {
      activity: "Professional Body Membership",
      description: "Join IET, NICEIC, or other professional organisations",
      benefit: "Access to resources, networking, and CPD opportunities"
    },
    {
      activity: "Industry Events & Exhibitions",
      description: "Attend trade shows, seminars, and networking events",
      benefit: "Stay current with technology and build professional network"
    },
    {
      activity: "Mentoring Others",
      description: "Guide apprentices or junior colleagues",
      benefit: "Develops leadership skills and reinforces your own knowledge"
    },
    {
      activity: "Cross-Trade Collaboration",
      description: "Work with plumbers, builders, and other trades",
      benefit: "Improves communication and project management skills"
    },
    {
      activity: "Customer Service Training",
      description: "Formal training in client relations and service excellence",
      benefit: "Enhances reputation and customer retention"
    }
  ];

  const getImportanceBadge = (importance: string, color: string) => {
    const colorMap: Record<string, string> = {
      blue: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      green: "bg-green-500/20 text-green-400 border-green-500/30",
      amber: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      purple: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      yellow: "bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30",
      red: "bg-red-500/20 text-red-400 border-red-500/30"
    };

    return (
      <Badge className={`${colorMap[color]} text-xs`}>
        {importance} Priority
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">Professional Skills Development</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Technical skills get you the job, but professional skills help you excel and advance. 
          Develop these essential competencies to become a well-rounded electrical professional.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-${category.color}-500/10`}>
                    {category.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                {getImportanceBadge(category.importance, category.color)}
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-200">{skill}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-elec-yellow" />
            Development Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {developmentActivities.map((activity, index) => (
              <div key={index} className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/10">
                <h4 className="font-medium text-white mb-2">{activity.activity}</h4>
                <p className="text-sm text-muted-foreground mb-3">{activity.description}</p>
                <div className="flex items-start gap-2">
                  <TrendingUp className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-green-300">{activity.benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/50 bg-gradient-to-r from-elec-yellow/10 to-amber-500/10">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Why Professional Skills Matter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold mb-2 text-elec-yellow">Career Advancement</h3>
              <p className="text-sm text-muted-foreground">
                Leadership and communication skills are essential for supervisory and management roles.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-elec-yellow">Client Relationships</h3>
              <p className="text-sm text-muted-foreground">
                Strong interpersonal skills lead to repeat business and positive referrals.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-elec-yellow">Professional Recognition</h3>
              <p className="text-sm text-muted-foreground">
                Well-rounded professionals are more respected and trusted in the industry.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfessionalSkillsTab;
