
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Search, ChevronDown, ChevronUp, HelpCircle, AlertTriangle, Zap, Wrench, BookOpen, Users, Clock, Shield } from "lucide-react";

interface Question {
  id: string;
  question: string;
  answer: string;
  category: "safety" | "technical" | "communication" | "regulations" | "practical" | "workplace" | "emergency" | "tools";
  tags: string[];
  priority: "high" | "medium" | "low";
}

const questions: Question[] = [
  // Safety Questions
  {
    id: "safety-001",
    question: "What should I do if I'm asked to work on a circuit that hasn't been properly isolated?",
    answer: "Never work on a live circuit. Politely explain that you need to follow safe isolation procedures first. Use the proper isolation sequence: identify the circuit, isolate it, secure the isolation, test the circuit is dead with a voltage tester, and then test the voltage tester on a known live source. If your supervisor pressures you to skip safety procedures, escalate to your training provider or HSE.",
    category: "safety",
    tags: ["isolation", "live working", "safety procedures"],
    priority: "high"
  },
  {
    id: "safety-002",
    question: "My supervisor doesn't wear PPE consistently. Should I still wear mine?",
    answer: "Absolutely, always wear your required PPE regardless of what others do. You have a duty of care to yourself. If safety standards aren't being followed consistently on site, document this and report it to your training provider. Lead by example and don't compromise on safety.",
    category: "safety",
    tags: ["PPE", "safety culture", "personal responsibility"],
    priority: "high"
  },
  {
    id: "safety-003",
    question: "What should I do if I witness an unsafe practice on site?",
    answer: "First, ensure your own safety. If it's immediately dangerous, intervene if safe to do so. Document what you saw (date, time, people involved, what happened). Report it to your supervisor, and if they don't act, escalate to the site manager or your training provider. You have a legal duty to report unsafe practices.",
    category: "safety",
    tags: ["unsafe practices", "reporting", "whistleblowing"],
    priority: "high"
  },
  {
    id: "safety-004",
    question: "How do I know if the tools I'm given are safe to use?",
    answer: "Always inspect tools before use. Check for damage to cables, plugs, casings, and guards. Ensure PAT testing is current (look for valid test labels). If in doubt, don't use it - ask for a replacement. Report any damaged tools immediately and take them out of service.",
    category: "safety",
    tags: ["tool safety", "PAT testing", "inspection"],
    priority: "high"
  },
  {
    id: "safety-005",
    question: "What should I do if I make a mistake that could affect safety?",
    answer: "Report it immediately to your supervisor - honesty is crucial for safety. Don't try to hide or fix it secretly. Explain what happened, what you've learned, and how you'll prevent it in future. Most supervisors appreciate honesty and will use it as a learning opportunity.",
    category: "safety",
    tags: ["mistakes", "honesty", "learning"],
    priority: "high"
  },

  // Technical Questions
  {
    id: "technical-001",
    question: "I'm not sure about the cable size calculation my supervisor gave me. How should I approach this?",
    answer: "Ask your supervisor to walk through the calculation with you. Bring your regulations book and show the sections you're referencing. Ask questions like 'Can you help me understand how you got this current rating?' or 'Which derating factors did you apply here?' This shows you're engaged and want to learn properly.",
    category: "technical",
    tags: ["calculations", "cable sizing", "learning"],
    priority: "medium"
  },
  {
    id: "technical-002",
    question: "What should I do if I'm asked to install something that doesn't seem to comply with BS 7671?",
    answer: "Politely question it: 'I want to make sure I understand the regulations correctly. Can you help me see how this complies with BS 7671?' Show the relevant regulation. If still unsure, ask to check with another qualified person or your training provider before proceeding.",
    category: "technical",
    tags: ["BS 7671", "compliance", "regulations"],
    priority: "high"
  },
  {
    id: "technical-003",
    question: "How do I ask for help with testing procedures without seeming incompetent?",
    answer: "Frame it as wanting to learn proper procedure: 'I want to make sure I'm doing this test correctly. Can you walk me through your process?' or 'I've done this before but want to make sure I'm following your site procedures.' Most supervisors appreciate apprentices who want to do things right.",
    category: "technical",
    tags: ["testing", "learning", "procedures"],
    priority: "medium"
  },
  {
    id: "technical-004",
    question: "What if I'm asked to work on a system I've never seen before?",
    answer: "Be honest about your experience level: 'I haven't worked on this type of system before. Can you show me the basics and let me observe first?' Ask for relevant documentation or drawings. Take notes and ask questions throughout the process.",
    category: "technical",
    tags: ["new systems", "learning", "documentation"],
    priority: "medium"
  },
  {
    id: "technical-005",
    question: "How do I know when I'm ready to work independently on a task?",
    answer: "You should be able to explain the task, identify the hazards, know the safety procedures, understand the regulations involved, and have successfully completed similar tasks under supervision. Ask your supervisor: 'Do you think I'm ready to do this independently?' and discuss any concerns.",
    category: "technical",
    tags: ["independence", "competency", "supervision"],
    priority: "medium"
  },

  // Communication Questions
  {
    id: "communication-001",
    question: "How do I ask questions without annoying my supervisor?",
    answer: "Time your questions appropriately - not when they're dealing with urgent issues. Group related questions together. Show you've tried to find the answer first: 'I checked the regs but want to confirm my understanding...' Always thank them for their time and follow up on what you learned.",
    category: "communication",
    tags: ["questioning", "timing", "respect"],
    priority: "medium"
  },
  {
    id: "communication-002",
    question: "What should I do if my supervisor gives me conflicting instructions?",
    answer: "Clarify politely: 'Yesterday you mentioned X, but today you're saying Y. Can you help me understand which approach you'd prefer?' If it's about safety or regulations, ask for clarification in writing or involve another qualified person.",
    category: "communication",
    tags: ["conflicting instructions", "clarification"],
    priority: "medium"
  },
  {
    id: "communication-003",
    question: "How do I handle criticism from my supervisor?",
    answer: "Listen without getting defensive. Ask clarifying questions: 'What specifically should I do differently?' Take notes and ask for examples of the correct way. Thank them for the feedback and follow up later to show you've implemented their suggestions.",
    category: "communication",
    tags: ["criticism", "feedback", "improvement"],
    priority: "medium"
  },
  {
    id: "communication-004",
    question: "What if I disagree with my supervisor's approach to a task?",
    answer: "Approach it as a learning opportunity: 'I was taught to do it this way. Can you explain the advantages of your method?' or 'Is there a specific reason we're doing it this way on this site?' Be open to learning different approaches while ensuring safety isn't compromised.",
    category: "communication",
    tags: ["disagreement", "different methods", "learning"],
    priority: "medium"
  },
  {
    id: "communication-005",
    question: "How do I communicate with other trades on site?",
    answer: "Be respectful and professional. Introduce yourself and your role. Coordinate work to avoid conflicts. Communicate any issues that affect their work early. Use clear, simple language and confirm understanding. Remember, you represent the electrical trade.",
    category: "communication",
    tags: ["other trades", "coordination", "professionalism"],
    priority: "medium"
  },

  // Workplace Questions
  {
    id: "workplace-001",
    question: "What should I do if I'm being asked to do tasks outside my scope of work?",
    answer: "Politely explain your limitations: 'I'm only qualified to work on X as an apprentice. I'd be happy to help with Y once I'm qualified.' If pressured, contact your training provider. Keep a record of such requests and your responses.",
    category: "workplace",
    tags: ["scope of work", "limitations", "training provider"],
    priority: "high"
  },
  {
    id: "workplace-002",
    question: "How do I handle workplace banter that makes me uncomfortable?",
    answer: "Set boundaries politely but firmly: 'I'm not comfortable with that kind of talk' or 'Let's keep it professional.' If it continues, document it and speak to your supervisor or training provider. You have the right to a respectful workplace.",
    category: "workplace",
    tags: ["banter", "harassment", "boundaries"],
    priority: "high"
  },
  {
    id: "workplace-003",
    question: "What if I'm not getting enough learning opportunities?",
    answer: "Discuss with your supervisor: 'I'm keen to learn more about X. Are there opportunities for me to get involved?' Suggest specific areas you want to develop. If this doesn't improve things, discuss with your training provider during your next review.",
    category: "workplace",
    tags: ["learning opportunities", "development", "training"],
    priority: "medium"
  },
  {
    id: "workplace-004",
    question: "How do I handle being the only apprentice or youngest person on site?",
    answer: "Focus on being professional, punctual, and eager to learn. Don't try to prove yourself by taking unnecessary risks. Build relationships gradually through competent work. Ask questions and show respect for experienced workers' knowledge.",
    category: "workplace",
    tags: ["isolation", "age", "relationships"],
    priority: "medium"
  },
  {
    id: "workplace-005",
    question: "What should I do if I'm not being paid correctly or on time?",
    answer: "Keep records of your hours worked and pay received. Check your contract for pay rates and payment terms. Raise it with your supervisor first, then your training provider if not resolved. You may need to contact ACAS if the issue persists.",
    category: "workplace",
    tags: ["pay", "contract", "ACAS"],
    priority: "high"
  },

  // Emergency Questions
  {
    id: "emergency-001",
    question: "What should I do if someone gets an electric shock?",
    answer: "DO NOT touch them if they're still in contact with electricity. Turn off the power at the source if possible. If you can't, use a non-conductive item to separate them from the source. Call 999 immediately. Start CPR if trained and they're not breathing. Get the first aider and defibrillator if available.",
    category: "emergency",
    tags: ["electric shock", "first aid", "emergency"],
    priority: "high"
  },
  {
    id: "emergency-002",
    question: "What should I do if I cause a fire with electrical equipment?",
    answer: "Turn off the power if safe to do so. Raise the alarm immediately. Use a CO2 fire extinguisher for electrical fires - never use water. Evacuate the area if the fire is spreading. Call 999 and report to the site manager immediately.",
    category: "emergency",
    tags: ["fire", "electrical fire", "evacuation"],
    priority: "high"
  },
  {
    id: "emergency-003",
    question: "What if I'm injured at work?",
    answer: "Seek immediate medical attention if serious. Report the injury to your supervisor immediately. Ensure it's recorded in the accident book. Take photos if appropriate. Contact your training provider as soon as possible. Don't sign anything without understanding it fully.",
    category: "emergency",
    tags: ["injury", "accident book", "reporting"],
    priority: "high"
  },

  // Tools and Equipment Questions
  {
    id: "tools-001",
    question: "What should I do if I'm not provided with the right tools for the job?",
    answer: "Never compromise on safety by using inappropriate tools. Explain to your supervisor: 'I need X tool to do this job safely. What's the best way to get it?' If told to 'make do', explain the safety risks and document the conversation.",
    category: "tools",
    tags: ["appropriate tools", "safety", "equipment"],
    priority: "high"
  },
  {
    id: "tools-002",
    question: "How do I know if my test equipment is working correctly?",
    answer: "Check calibration certificates are current. Test your tester on a known live source before and after use. Look for any physical damage. If readings seem wrong, stop and get it checked. Never trust test results from faulty equipment.",
    category: "tools",
    tags: ["test equipment", "calibration", "proving"],
    priority: "high"
  },
  {
    id: "tools-003",
    question: "What if I damage a tool or piece of equipment?",
    answer: "Report it immediately to your supervisor. Don't try to hide it or continue using damaged equipment. Explain how it happened and what you've learned. Take responsibility and offer to replace it if it was due to misuse.",
    category: "tools",
    tags: ["damage", "responsibility", "honesty"],
    priority: "medium"
  },

  // Regulations and Standards
  {
    id: "regulations-001",
    question: "How do I stay current with regulation changes?",
    answer: "Subscribe to IET updates, follow relevant industry publications, attend CPD events, and discuss changes with your supervisor and training provider. Keep your regulations book updated and make notes about amendments as you learn about them.",
    category: "regulations",
    tags: ["updates", "CPD", "IET"],
    priority: "low"
  },
  {
    id: "regulations-002",
    question: "What if local building control has different requirements?",
    answer: "Building regulations take precedence over BS 7671 where they conflict. Always check local requirements and discuss any conflicts with your supervisor. When in doubt, follow the more stringent requirement or contact building control directly.",
    category: "regulations",
    tags: ["building control", "local requirements", "conflicts"],
    priority: "medium"
  },

  // Practical Scenarios
  {
    id: "practical-001",
    question: "What should I do if a job is taking much longer than expected?",
    answer: "Communicate early with your supervisor. Explain what's causing the delay and ask for guidance: 'This is taking longer than expected because of X. Should I continue with this approach or is there a better way?' Don't struggle in silence.",
    category: "practical",
    tags: ["delays", "communication", "efficiency"],
    priority: "medium"
  },
  {
    id: "practical-002",
    question: "How do I handle working in difficult conditions (cramped spaces, heights, etc.)?",
    answer: "Assess the risks and discuss with your supervisor. Ensure you have appropriate training and equipment. Take regular breaks and stay hydrated. Speak up if you feel unsafe - your safety is more important than completing the task quickly.",
    category: "practical",
    tags: ["difficult conditions", "risk assessment", "safety"],
    priority: "high"
  },
  {
    id: "practical-003",
    question: "What if I discover existing work that doesn't meet current standards?",
    answer: "Don't alter existing work without permission. Document what you've found and report it to your supervisor. They'll decide whether it needs upgrading or just noting. Take photos if appropriate and keep records.",
    category: "practical",
    tags: ["existing work", "standards", "documentation"],
    priority: "medium"
  }
];

const QuestionsTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

  const categories = [
    { value: "all", label: "All Questions", icon: HelpCircle },
    { value: "safety", label: "Safety", icon: Shield },
    { value: "technical", label: "Technical", icon: Zap },
    { value: "communication", label: "Communication", icon: Users },
    { value: "workplace", label: "Workplace", icon: Clock },
    { value: "emergency", label: "Emergency", icon: AlertTriangle },
    { value: "tools", label: "Tools & Equipment", icon: Wrench },
    { value: "regulations", label: "Regulations", icon: BookOpen },
    { value: "practical", label: "Practical", icon: Wrench }
  ];

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         q.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         q.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || q.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleQuestion = (questionId: string) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId);
    } else {
      newExpanded.add(questionId);
    }
    setExpandedQuestions(newExpanded);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500/20 text-red-300 border-red-500/30";
      case "medium": return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "low": return "bg-green-500/20 text-green-300 border-green-500/30";
      default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(cat => cat.value === category);
    return categoryData ? categoryData.icon : HelpCircle;
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-elec-yellow">Question Bank</h2>
        <p className="text-muted-foreground">
          Common questions apprentices ask supervisors with professional guidance on how to approach each situation
        </p>
      </div>

      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search questions, answers, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.value)}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                {category.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No questions found matching your search criteria.</p>
          </Card>
        ) : (
          filteredQuestions.map((question) => {
            const Icon = getCategoryIcon(question.category);
            return (
              <Card key={question.id} className="border-elec-yellow/20">
                <Collapsible>
                  <CollapsibleTrigger
                    className="w-full"
                    onClick={() => toggleQuestion(question.id)}
                  >
                    <CardHeader className="hover:bg-elec-gray/50 transition-colors">
                      <div className="flex items-start gap-4 text-left">
                        <Icon className="h-5 w-5 text-elec-yellow mt-1 flex-shrink-0" />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base font-medium">
                              {question.question}
                            </CardTitle>
                            {expandedQuestions.has(question.id) ? (
                              <ChevronUp className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline" className="capitalize">
                              {question.category}
                            </Badge>
                            <Badge className={getPriorityColor(question.priority)}>
                              {question.priority} priority
                            </Badge>
                            {question.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      <div className="ml-9 p-4 bg-elec-dark/30 rounded-lg">
                        <p className="text-sm leading-relaxed whitespace-pre-line">
                          {question.answer}
                        </p>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            );
          })
        )}
      </div>

      {/* Summary Stats */}
      <Card className="bg-elec-gray/50 border-elec-yellow/20">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-elec-yellow">{questions.length}</div>
              <div className="text-sm text-muted-foreground">Total Questions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-300">
                {questions.filter(q => q.priority === "high").length}
              </div>
              <div className="text-sm text-muted-foreground">High Priority</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-elec-yellow">
                {categories.length - 1}
              </div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-300">
                {filteredQuestions.length}
              </div>
              <div className="text-sm text-muted-foreground">Filtered Results</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionsTab;
