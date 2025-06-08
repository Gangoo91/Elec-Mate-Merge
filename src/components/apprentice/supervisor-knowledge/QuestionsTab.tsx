
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Search, MessageSquare, Star, Clock, User, CheckCircle, AlertCircle, BookOpen, Lightbulb } from "lucide-react";
import { useState } from "react";

const QuestionsTab = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const questionCategories = [
    {
      category: "Technical & Testing",
      icon: CheckCircle,
      color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      questions: [
        {
          id: "t1",
          question: "How do I fill out a schedule of test results correctly?",
          difficulty: "Intermediate",
          votes: 124,
          answer: "When completing a schedule of test results, follow these essential steps:\n\n1. **Circuit Description**: Write clear, descriptive names (e.g., 'Ground Floor Ring Final - Kitchen & Utility')\n2. **Reference Method**: Note the cable installation method (e.g., Method C - clipped direct)\n3. **Protective Device**: Record type and rating (e.g., '32A Type B MCB')\n4. **Conductor CSA**: Note cable size (e.g., '2.5mm² + 1.5mm² CPC')\n5. **Test Results**: Record all values with units:\n   - Continuity (R1+R2): measured in ohms (Ω)\n   - Insulation Resistance: minimum 1MΩ at 500V DC\n   - Earth Fault Loop Impedance (Zs): maximum values per BS 7671\n   - Polarity: confirm correct connections\n   - RCD operation: trip times and currents\n\n**Critical Points:**\n- Use indelible ink (black or blue)\n- No correction fluid - cross out errors with single line\n- Sign and date each page\n- Include ambient temperature\n- Record test instrument serial numbers and calibration dates"
        },
        {
          id: "t2",
          question: "What does a failed insulation resistance test mean and what should I do?",
          difficulty: "Intermediate",
          votes: 98,
          answer: "A failed IR test indicates potential insulation breakdown. Here's what to do:\n\n**Immediate Actions:**\n1. **Do NOT energise** the circuit\n2. Disconnect all equipment and accessories\n3. Re-test with everything disconnected\n4. If still failing, investigate cable route\n\n**Common Causes:**\n- Moisture ingress (check outdoor connections)\n- Physical damage to cables\n- Overheating causing insulation deterioration\n- Neutral-earth faults in equipment\n- Incorrect connections at accessories\n\n**Investigation Process:**\n1. Test each conductor individually to earth\n2. Test between line and neutral\n3. Check at distribution board end\n4. Use 'soak testing' - apply test voltage for 1 minute\n5. Check junction boxes and accessories\n\n**Minimum Values:**\n- Circuits ≤50V: 0.5MΩ\n- Circuits >50V: 1MΩ\n- SELV/PELV: 0.25MΩ\n\n**Documentation:**\n- Record fault description\n- Note remedial action taken\n- Re-test after repairs\n- Get supervisor to verify repairs before energising"
        },
        {
          id: "t3",
          question: "When should I use an RCD tester versus the test button?",
          difficulty: "Beginner",
          votes: 156,
          answer: "Understanding when to use each testing method is crucial:\n\n**RCD Test Button:**\n- **When**: Monthly user checks, quick operational verification\n- **What it does**: Tests mechanical operation only\n- **Limitations**: Doesn't verify trip time or sensitivity\n- **Procedure**: Press and hold, RCD should trip immediately\n\n**RCD Tester (Electronic):**\n- **When**: Initial verification, periodic testing, fault finding\n- **Required for**: BS 7671 compliance testing\n- **Tests performed**:\n  - x½ rated current (should NOT trip within 2 seconds)\n  - x1 rated current (must trip within 300ms for 30mA)\n  - x5 rated current (must trip within 40ms)\n  - Contact voltage test\n\n**Testing Sequence:**\n1. Verify RCD rating (30mA, 100mA, etc.)\n2. Connect tester between line and earth\n3. Test at x½ - should not trip\n4. Test at x1 - record trip time\n5. Test at x5 - record trip time\n6. Test 180° phase angle if required\n7. Press test button to verify mechanical operation\n8. Reset RCD\n\n**Record Results:**\n- Trip times in milliseconds\n- Test currents used\n- Any anomalies or failures\n- Tester calibration details"
        }
      ]
    },
    {
      category: "Safety & Procedures",
      icon: AlertCircle,
      color: "bg-red-500/20 text-red-400 border-red-500/30",
      questions: [
        {
          id: "s1",
          question: "What's the correct procedure for safe isolation?",
          difficulty: "Essential",
          votes: 203,
          answer: "Safe isolation is the most critical safety procedure. Follow these steps religiously:\n\n**PROVE, DEAD, PROVE Method:**\n\n**1. PROVE (test your tester)**\n- Test voltage indicator on known live source\n- Verify it's working correctly\n- Check test leads for damage\n\n**2. ISOLATE**\n- Identify correct isolation point\n- Switch off and lock off (LOTO)\n- Remove fuses or switch off MCB\n- Apply safety lock and warning notice\n\n**3. DEAD (test the circuit)**\n- Test between all conductors\n- Test each conductor to earth\n- Test at multiple points if long cable runs\n- Confirm zero volts throughout\n\n**4. PROVE (test your tester again)**\n- Re-test on known live source\n- Ensures tester hasn't failed during testing\n\n**Additional Safety Measures:**\n- Use appropriate PPE\n- Barrier off work area\n- Inform all site personnel\n- Use 'Permit to Work' system if required\n- Keep isolation key with you\n- Never work alone on live equipment\n\n**Warning Signs:**\n- 'DANGER - MEN WORKING'\n- 'DO NOT SWITCH ON'\n- Include your name and contact details\n- Note date and time of isolation"
        },
        {
          id: "s2",
          question: "How do I report a near miss or safety concern?",
          difficulty: "Essential",
          votes: 187,
          answer: "Reporting safety issues protects everyone on site. Here's the proper procedure:\n\n**Immediate Action:**\n1. **Stop work** if there's immediate danger\n2. **Secure the area** - barrier off if needed\n3. **Inform supervisor immediately** - call don't text\n4. **Take photos** if safe to do so\n\n**Formal Reporting Process:**\n1. **Complete incident report form** within 24 hours\n2. **Include all details**:\n   - Exact location and time\n   - What happened or could have happened\n   - People involved or at risk\n   - Immediate actions taken\n   - Suggested improvements\n\n**Near Miss Examples:**\n- Scaffold collapse or instability\n- Electrical equipment faults\n- Unsafe working practices observed\n- Equipment failures\n- Environmental hazards (flooding, structural damage)\n\n**Who to Report To:**\n- Immediate supervisor (first contact)\n- Site safety officer\n- Site manager for serious incidents\n- HSE if RIDDOR reportable\n\n**Follow-up Actions:**\n- Attend investigation meetings\n- Provide additional information if requested\n- Learn from incident analysis\n- Implement recommended changes\n\n**Remember**: Reporting near misses prevents actual accidents. You won't get in trouble for genuine safety concerns."
        }
      ]
    },
    {
      category: "Career & Development",
      icon: Star,
      color: "bg-green-500/20 text-green-400 border-green-500/30",
      questions: [
        {
          id: "c1",
          question: "How do I progress from apprentice to qualified electrician?",
          difficulty: "Career",
          votes: 245,
          answer: "Career progression requires dedication and meeting specific milestones:\n\n**Apprenticeship Requirements:**\n- Complete minimum 4 years training (Level 3)\n- Achieve 8,000+ hours on-the-job training\n- Pass all college assessments and end-point assessment\n- Maintain portfolio of evidence\n- Develop practical competencies\n\n**Qualification Pathway:**\n1. **Level 3 Diploma** - Core qualification\n2. **AM2 Assessment** - Practical competency test\n3. **18th Edition** - Wiring regulations knowledge\n4. **2391 Inspection & Testing** - Advanced testing qualification\n\n**JIB Grading:**\n- **Apprentice**: During training period\n- **Improved Apprentice**: After Level 2\n- **Electrician**: After Level 3 + AM2\n- **Approved Electrician**: With additional experience\n- **Technician**: With HNC/HND\n\n**Key Development Areas:**\n- Technical competency\n- Problem-solving skills\n- Customer service\n- Health & safety knowledge\n- Industry regulation updates\n- Specialist areas (solar, EV charging, smart homes)\n\n**Timeline:**\n- Years 1-2: Foundation skills, basic installation\n- Years 3-4: Advanced techniques, testing procedures\n- Post-qualification: Specialist training, management skills\n\n**Continuing Professional Development:**\n- Regular update courses\n- Manufacturer training\n- New technology familiarisation\n- Health & safety refreshers"
        }
      ]
    }
  ];

  const popularQuestions = [
    {
      question: "How do I calculate cable sizes correctly?",
      category: "Technical",
      views: 1250,
      recent: true
    },
    {
      question: "What PPE is required for different electrical work?",
      category: "Safety",
      views: 980,
      recent: false
    },
    {
      question: "How to read electrical drawings and schematics?",
      category: "Technical",
      views: 850,
      recent: true
    },
    {
      question: "When can I work unsupervised?",
      category: "Career",
      views: 720,
      recent: false
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Essential": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "Intermediate": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Beginner": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Career": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const filteredCategories = questionCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Supervisor Knowledge Bank</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Comprehensive collection of real-world questions and expert answers from experienced supervisors, 
            qualified electricians, and industry professionals. Search through hundreds of practical scenarios.
          </p>
          
          <div className="flex items-center gap-2 mb-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search questions and answers..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-background/50"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow mb-1">250+</div>
              <div className="text-sm text-muted-foreground">Questions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow mb-1">45</div>
              <div className="text-sm text-muted-foreground">Expert Contributors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow mb-1">98%</div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow mb-1">24hr</div>
              <div className="text-sm text-muted-foreground">Response Time</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {filteredCategories.map((category, index) => (
              <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-elec-yellow/10">
                      <category.icon className="h-5 w-5 text-elec-yellow" />
                    </div>
                    <CardTitle className="text-white">{category.category}</CardTitle>
                    <Badge className={category.color} variant="outline">
                      {category.questions.length} Questions
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="space-y-2">
                    {category.questions.map((q) => (
                      <AccordionItem key={q.id} value={q.id} className="border border-elec-yellow/20 rounded-lg">
                        <AccordionTrigger className="px-4 hover:no-underline">
                          <div className="flex items-center justify-between w-full">
                            <span className="text-left text-sm font-medium">{q.question}</span>
                            <div className="flex items-center gap-2 ml-4">
                              <Badge className={getDifficultyColor(q.difficulty)} variant="outline">
                                {q.difficulty}
                              </Badge>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Star className="h-3 w-3" />
                                {q.votes}
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <div className="bg-elec-dark/40 rounded-lg p-4 mt-2">
                            <pre className="whitespace-pre-wrap text-sm text-muted-foreground font-sans">
                              {q.answer}
                            </pre>
                          </div>
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-elec-yellow/20">
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                Expert Verified
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Updated Recently
                              </span>
                            </div>
                            <Button size="sm" variant="outline" className="h-7 text-xs">
                              Helpful?
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Card className="border-blue-500/20 bg-blue-500/10">
            <CardHeader>
              <CardTitle className="text-blue-300 flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Popular This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {popularQuestions.map((q, index) => (
                  <div key={index} className="border border-blue-500/30 rounded-lg p-3">
                    <h4 className="font-medium text-white text-sm mb-2">{q.question}</h4>
                    <div className="flex items-center justify-between text-xs">
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30" variant="outline">
                        {q.category}
                      </Badge>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <span>{q.views} views</span>
                        {q.recent && <Badge className="bg-green-500/20 text-green-400 border-green-500/30" variant="outline">New</Badge>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-500/20 bg-green-500/10">
            <CardHeader>
              <CardTitle className="text-green-300 flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Ask Your Question
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-300 mb-4">
                Can't find what you're looking for? Submit your question to our panel of verified supervisors.
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Submit New Question
              </Button>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Average response time: 24 hours
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-500/20 bg-orange-500/10">
            <CardHeader>
              <CardTitle className="text-orange-300 flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Quick Reference
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-orange-300">Emergency Contact:</span>
                  <span className="text-muted-foreground">999</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-300">HSE Hotline:</span>
                  <span className="text-muted-foreground">0300 003 1647</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-300">BS 7671:</span>
                  <span className="text-muted-foreground">18th Edition</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-300">Standard Voltage:</span>
                  <span className="text-muted-foreground">230V ±10%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuestionsTab;
