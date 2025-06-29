
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Search, Clock, AlertTriangle, BookOpen, Wrench, Users, Shield } from "lucide-react";
import { useState } from "react";

interface Question {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}

const questionBank: Question[] = [
  // Safety & Health Questions
  {
    id: "safety-001",
    question: "What should I do if I find a piece of equipment that looks damaged?",
    answer: "Stop work immediately and report it to your supervisor. Tag the equipment as 'DO NOT USE' if safe to do so. Never attempt to use damaged equipment as it could cause injury or electrocution. Document what you observed and when.",
    category: "Safety & Health",
    difficulty: "beginner",
    tags: ["equipment", "damage", "reporting", "safety"]
  },
  {
    id: "safety-002",
    question: "I'm working alone on site - what safety precautions should I take?",
    answer: "Ensure someone knows your location and expected finish time. Have a charged mobile phone with emergency contacts. Follow lone working procedures, carry out regular check-ins, and never work on live circuits alone. Consider if the task is suitable for lone working.",
    category: "Safety & Health",
    difficulty: "intermediate",
    tags: ["lone working", "procedures", "emergency"]
  },
  {
    id: "safety-003",
    question: "The client is pressuring me to skip the isolation procedure to save time. What do I do?",
    answer: "Never compromise on safety procedures regardless of pressure. Explain the legal requirements and safety risks. Contact your supervisor immediately for support. Isolation procedures are non-negotiable and protect both you and others on site.",
    category: "Safety & Health",
    difficulty: "advanced",
    tags: ["isolation", "pressure", "procedures", "legal"]
  },
  {
    id: "safety-004",
    question: "I've cut myself with a tool - it's not deep but it's bleeding. What's the procedure?",
    answer: "Stop work immediately and tend to the wound. Clean it with clean water, apply pressure to stop bleeding, and cover with a clean dressing. Report the incident to your supervisor and complete an accident report form. Seek medical attention if concerned about the depth or cleanliness of the cut.",
    category: "Safety & Health",
    difficulty: "beginner",
    tags: ["first aid", "accident", "reporting", "medical"]
  },

  // Technical Questions
  {
    id: "tech-001",
    question: "I'm getting a reading that doesn't match what I expected on my multimeter. Should I continue?",
    answer: "Stop and double-check your meter settings, probe connections, and test procedure. Verify your meter is working by testing on a known source. If readings are still unexpected, inform your supervisor before proceeding. Unexpected readings could indicate faults or safety issues.",
    category: "Technical Skills",
    difficulty: "intermediate",
    tags: ["testing", "measurements", "troubleshooting", "equipment"]
  },
  {
    id: "tech-002",
    question: "The circuit I'm working on keeps tripping the RCD. What could be causing this?",
    answer: "This indicates an earth leakage fault. Stop work and investigate systematically - check for damaged cables, moisture ingress, or faulty appliances. Use insulation resistance testing to locate the fault. Don't keep resetting the RCD as it's protecting against a potentially dangerous fault.",
    category: "Technical Skills",
    difficulty: "advanced",
    tags: ["RCD", "tripping", "earth leakage", "fault finding"]
  },
  {
    id: "tech-003",
    question: "How do I know what size cable to use for this circuit?",
    answer: "Consider the load current, installation method, ambient temperature, and voltage drop requirements. Use BS 7671 tables and our cable sizing calculator. Check with your supervisor if unsure - undersized cables can overheat and cause fires.",
    category: "Technical Skills",
    difficulty: "intermediate",
    tags: ["cable sizing", "BS 7671", "calculations", "installation"]
  },
  {
    id: "tech-004",
    question: "The customer wants an extra socket but there's no space in the consumer unit. What options do we have?",
    answer: "Options include upgrading the consumer unit, using a sub-distribution board, or running a spur from an existing circuit if capacity allows. This requires load calculations and compliance checks. Discuss with your supervisor as it may affect the design and quotation.",
    category: "Technical Skills",
    difficulty: "advanced",
    tags: ["consumer unit", "capacity", "design", "upgrade"]
  },

  // Regulations & Standards
  {
    id: "regs-001",
    question: "Do I need to notify Building Control for this installation?",
    answer: "Most electrical work requires notification unless it falls under minor works exemptions. Check Part P of Building Regulations and local authority requirements. When in doubt, notify. Your supervisor should confirm notification requirements before starting work.",
    category: "Regulations & Standards",
    difficulty: "intermediate",
    tags: ["Part P", "Building Control", "notification", "regulations"]
  },
  {
    id: "regs-002",
    question: "The existing installation doesn't meet current BS 7671 standards. Do we need to upgrade everything?",
    answer: "Existing installations don't need full upgrading unless being rewired. However, any new work must comply with current standards, and you shouldn't make the installation less safe. Some upgrades may be required at the distribution board or main earthing. Discuss specific requirements with your supervisor.",
    category: "Regulations & Standards",
    difficulty: "advanced",
    tags: ["BS 7671", "existing installation", "compliance", "upgrades"]
  },
  {
    id: "regs-003",
    question: "What certificates do I need to complete for this job?",
    answer: "Depends on the work type - Minor Electrical Installation Works Certificate for simple additions, or Electrical Installation Certificate for new circuits/consumer units. Your supervisor should specify which certificates are required and who will sign them off.",
    category: "Regulations & Standards",
    difficulty: "intermediate",
    tags: ["certificates", "documentation", "compliance", "sign-off"]
  },

  // Tools & Equipment
  {
    id: "tools-001",
    question: "My drill battery has died and I don't have a spare. Can I borrow tools from another tradesperson on site?",
    answer: "Only use tools you're trained and authorised to use. Check with your supervisor first - borrowed tools may not be PAT tested or suitable for electrical work. Company policy may prohibit using unauthorised tools for insurance and safety reasons.",
    category: "Tools & Equipment",
    difficulty: "beginner",
    tags: ["tools", "borrowing", "policy", "training"]
  },
  {
    id: "tools-002",
    question: "The cable I need isn't in the van. Can I use a different type that's similar?",
    answer: "Never substitute cables without checking specifications match exactly - consider insulation type, temperature rating, and application suitability. Contact your supervisor or the office to arrange correct cable delivery. Using incorrect cable could compromise safety and compliance.",
    category: "Tools & Equipment",
    difficulty: "intermediate",
    tags: ["materials", "substitution", "specifications", "compliance"]
  },
  {
    id: "tools-003",
    question: "The customer has offered me tea/coffee and wants to chat. How do I handle this professionally?",
    answer: "It's fine to be polite and accept refreshments, but maintain professional boundaries. Keep conversations brief and work-focused during working hours. If they want to discuss additional work, refer them to your supervisor for quotations.",
    category: "Professional Conduct",
    difficulty: "beginner",
    tags: ["customer relations", "professionalism", "boundaries", "additional work"]
  },

  // Site Management
  {
    id: "site-001",
    question: "There are other trades working in the same area. How do we coordinate the work?",
    answer: "Communicate with other trades about scheduling and safety requirements. Establish who works when and where to avoid conflicts. Some work may need to be sequential. Inform your supervisor if coordination issues arise that could affect your schedule.",
    category: "Site Management",
    difficulty: "intermediate",
    tags: ["coordination", "other trades", "scheduling", "communication"]
  },
  {
    id: "site-002",
    question: "The client keeps asking for changes to the original plan. How should I handle this?",
    answer: "Politely explain that changes need to be discussed with your supervisor and may affect cost and timeline. Don't agree to variations on the spot. Document what they're requesting and inform your supervisor promptly. Changes may require new risk assessments.",
    category: "Site Management",
    difficulty: "intermediate",
    tags: ["variations", "changes", "client management", "documentation"]
  },
  {
    id: "site-003",
    question: "I've made a mistake that will affect the job completion time. When should I tell my supervisor?",
    answer: "Immediately. The sooner issues are identified, the better they can be managed. Don't try to hide or fix significant mistakes alone. Your supervisor needs to know to manage client expectations, potentially reschedule resources, and ensure work quality.",
    category: "Site Management",
    difficulty: "beginner",
    tags: ["mistakes", "communication", "honesty", "problem solving"]
  },

  // Learning & Development
  {
    id: "learning-001",
    question: "I don't understand how to do a particular test procedure. Should I attempt it anyway?",
    answer: "Never attempt procedures you're not confident with, especially testing procedures which could affect safety. Ask for demonstration and explanation from your supervisor. It's better to admit knowledge gaps than make potentially dangerous mistakes.",
    category: "Learning & Development",
    difficulty: "beginner",
    tags: ["testing", "training", "competence", "safety"]
  },
  {
    id: "learning-002",
    question: "I want to learn more about renewable energy installations. How can I get involved?",
    answer: "Discuss your interests with your supervisor during reviews. They may arrange for you to observe or assist on renewable projects when appropriate. Consider additional courses or qualifications that align with company direction and your career goals.",
    category: "Learning & Development",
    difficulty: "intermediate",
    tags: ["career development", "renewable energy", "training", "opportunities"]
  },
  {
    id: "learning-003",
    question: "I feel like I'm not progressing fast enough in my apprenticeship. What can I do?",
    answer: "Schedule a review meeting with your supervisor to discuss your concerns and progress. They can identify specific areas for development and arrange additional training or experience. Progress varies between individuals - focus on steady improvement rather than comparing to others.",
    category: "Learning & Development",
    difficulty: "beginner",
    tags: ["progress", "development", "feedback", "career"]
  }
];

const categories = [
  { name: "Safety & Health", icon: Shield, color: "bg-red-500" },
  { name: "Technical Skills", icon: Wrench, color: "bg-blue-500" },
  { name: "Regulations & Standards", icon: BookOpen, color: "bg-green-500" },
  { name: "Tools & Equipment", icon: Clock, color: "bg-yellow-500" },
  { name: "Site Management", icon: Users, color: "bg-purple-500" },
  { name: "Professional Conduct", icon: AlertTriangle, color: "bg-orange-500" },
  { name: "Learning & Development", icon: BookOpen, color: "bg-indigo-500" }
];

const QuestionsTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  const filteredQuestions = questionBank.filter(question => {
    const matchesSearch = question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         question.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         question.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !selectedCategory || question.category === selectedCategory;
    const matchesDifficulty = !selectedDifficulty || question.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-elec-yellow" />
            Question Bank Search
          </CardTitle>
          <CardDescription>
            Find answers to common questions apprentices ask their supervisors
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search questions, answers, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-elec-dark border-elec-yellow/20"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedCategory === null ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category.name}
                variant={selectedCategory === category.name ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category.name === selectedCategory ? null : category.name)}
              >
                {category.name}
              </Badge>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Badge
              variant={selectedDifficulty === null ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedDifficulty(null)}
            >
              All Levels
            </Badge>
            {['beginner', 'intermediate', 'advanced'].map((level) => (
              <Badge
                key={level}
                variant={selectedDifficulty === level ? "default" : "outline"}
                className="cursor-pointer capitalize"
                onClick={() => setSelectedDifficulty(level === selectedDifficulty ? null : level)}
              >
                {level}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Showing {filteredQuestions.length} of {questionBank.length} questions
        </p>
        
        {filteredQuestions.map((question) => (
          <Collapsible key={question.id}>
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CollapsibleTrigger className="w-full">
                <CardHeader className="text-left hover:bg-elec-gray/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{question.question}</CardTitle>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className={getDifficultyColor(question.difficulty)}>
                          {question.difficulty}
                        </Badge>
                        <Badge variant="outline">
                          {question.category}
                        </Badge>
                        {question.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <ChevronDown className="h-4 w-4 text-elec-yellow shrink-0 ml-2" />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="bg-elec-dark p-4 rounded-md border border-elec-yellow/10">
                    <p className="text-elec-light leading-relaxed whitespace-pre-line">
                      {question.answer}
                    </p>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))}
        
        {filteredQuestions.length === 0 && (
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="text-center py-8">
              <Search className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No questions found matching your search criteria.</p>
              <p className="text-sm text-muted-foreground mt-2">Try adjusting your search terms or filters.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default QuestionsTab;
