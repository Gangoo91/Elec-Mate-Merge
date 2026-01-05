import { ArrowLeft, ArrowRight, FileText, AlertTriangle, CheckCircle, BookOpen, FolderOpen, Map, Search, Bookmark, Lightbulb, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import BS7671EmbeddedQuiz from '@/components/upskilling/BS7671EmbeddedQuiz';

const BS7671Module1Section3 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "How many main Parts are in BS 7671?",
      options: [
        "4",
        "6", 
        "8",
        "10"
      ],
      correct: 2,
      explanation: "BS 7671 has 8 main Parts, from Part 1 (Scope and Fundamental Principles) through Part 8 (Prosumer Electrical Installations)."
    },
    {
      id: 2,
      question: "Which Part covers inspection and testing?",
      options: [
        "Part 1",
        "Part 6",
        "Part 5",
        "Part 3"
      ],
      correct: 1,
      explanation: "Part 6 covers inspection and testing procedures, including both initial verification and periodic inspection."
    },
    {
      id: 3,
      question: "Which section would cover marinas?",
      options: [
        "701",
        "710",
        "708", 
        "721"
      ],
      correct: 2,
      explanation: "Section 708 covers marinas and similar locations. Section 701 is bathrooms, 710 is medical locations, 721 is agricultural premises."
    },
    {
      id: 4,
      question: "Where are formulas and reference tables found in BS 7671?",
      options: [
        "Part 8",
        "Introduction",
        "Appendices",
        "Index"
      ],
      correct: 2,
      explanation: "Appendices contain formulas, reference tables, charts, and other supporting information referenced throughout the regulations."
    },
    {
      id: 5,
      question: "What's the best tool for navigating BS 7671 efficiently?",
      options: [
        "Reading it end to end",
        "Using index, tabs, and bookmarks",
        "Watching YouTube videos",
        "Asking a supervisor"
      ],
      correct: 1,
      explanation: "Efficient navigation uses the index, bookmarks, and tabbing system to quickly locate relevant regulations and information."
    }
  ];


  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div>
        <Link to="../bs7671-module-1">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 1
          </Button>
        </Link>
        
        <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <FileText className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  Structure of BS 7671
                </h1>
                <p className="text-lg sm:text-xl text-white">
                  Understanding Parts, Chapters, Sections, and Appendices
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 1.3
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                30 minutes
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base leading-relaxed">
                BS 7671 is structured for function — but many electricians find it hard to navigate. This section demystifies its layout so you can quickly find what you need, when you need it, whether during design work, on-site problem solving, or in assessments.
              </p>
              <Alert className="bg-yellow-400/10 border-blue-600/30">
                <Map className="h-4 w-4" />
                <AlertDescription className="text-white">
                  <strong>Professional Advantage:</strong> Efficient navigation of BS 7671 can save hours during design, installation, and inspection work.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-yellow-400" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>By the end of this section, you should be able to:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Understand the overall structure of BS 7671
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Learn what's in each Part and Chapter
                  </li>
                </ul>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Recognise the role of Appendices and their content
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Develop confidence navigating efficiently during work and assessments
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Structure Overview */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FolderOpen className="h-6 w-6 text-yellow-400" />
                Structure Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p className="text-base leading-relaxed">
                BS 7671 follows a logical hierarchy designed to take you from fundamental principles through to specific application requirements.
              </p>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-white font-semibold mb-4">Hierarchical Structure</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mt-1 flex-shrink-0"></div>
                    <div>
                      <span className="text-white font-semibold">Parts 1–8:</span>
                      <span className="text-white ml-2">Core requirements, definitions, design, selection, safety, inspection, special locations</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <div>
                      <span className="text-white font-semibold">Chapters:</span>
                      <span className="text-white ml-2">Within Parts, they narrow down specific principles (e.g., overcurrent protection, RCD use)</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <div>
                      <span className="text-white font-semibold">Sections:</span>
                      <span className="text-white ml-2">Drill further into specific application detail and requirements</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <div>
                      <span className="text-white font-semibold">Appendices:</span>
                      <span className="text-white ml-2">Contain formulas, charts, tables, and reference material</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-yellow-400/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Numbering System</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Parts: 1, 2, 3, 4, 5, 6, 7, 8</li>
                    <li>• Chapters: 11, 12, 13... within each Part</li>
                    <li>• Sections: 110, 120, 130... within Chapters</li>
                    <li>• Regulations: 110.1, 110.2... within Sections</li>
                  </ul>
                </div>
                
                <div className="bg-green-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Reference Format</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Full reference: 411.3.3</li>
                    <li>• Part 4, Chapter 41, Section 411.3, Reg 3</li>
                    <li>• Quick reference: Reg 411.3.3</li>
                    <li>• Cross-references throughout</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Part Breakdown */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <List className="h-6 w-6 text-yellow-400" />
                Detailed Part Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="space-y-6">
                
                {/* Part 1 */}
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-lg">Part 1 - Scope, Object and Fundamental Principles</h4>
                      <p className="text-sm mt-1 mb-3">Foundation principles and scope definition</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <p className="text-white font-semibold text-sm">Chapters:</p>
                          <ul className="text-xs space-y-1">
                            <li>• 11: Scope</li>
                            <li>• 12: Object and effects</li>
                            <li>• 13: Fundamental principles</li>
                            <li>• 14: Assessment of characteristics</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">Key Content:</p>
                          <ul className="text-xs space-y-1">
                            <li>• Application boundaries</li>
                            <li>• Safety objectives</li>
                            <li>• Design principles</li>
                            <li>• Load assessment</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Part 2 */}
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-lg">Part 2 - Definitions</h4>
                      <p className="text-sm mt-1 mb-3">Terminology and technical definitions</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <p className="text-white font-semibold text-sm">Content:</p>
                          <ul className="text-xs space-y-1">
                            <li>• Technical terminology</li>
                            <li>• System definitions</li>
                            <li>• Component definitions</li>
                            <li>• Test definitions</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">Usage:</p>
                          <ul className="text-xs space-y-1">
                            <li>• Reference for unclear terms</li>
                            <li>• Understanding requirements</li>
                            <li>• Exam preparation</li>
                            <li>• Technical communication</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Part 3 */}
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-lg">Part 3 - Assessment of General Characteristics</h4>
                      <p className="text-sm mt-1 mb-3">Installation assessment and planning requirements</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <p className="text-white font-semibold text-sm">Chapters:</p>
                          <ul className="text-xs space-y-1">
                            <li>• 31: Purpose, supplies and structure</li>
                            <li>• 32: External influences</li>
                            <li>• 33: Compatibility</li>
                            <li>• 34: Maintainability</li>
                            <li>• 35: Safety services</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">Applications:</p>
                          <ul className="text-xs space-y-1">
                            <li>• Design planning</li>
                            <li>• Environmental assessment</li>
                            <li>• System compatibility</li>
                            <li>• Maintenance planning</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Part 4 */}
                <div className="bg-card p-4 rounded-lg border border-red-600">
                  <div className="flex items-start gap-3">
                    <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-lg">Part 4 - Protection for Safety (Critical)</h4>
                      <p className="text-sm mt-1 mb-3">The heart of electrical safety requirements</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <p className="text-white font-semibold text-sm">Chapters:</p>
                          <ul className="text-xs space-y-1">
                            <li>• 41: Protection against electric shock</li>
                            <li>• 42: Protection against thermal effects</li>
                            <li>• 43: Protection against overcurrent</li>
                            <li>• 44: Protection against voltage disturbances</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">Key Requirements:</p>
                          <ul className="text-xs space-y-1">
                            <li>• Basic and fault protection</li>
                            <li>• Fire protection</li>
                            <li>• Overcurrent devices</li>
                            <li>• Surge protection</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Part 5 */}
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">5</div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-lg">Part 5 - Selection and Erection of Equipment</h4>
                      <p className="text-sm mt-1 mb-3">Practical installation requirements and methods</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <p className="text-white font-semibold text-sm">Chapters:</p>
                          <ul className="text-xs space-y-1">
                            <li>• 51: Common rules</li>
                            <li>• 52: Wiring systems</li>
                            <li>• 53: Protection, isolation, switching</li>
                            <li>• 54: Earthing and protective conductors</li>
                            <li>• 55: Other equipment</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">Practical Focus:</p>
                          <ul className="text-xs space-y-1">
                            <li>• Installation methods</li>
                            <li>• Equipment selection</li>
                            <li>• Cable routing</li>
                            <li>• Earthing systems</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Part 6 */}
                <div className="bg-card p-4 rounded-lg border border-blue-600">
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">6</div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-lg">Part 6 - Inspection and Testing (Essential)</h4>
                      <p className="text-sm mt-1 mb-3">Verification and certification procedures</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <p className="text-white font-semibold text-sm">Chapters:</p>
                          <ul className="text-xs space-y-1">
                            <li>• 61: Initial verification</li>
                            <li>• 62: Periodic inspection</li>
                            <li>• 63: Certification and reporting</li>
                            <li>• 64: Verification requirements</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">Test Procedures:</p>
                          <ul className="text-xs space-y-1">
                            <li>• Test sequences</li>
                            <li>• Measurement procedures</li>
                            <li>• Documentation requirements</li>
                            <li>• Periodic intervals</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Part 7 */}
                <div className="bg-card p-4 rounded-lg border border-orange-600">
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">7</div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-lg">Part 7 - Special Installations or Locations</h4>
                      <p className="text-sm mt-1 mb-3">Requirements for challenging environments</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <p className="text-white font-semibold text-sm">Key Sections:</p>
                          <ul className="text-xs space-y-1">
                            <li>• 701: Bathrooms</li>
                            <li>• 704: Construction sites</li>
                            <li>• 708: Marinas</li>
                            <li>• 710: Medical locations</li>
                            <li>• 721: Agricultural premises</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">Special Requirements:</p>
                          <ul className="text-xs space-y-1">
                            <li>• Additional protection</li>
                            <li>• Specific IP ratings</li>
                            <li>• Enhanced earthing</li>
                            <li>• Special equipment</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Part 8 */}
                <div className="bg-card p-4 rounded-lg border border-green-600">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">8</div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-lg">Part 8 - Prosumer Electrical Installations (New)</h4>
                      <p className="text-sm mt-1 mb-3">Modern energy systems and smart installations</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <p className="text-white font-semibold text-sm">Chapters:</p>
                          <ul className="text-xs space-y-1">
                            <li>• 82: Design and energy management</li>
                            <li>• EV charging infrastructure</li>
                            <li>• Energy storage systems</li>
                            <li>• Microgeneration integration</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">Modern Focus:</p>
                          <ul className="text-xs space-y-1">
                            <li>• Smart grid compatibility</li>
                            <li>• Renewable integration</li>
                            <li>• Energy management</li>
                            <li>• Future technologies</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appendices */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-6 w-6 text-yellow-400" />
                Appendices - Your Reference Toolkit
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p className="text-base leading-relaxed">
                The appendices contain essential reference material that supports the main regulations. These are your go-to resources for calculations, tables, and technical data.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3">Appendix 1 - British Standards</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Referenced British and European standards</li>
                    <li>• Product standards and test methods</li>
                    <li>• Compliance requirements</li>
                    <li>• Quality assurance standards</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3">Appendix 2 - Statutory Regulations</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Legal framework references</li>
                    <li>• Building Regulations</li>
                    <li>• Health and Safety regulations</li>
                    <li>• Environmental regulations</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg border border-blue-600">
                  <h4 className="text-yellow-400 font-semibold mb-3">Appendix 3 - Time/Current Characteristics</h4>
                  <ul className="text-sm space-y-1">
                    <li>• MCB and fuse characteristics</li>
                    <li>• Discrimination curves</li>
                    <li>• Let-through energy charts</li>
                    <li>• Operating time graphs</li>
                  </ul>
                  <p className="text-xs mt-2 italic text-blue-300">Most commonly used appendix</p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3">Appendix 4 - Current-carrying Capacity</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Cable current ratings</li>
                    <li>• Installation method factors</li>
                    <li>• Grouping and thermal factors</li>
                    <li>• Voltage drop calculations</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3">Appendix 5 - Classification of External Influences</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Environmental condition codes</li>
                    <li>• IP rating requirements</li>
                    <li>• Temperature classifications</li>
                    <li>• Chemical and mechanical influences</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3">Appendices 6-15 - Additional References</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Model forms and certificates</li>
                    <li>• Energy efficiency measures</li>
                    <li>• Harmonic distortion data</li>
                    <li>• Special installation guidance</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Tips */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Search className="h-6 w-6 text-yellow-400" />
                Navigation Tips and Techniques
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
                <h4 className="text-white font-semibold mb-3">Professional Navigation Strategy</h4>
                <p className="text-sm">
                  Use the index, bookmarks, and tabbing to move between Parts and Appendices effectively. During exams or on-site problem solving, being quick here is a major advantage.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Essential Tools</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Bookmark className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-white font-semibold text-sm">Index</p>
                        <p className="text-xs">Alphabetical listing of topics with regulation references</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-white font-semibold text-sm">Contents Pages</p>
                        <p className="text-xs">Hierarchical structure overview for each Part</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Search className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-white font-semibold text-sm">Cross-References</p>
                        <p className="text-xs">Links between related regulations throughout the document</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Quick Access Methods</h4>
                  <div className="bg-card p-4 rounded-lg">
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      <li><strong>Tab marking:</strong> Physical tabs for frequently used sections</li>
                      <li><strong>Bookmark system:</strong> Mark key regulation numbers for quick return</li>
                      <li><strong>Appendix shortcuts:</strong> Direct access to calculation tables</li>
                      <li><strong>Contents memorisation:</strong> Learn Part numbers and their focus areas</li>
                      <li><strong>Index confidence:</strong> Practice using the index efficiently</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Exam and Work Efficiency Tips</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Know your Parts:</strong> What each Part covers</li>
                    <li>• <strong>Key regulation numbers:</strong> Memorise frequently referenced regulations</li>
                    <li>• <strong>Appendix familiarity:</strong> Know which appendix contains what information</li>
                  </ul>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Practice navigation:</strong> Time yourself finding specific regulations</li>
                    <li>• <strong>Use headers:</strong> Page headers show current Part and Chapter</li>
                    <li>• <strong>Cross-reference awareness:</strong> Follow links to related requirements</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Scenario */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-orange-500" />
                Real World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                <h4 className="text-white font-semibold mb-3">Swimming Pool Circuit EICR</h4>
                <div className="space-y-3">
                  <p className="text-sm">
                    <strong>Situation:</strong> During an EICR, an engineer must check compliance for a swimming pool circuit. The installation appears non-standard with additional bonding and enhanced RCD protection.
                  </p>
                  
                  <p className="text-sm">
                    <strong>Navigation Strategy:</strong> Knowing Part 7 covers special installations helps them go straight to Section 702 and verify specific safety requirements for swimming pools quickly.
                  </p>
                  
                  <p className="text-sm">
                    <strong>Efficient Process:</strong>
                  </p>
                  <ol className="text-xs list-decimal list-inside space-y-1 ml-4">
                    <li>Check contents - Part 7 for special locations</li>
                    <li>Navigate to Section 702 - Swimming pools</li>
                    <li>Cross-reference to Part 4 for basic protection requirements</li>
                    <li>Use Appendix 3 to verify RCD characteristics</li>
                    <li>Complete assessment and document findings</li>
                  </ol>
                  
                  <p className="text-sm">
                    <strong>Result:</strong> What could have taken 30 minutes of searching is completed in 5 minutes, allowing more time for practical testing and assessment.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                Section Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base leading-relaxed">
                Mastering the layout of BS 7671 is like knowing your toolkit — you'll find what you need faster, make fewer errors, and work smarter. The structure is logical and designed to support your professional work.
              </p>
              
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Key Takeaways</h4>
                <ul className="space-y-2 text-sm">
                  <li>• BS 7671 has 8 Parts, each with specific focus areas and practical applications</li>
                  <li>• Parts 4, 6, and 7 are most frequently referenced in day-to-day work</li>
                  <li>• Appendices contain essential reference data - learn what's in each one</li>
                  <li>• Efficient navigation is a professional skill that saves time and improves accuracy</li>
                  <li>• Practice makes perfect - familiarity with the structure is invaluable</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Knowledge Check Quiz
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <BS7671EmbeddedQuiz 
                questions={quizQuestions}
                description="Test your understanding of BS 7671 structure and navigation."
              />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
            <Link to="../bs7671-module-1-section-2" className="w-full sm:w-auto">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card w-full sm:w-auto">
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Previous Section</span>
                <span className="sm:hidden">Previous</span>
              </Button>
            </Link>
            <Link to="../bs7671-module-1-section-4" className="w-full sm:w-auto">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600 w-full sm:w-auto">
                <span className="hidden sm:inline">Next Section: Amendment 2 Highlights</span>
                <span className="sm:hidden">Next: Amendment 2</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BS7671Module1Section3;