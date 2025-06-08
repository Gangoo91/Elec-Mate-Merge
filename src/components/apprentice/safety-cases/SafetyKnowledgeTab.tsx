
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, BookOpen, FileText, CheckSquare, Star } from "lucide-react";

const SafetyKnowledgeTab = () => {
  const knowledgeAreas = [
    {
      title: "Electrical Safety Regulations",
      description: "Comprehensive guide to UK electrical safety regulations including Electricity at Work Regulations 1989",
      progress: 85,
      topics: ["Regulation Overview", "Duty of Care", "Competent Persons", "Safe Systems of Work"],
      difficulty: "Intermediate",
      duration: "45 mins"
    },
    {
      title: "Personal Protective Equipment",
      description: "Essential knowledge about PPE selection, use, and maintenance in electrical work",
      progress: 92,
      topics: ["PPE Categories", "Voltage Ratings", "Inspection Requirements", "Storage and Care"],
      difficulty: "Beginner",
      duration: "30 mins"
    },
    {
      title: "Safe Isolation Procedures",
      description: "Learn the critical 7-step safe isolation procedure for electrical work",
      progress: 78,
      topics: ["Identify", "Isolate", "Secure", "Test Dead", "Test Tester", "Issue Permit", "Begin Work"],
      difficulty: "Advanced",
      duration: "60 mins"
    },
    {
      title: "Arc Flash Protection",
      description: "Understanding arc flash hazards and protection methods in electrical installations",
      progress: 45,
      topics: ["Arc Flash Basics", "Hazard Assessment", "PPE Selection", "Safe Working Distances"],
      difficulty: "Advanced",
      duration: "75 mins"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Intermediate": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Advanced": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Safety Knowledge Library</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Build your electrical safety knowledge with our comprehensive library of learning modules. 
            Each module includes interactive content, assessments, and real-world applications.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {knowledgeAreas.map((area, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-white text-lg mb-2">{area.title}</CardTitle>
                  <div className="flex gap-2 mb-3">
                    <Badge className={getDifficultyColor(area.difficulty)}>
                      {area.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-muted-foreground">
                      {area.duration}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-elec-yellow">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm">{area.progress}%</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-sm">
                {area.description}
              </p>
              
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">Progress</span>
                    <span className="text-sm text-elec-yellow">{area.progress}%</span>
                  </div>
                  <div className="h-2 bg-elec-dark/60 rounded-full overflow-hidden">
                    <div className="h-full bg-elec-yellow" style={{ width: `${area.progress}%` }}></div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-elec-yellow" />
                    Key Topics:
                  </h4>
                  <div className="grid grid-cols-2 gap-1">
                    {area.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="text-xs text-muted-foreground flex items-center gap-2">
                        <CheckSquare className="h-3 w-3 text-green-400" />
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <Button className="w-full mt-4">
                <FileText className="mr-2 h-4 w-4" />
                {area.progress === 100 ? "Review Module" : "Continue Learning"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Learning Pathways
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-2">4</div>
              <div className="text-sm text-muted-foreground">Knowledge Areas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-2">75%</div>
              <div className="text-sm text-muted-foreground">Average Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow mb-2">3.5h</div>
              <div className="text-sm text-muted-foreground">Total Duration</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafetyKnowledgeTab;
