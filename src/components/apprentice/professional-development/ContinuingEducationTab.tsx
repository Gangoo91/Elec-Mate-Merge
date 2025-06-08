
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, GraduationCap, Clock, MapPin, Star } from "lucide-react";

const ContinuingEducationTab = () => {
  const educationPaths = [
    {
      title: "HNC Electrical Engineering",
      level: "Level 4",
      duration: "2-3 years part-time",
      mode: "Evening/Weekend",
      description: "Higher National Certificate providing technical knowledge and practical skills.",
      outcomes: ["Technical expertise", "Management opportunities", "Engineering pathway"],
      providers: ["Local colleges", "University centres"]
    },
    {
      title: "HND Electrical Engineering",
      level: "Level 5",
      duration: "2-4 years part-time",
      mode: "Part-time/Distance",
      description: "Higher National Diploma with advanced engineering concepts and project work.",
      outcomes: ["Senior technician roles", "Engineering positions", "Degree progression"],
      providers: ["Universities", "Specialist colleges"]
    },
    {
      title: "Degree in Electrical Engineering",
      level: "Level 6",
      duration: "3-6 years",
      mode: "Full-time/Part-time",
      description: "Bachelor's degree for comprehensive engineering knowledge and chartered status.",
      outcomes: ["Chartered Engineer pathway", "Design roles", "Management positions"],
      providers: ["Universities", "Online providers"]
    },
    {
      title: "Professional Development Courses",
      level: "Various",
      duration: "1 day - 6 months",
      mode: "Flexible",
      description: "Short courses in emerging technologies and industry updates.",
      outcomes: ["Current knowledge", "Specialist skills", "CPD credits"],
      providers: ["Professional bodies", "Training organisations"]
    }
  ];

  const studyMethods = [
    {
      method: "Part-time Study",
      description: "Evening and weekend classes while working",
      pros: ["Maintain income", "Apply learning immediately", "Employer support"],
      cons: ["Time management challenge", "Longer duration", "Work-life balance"]
    },
    {
      method: "Distance Learning",
      description: "Online courses with flexible scheduling",
      pros: ["Complete flexibility", "Self-paced", "No travel required"],
      cons: ["Self-discipline needed", "Limited face-to-face support", "Technical requirements"]
    },
    {
      method: "Block Release",
      description: "Intensive study periods with time off work",
      pros: ["Focused learning", "Peer interaction", "Accelerated progress"],
      cons: ["Employer agreement needed", "Intensive workload", "Income impact"]
    },
    {
      method: "Apprenticeship Route",
      description: "Higher and degree apprenticeships",
      pros: ["Earn while learning", "Guaranteed job", "No student debt"],
      cons: ["Limited availability", "Employer commitment", "Structured programme"]
    }
  ];

  const supportResources = [
    {
      title: "Student Finance",
      description: "Government loans and grants for higher education",
      details: ["Tuition fee loans", "Maintenance support", "Part-time student funding"]
    },
    {
      title: "Employer Support",
      description: "Company training budgets and study leave",
      details: ["Training allowances", "Study leave", "Flexible working", "Career progression"]
    },
    {
      title: "Professional Bodies",
      description: "IET, ECA, and other industry organisations",
      details: ["Scholarships", "Mentoring programmes", "CPD tracking", "Networking events"]
    },
    {
      title: "Open University",
      description: "Flexible degree programmes for working professionals",
      details: ["Part-time study", "Modular approach", "Credit transfer", "Support services"]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Further Education Pathways
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {educationPaths.map((path, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-white">{path.title}</h3>
                      <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/40 text-xs">
                        {path.level}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{path.description}</p>
                    <div className="flex items-center gap-4 text-sm text-elec-light/70 mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {path.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {path.mode}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-elec-yellow text-sm mb-2">Career Outcomes:</h4>
                    <ul className="space-y-1">
                      {path.outcomes.map((outcome, idx) => (
                        <li key={idx} className="text-xs text-elec-light/80 flex items-center gap-2">
                          <span className="w-1 h-1 bg-elec-yellow rounded-full"></span>
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-elec-yellow text-sm mb-2">Available At:</h4>
                    <div className="space-y-1">
                      {path.providers.map((provider, idx) => (
                        <p key={idx} className="text-xs text-elec-light/80">{provider}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-500/30 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Study Methods & Approaches
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studyMethods.map((method, index) => (
              <div key={index} className="border border-blue-500/20 rounded-lg p-4">
                <h3 className="font-semibold text-blue-400 mb-2">{method.method}</h3>
                <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
                
                <div className="space-y-2">
                  <div>
                    <h4 className="font-medium text-green-400 text-xs mb-1">Advantages:</h4>
                    <ul className="space-y-1">
                      {method.pros.map((pro, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-center gap-1">
                          <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-orange-400 text-xs mb-1">Considerations:</h4>
                    <ul className="space-y-1">
                      {method.cons.map((con, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-center gap-1">
                          <span className="w-1 h-1 bg-orange-400 rounded-full"></span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/30 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Star className="h-5 w-5" />
            Support & Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {supportResources.map((resource, index) => (
              <div key={index} className="border border-green-500/20 rounded-lg p-4">
                <h3 className="font-semibold text-green-400 mb-2">{resource.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                <ul className="space-y-1">
                  {resource.details.map((detail, idx) => (
                    <li key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                      <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContinuingEducationTab;
