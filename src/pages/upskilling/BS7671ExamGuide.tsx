import { ArrowLeft, BookOpen, Clock, Target, CheckCircle, AlertTriangle, Lightbulb, FileText, Calculator, Eye, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';

const BS7671ExamGuide = () => {
  const keyTopics = [
    {
      topic: "Earthing Systems",
      weight: "20-25%",
      details: "TN-S, TN-C-S, TT systems. Know the differences, applications, and Zs values for each system."
    },
    {
      topic: "Protection Devices",
      weight: "15-20%",
      details: "RCDs, MCBs, AFDDs, SPDs. Understand selection criteria, ratings, and installation requirements."
    },
    {
      topic: "Cable Selection & Sizing",
      weight: "15-20%",
      details: "Current carrying capacity, grouping factors, ambient temperature corrections, and voltage drop calculations."
    },
    {
      topic: "Testing & Inspection",
      weight: "15-20%",
      details: "Test sequences, acceptable values, and certification requirements including EIC and EICR."
    },
    {
      topic: "Special Locations",
      weight: "10-15%",
      details: "Bathrooms (701), Swimming pools (702), Agricultural premises (705), and EV charging (722)."
    },
    {
      topic: "Amendment 2 Changes",
      weight: "10-15%",
      details: "New AFDD requirements, prosumer installations, and updated definitions."
    }
  ];

  const studyStrategies = [
    {
      title: "Master Book Navigation",
      icon: BookOpen,
      tips: [
        "Practice finding regulations quickly using the index and contents page",
        "Learn the structure: Parts 1-8, then Appendices - know what's where",
        "Use sticky tabs to mark frequently referenced sections (Appendix 3, 4, etc.)",
        "Time yourself finding specific regulations - aim for under 30 seconds"
      ]
    },
    {
      title: "Cross-Reference Skills",
      icon: Target,
      tips: [
        "Practice following regulation cross-references quickly",
        "Learn to navigate between related regulations (e.g., 411.3.2 to Appendix 3)",
        "Understand how tables in appendices link to main regulations",
        "Practice moving between IET guides and BS 7671 efficiently"
      ]
    },
    {
      title: "Table Reading Speed",
      icon: FileText,
      tips: [
        "Practice reading current carrying capacity tables with correction factors",
        "Learn to quickly identify the right column/row in complex tables",
        "Understand table footnotes and when they apply",
        "Practice interpolation for values not directly listed"
      ]
    },
    {
      title: "Question Analysis",
      icon: Eye,
      tips: [
        "Learn to identify what type of information the question needs",
        "Practice determining which book/section to look in first",
        "Recognise keywords that point to specific regulations or appendices",
        "Understand when calculations are needed vs. direct table lookups"
      ]
    }
  ];

  const examTechniques = [
    {
      technique: "Rapid Book Navigation",
      description: "Use the index first, then contents page. Keep finger bookmarks on frequently used sections during the exam."
    },
    {
      technique: "Strategic Time Allocation",
      description: "Spend 30 seconds reading, 60 seconds finding info, 30 seconds answering. If you can't find it quickly, move on and return later."
    },
    {
      technique: "Cross-Reference Following",
      description: "When a regulation references another (e.g., 'see 543.1'), follow it immediately - don't assume you know the answer."
    },
    {
      technique: "Table Reading Method",
      description: "Use a ruler or finger to trace rows/columns in complex tables. Check footnotes before finalising answers."
    },
    {
      technique: "Question Keywords",
      description: "Circle keywords like 'maximum', 'minimum', 'appropriate' - they guide you to specific values or regulations."
    }
  ];

  const commonMistakes = [
    "Spending too long searching for information - aim for 30-60 seconds max per lookup",
    "Not using the index - it's often faster than browsing through sections",
    "Ignoring cross-references when regulations say 'see also' or 'refer to'",
    "Not checking table footnotes which often contain crucial conditions",
    "Assuming you know the answer without checking - always verify in the book",
    "Poor time management - getting stuck on difficult questions early in the exam"
  ];

  const lastWeekPrep = [
    {
      day: "7 Days Before",
      tasks: ["Complete final mock exam", "Review weak areas identified", "Organise study materials"]
    },
    {
      day: "5 Days Before",
      tasks: ["Focus on calculations practice", "Review Amendment 2 changes", "Test regulation navigation speed"]
    },
    {
      day: "3 Days Before",
      tasks: ["Light revision only", "Review key regulation numbers", "Practice relaxation techniques"]
    },
    {
      day: "1 Day Before",
      tasks: ["No intensive studying", "Prepare exam materials", "Get good night's sleep"]
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Link to="bs7671-module-9">
            <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Module 9
            </Button>
          </Link>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-white mb-4">
              BS 7671 Exam Success Guide
            </h1>
            <p className="text-xl text-white mb-6">
              Master the open book format with navigation skills and strategic approaches
            </p>
            <Alert className="border-yellow-400/30 bg-yellow-400/10 mb-6">
              <BookOpen className="h-4 w-4 text-yellow-400" />
              <AlertDescription className="text-white">
                <strong>Open Book Exam:</strong> You can use BS 7671, IET Guidance Notes, and the On-Site Guide during the exam. Success depends on navigation speed and knowing where to find information quickly.
              </AlertDescription>
            </Alert>
          </div>

          {/* Key Topics Breakdown */}
          <Card className="bg-card border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-3">
                <Target className="h-6 w-6 text-yellow-400" />
                Exam Content Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {keyTopics.map((topic, index) => (
                <div key={index} className="border-l-4 border-yellow-400 pl-4 py-2">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-semibold text-white">{topic.topic}</h4>
                    <Badge variant="secondary" className="bg-yellow-400/10 text-yellow-400">
                      {topic.weight}
                    </Badge>
                  </div>
                  <p className="text-white text-sm">{topic.details}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Reference Regulations */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-3">
                <FileText className="h-6 w-6 text-yellow-400" />
                Quick Reference Regulation Numbers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-yellow-400 mb-3">Protection & Safety</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="text-white"><span className="text-white font-mono">411.3.2</span> - Maximum Zs values</li>
                    <li className="text-white"><span className="text-white font-mono">411.4.5</span> - RCD requirements</li>
                    <li className="text-white"><span className="text-white font-mono">415.1</span> - Fault protection</li>
                    <li className="text-white"><span className="text-white font-mono">543.1</span> - Protective conductor sizing</li>
                    <li className="text-white"><span className="text-white font-mono">531.2</span> - Device selection</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-yellow-400 mb-3">Cables & Circuits</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="text-white"><span className="text-white font-mono">433.1</span> - Overload protection</li>
                    <li className="text-white"><span className="text-white font-mono">525.1</span> - Cable voltage drop</li>
                    <li className="text-white"><span className="text-white font-mono">522.6</span> - Current carrying capacity</li>
                    <li className="text-white"><span className="text-white font-mono">433.2</span> - Ring final circuits</li>
                    <li className="text-white"><span className="text-white font-mono">314.1</span> - Circuit division</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-yellow-400 mb-3">Testing & Inspection</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="text-white"><span className="text-white font-mono">612.1</span> - Test sequence</li>
                    <li className="text-white"><span className="text-white font-mono">612.3</span> - Insulation resistance</li>
                    <li className="text-white"><span className="text-white font-mono">612.9</span> - RCD testing</li>
                    <li className="text-white"><span className="text-white font-mono">643.3</span> - Initial verification</li>
                    <li className="text-white"><span className="text-white font-mono">651.1</span> - Periodic inspection</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Strategic Bookmarking Guide */}
          <Card className="bg-card border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-yellow-400" />
                Strategic Bookmarking Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Alert className="border-yellow-400/30 bg-yellow-400/10">
                  <BookOpen className="h-4 w-4 text-yellow-400" />
                  <AlertDescription className="text-white">
                    Use different coloured tabs for different types of information. Suggested system: <span className="text-yellow-400">Yellow</span> for tables, <span className="text-yellow-400">Blue</span> for calculations, <span className="text-green-400">Green</span> for testing, <span className="text-red-400">Red</span> for special locations.
                  </AlertDescription>
                </Alert>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-yellow-400 mb-3">Essential Page Tabs</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="text-gray-400 flex justify-between">
                        <span>Contents Page</span>
                        <span className="text-white font-bold">Page v</span>
                      </li>
                      <li className="text-gray-400 flex justify-between">
                        <span>Index</span>
                        <span className="text-white font-bold">Page 199+</span>
                      </li>
                      <li className="text-gray-400 flex justify-between">
                        <span>Appendix 3 (Time/current)</span>
                        <span className="text-white font-bold">Page 153</span>
                      </li>
                      <li className="text-gray-400 flex justify-between">
                        <span>Appendix 4 (Current capacity)</span>
                        <span className="text-white font-bold">Page 157</span>
                      </li>
                      <li className="text-gray-400 flex justify-between">
                        <span>Appendix 5 (External influences)</span>
                        <span className="text-white font-bold">Page 175</span>
                      </li>
                      <li className="text-gray-400 flex justify-between">
                        <span>Appendix 15 (Ring circuits)</span>
                        <span className="text-white font-bold">Page 197</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-yellow-400 mb-3">Key Regulation Sections</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="text-gray-400 flex justify-between">
                        <span>Part 4 (Protection)</span>
                        <span className="text-white font-bold">Page 49</span>
                      </li>
                      <li className="text-gray-400 flex justify-between">
                        <span>Chapter 41 (Protection against shock)</span>
                        <span className="text-white font-bold">Page 51</span>
                      </li>
                      <li className="text-gray-400 flex justify-between">
                        <span>Chapter 43 (Overcurrent protection)</span>
                        <span className="text-white font-bold">Page 67</span>
                      </li>
                      <li className="text-gray-400 flex justify-between">
                        <span>Chapter 52 (Cable selection)</span>
                        <span className="text-white font-bold">Page 89</span>
                      </li>
                      <li className="text-gray-400 flex justify-between">
                        <span>Chapter 54 (Protective conductors)</span>
                        <span className="text-white font-bold">Page 105</span>
                      </li>
                      <li className="text-gray-400 flex justify-between">
                        <span>Part 7 (Special locations)</span>
                        <span className="text-white font-bold">Page 137</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-card/50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-yellow-400 mb-2">Pro Tip: Finger Bookmarks</h4>
                  <p className="text-gray-400 text-sm">
                    During the exam, keep your finger in the index page and use your other hand to navigate. 
                    This saves precious seconds when you need to look up multiple regulations quickly.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Study Strategies */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <Lightbulb className="h-8 w-8 text-yellow-400" />
              Proven Study Strategies
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {studyStrategies.map((strategy, index) => (
                <Card key={index} className="bg-card border-transparent">
                  <CardHeader>
                    <CardTitle className="text-lg text-white flex items-center gap-3">
                      <strategy.icon className="h-5 w-5 text-yellow-400" />
                      {strategy.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {strategy.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="text-gray-400 text-sm flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Exam Techniques */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-3">
                <Clock className="h-6 w-6 text-yellow-400" />
                Exam Day Techniques
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {examTechniques.map((technique, index) => (
                <div key={index} className="bg-card/50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-yellow-400 mb-2">{technique.technique}</h4>
                  <p className="text-gray-400 text-sm">{technique.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Common Mistakes */}
          <Alert className="border-red-500/20 bg-card">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-white">
              <h3 className="text-lg font-semibold mb-3">Common Exam Mistakes to Avoid</h3>
              <ul className="space-y-2">
                {commonMistakes.map((mistake, index) => (
                  <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                    <span className="text-red-400 font-bold">×</span>
                    {mistake}
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>

          {/* Last Week Preparation */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-3">
                <Calendar className="h-6 w-6 text-yellow-400" />
                Final Week Countdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {lastWeekPrep.map((day, index) => (
                <div key={index} className="flex gap-4">
                  <Badge variant="outline" className="border-yellow-400 text-yellow-400 min-w-[100px] justify-center">
                    {day.day}
                  </Badge>
                  <div className="flex-1">
                    <ul className="space-y-1">
                      {day.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="text-gray-400 text-sm flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-yellow-400" />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Essential Resources */}
          <Card className="bg-card border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-yellow-400" />
                Essential Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-lg font-semibold text-yellow-400 mb-2">Must-Have References</h4>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>• BS 7671:2018+A2:2022 (The Wiring Regulations)</li>
                    <li>• IET Guidance Note 3: Inspection & Testing</li>
                    <li>• IET On-Site Guide</li>
                    <li>• IET Electrical Installation Work Level 3</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-yellow-400 mb-2">Key Appendices to Master</h4>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>• Appendix 3: Time/current characteristics</li>
                    <li>• Appendix 4: Current-carrying capacity tables</li>
                    <li>• Appendix 5: Classification of external influences</li>
                    <li>• Appendix 15: Ring final circuit testing</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Success Metrics */}
          <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-400/10 p-6 rounded-lg border border-yellow-400/30">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">Your Path to Success</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">&lt;30s</div>
                <p className="text-gray-400">Average time to find any regulation using index</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">2min</div>
                <p className="text-gray-400">Maximum time per question including lookup and answering</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">100%</div>
                <p className="text-gray-400">Questions verified against the books - never guess</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BS7671ExamGuide;