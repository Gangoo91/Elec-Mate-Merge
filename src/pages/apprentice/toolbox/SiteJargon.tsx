
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, MessageCircle, Search, Volume2, Star, PlayCircle, Trophy, BookOpen, Zap, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const SiteJargon = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favoriteTerms, setFavoriteTerms] = useState<string[]>([]);
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);

  const jargonData = {
    electrical: [
      { 
        term: "Sparky", 
        definition: "Electrician",
        pronunciation: "SPAR-kee",
        etymology: "Derived from electrical sparks",
        frequency: "very-common",
        regional: "UK-wide",
        examples: ["The sparky's coming to fit the new sockets", "Ask the sparky about the wiring"],
        dosDonts: {
          dos: ["Use when addressing electricians informally", "Common on most UK sites"],
          donts: ["Don't use in formal documentation", "Avoid in client-facing communications"]
        }
      },
      { 
        term: "Tails", 
        definition: "Main incoming electrical cables from the supply",
        pronunciation: "taylz",
        etymology: "Named for their appearance - like cable 'tails' entering the property",
        frequency: "common",
        regional: "UK-wide",
        examples: ["The DNO needs to connect the tails", "Check the tails are properly terminated"],
        dosDonts: {
          dos: ["Use when referring to supply cables", "Standard industry term"],
          donts: ["Don't confuse with other cable types", "Not the same as submains"]
        }
      },
      { 
        term: "CU", 
        definition: "Consumer Unit (main electrical panel)",
        pronunciation: "see-YOO",
        etymology: "Abbreviation of Consumer Unit",
        frequency: "very-common",
        regional: "UK-wide",
        examples: ["The CU needs upgrading", "Install a new CU to 18th Edition standards"],
        dosDonts: {
          dos: ["Standard abbreviation in UK", "Use in technical documentation"],
          donts: ["Don't confuse with distribution board (DB)", "Not called 'breaker panel' in UK"]
        }
      },
      { 
        term: "DB", 
        definition: "Distribution Board",
        pronunciation: "dee-BEE",
        etymology: "Abbreviation of Distribution Board",
        frequency: "common",
        regional: "UK-wide",
        examples: ["Install a new DB for the extension", "The DB is located in the plant room"],
        dosDonts: {
          dos: ["Use for sub-distribution panels", "Common in commercial work"],
          donts: ["Don't use for main consumer units", "Not the same as a CU"]
        }
      },
      { 
        term: "MCB", 
        definition: "Miniature Circuit Breaker",
        pronunciation: "em-see-BEE",
        etymology: "Technical abbreviation",
        frequency: "very-common",
        regional: "UK-wide",
        examples: ["Fit a 32A MCB for the cooker circuit", "The MCB has tripped"],
        dosDonts: {
          dos: ["Standard term for circuit breakers", "Use in all documentation"],
          donts: ["Don't call them 'breakers' only", "Not the same as RCBOs"]
        }
      },
      { 
        term: "RCBO", 
        definition: "Residual Current Breaker with Overcurrent protection",
        pronunciation: "ar-see-bee-OH",
        etymology: "Technical abbreviation combining RCD + MCB functions",
        frequency: "common",
        regional: "UK-wide",
        examples: ["Fit RCBOs for all final circuits", "The RCBO provides both protection types"],
        dosDonts: {
          dos: ["Use for combined protection devices", "Standard in modern installations"],
          donts: ["Don't call them just RCDs", "Not the same as separate RCD + MCB"]
        }
      },
      { 
        term: "RCD", 
        definition: "Residual Current Device",
        pronunciation: "ar-see-DEE",
        etymology: "Technical abbreviation",
        frequency: "very-common",
        regional: "UK-wide",
        examples: ["Test the RCD monthly", "The RCD keeps tripping"],
        dosDonts: {
          dos: ["Essential safety device", "Test regularly"],
          donts: ["Don't ignore RCD trips", "Not called GFCI in UK"]
        }
      },
      { 
        term: "SWA", 
        definition: "Steel Wire Armoured cable",
        pronunciation: "es-double-you-AY",
        etymology: "Descriptive of cable construction",
        frequency: "common",
        regional: "UK-wide",
        examples: ["Use SWA for the external supply", "Bury the SWA cable 600mm deep"],
        dosDonts: {
          dos: ["Standard for underground/external runs", "Provides mechanical protection"],
          donts: ["Don't use without proper glands", "Not suitable for all environments"]
        }
      },
      { 
        term: "PIR", 
        definition: "Passive Infrared (motion sensor)",
        pronunciation: "pee-eye-AR",
        etymology: "Technical description of sensor type",
        frequency: "common",
        regional: "UK-wide",
        examples: ["Install PIR sensors for the security lighting", "The PIR isn't detecting movement"],
        dosDonts: {
          dos: ["Standard term for motion sensors", "Common in lighting circuits"],
          donts: ["Don't confuse with other sensor types", "Not all motion sensors are PIR"]
        }
      },
      { 
        term: "Trunking", 
        definition: "Cable management system/containment",
        pronunciation: "TRUNK-ing",
        etymology: "From 'trunk' - main pathway",
        frequency: "very-common",
        regional: "UK-wide",
        examples: ["Run the cables in trunking", "Install plastic trunking along the wall"],
        dosDonts: {
          dos: ["Use for cable containment", "Available in various materials"],
          donts: ["Don't overfill trunking", "Not the same as conduit"]
        }
      }
    ],
    tools: [
      { 
        term: "Multimeter", 
        definition: "Multi-function electrical testing instrument",
        pronunciation: "MUL-tee-mee-ter",
        etymology: "Multiple measurements in one meter",
        frequency: "very-common",
        regional: "UK-wide",
        examples: ["Use your multimeter to check voltage", "The multimeter shows continuity"],
        dosDonts: {
          dos: ["Essential tool for all electricians", "Learn all functions"],
          donts: ["Don't use on live circuits without proper CAT rating", "Never ignore safety warnings"]
        }
      },
      { 
        term: "Meg", 
        definition: "Megger (insulation resistance tester)",
        pronunciation: "meg",
        etymology: "Brand name that became generic term",
        frequency: "very-common",
        regional: "UK-wide",
        examples: ["Do a meg test on the circuit", "The meg reading is too low"],
        dosDonts: {
          dos: ["Essential for testing insulation", "Use appropriate test voltage"],
          donts: ["Don't test live circuits", "Don't ignore low readings"]
        }
      },
      { 
        term: "Side Cutters", 
        definition: "Wire cutting pliers",
        pronunciation: "side CUT-ters",
        etymology: "Cut from the side rather than end",
        frequency: "very-common",
        regional: "UK-wide",
        examples: ["Use side cutters to trim the cables", "Get the side cutters from the van"],
        dosDonts: {
          dos: ["Essential for cable preparation", "Keep sharp for clean cuts"],
          donts: ["Don't use on steel wire", "Not suitable for large cables"]
        }
      },
      { 
        term: "Strippers", 
        definition: "Wire stripping tool",
        pronunciation: "STRIP-pers",
        etymology: "Strips insulation from wires",
        frequency: "very-common",
        regional: "UK-wide",
        examples: ["Use strippers to prepare the cable ends", "The strippers are in the toolbox"],
        dosDonts: {
          dos: ["Essential for cable preparation", "Adjust for different cable sizes"],
          donts: ["Don't damage the conductor", "Not suitable for all cable types"]
        }
      }
    ],
    safety: [
      { 
        term: "Lock Off", 
        definition: "Isolation and securing procedure",
        pronunciation: "lok off",
        etymology: "Physically locking isolation devices",
        frequency: "very-common",
        regional: "UK-wide",
        examples: ["Lock off the supply before starting work", "Always lock off and tag"],
        dosDonts: {
          dos: ["Essential safety procedure", "Use proper locks and tags"],
          donts: ["Never work on live circuits", "Don't assume isolation without testing"]
        }
      },
      { 
        term: "Permit to Work", 
        definition: "Formal safety document for hazardous work",
        pronunciation: "PER-mit to wurk",
        etymology: "Formal permission system",
        frequency: "common",
        regional: "UK-wide, industrial",
        examples: ["You need a permit to work for that job", "The permit to work expires at 5pm"],
        dosDonts: {
          dos: ["Required for high-risk work", "Follow all conditions"],
          donts: ["Don't start work without permit", "Don't exceed permit scope"]
        }
      },
      { 
        term: "PPE", 
        definition: "Personal Protective Equipment",
        pronunciation: "pee-pee-EE",
        etymology: "Health and safety abbreviation",
        frequency: "very-common",
        regional: "UK-wide",
        examples: ["Wear your PPE at all times", "Check your PPE before starting"],
        dosDonts: {
          dos: ["Always wear appropriate PPE", "Inspect before use"],
          donts: ["Don't use damaged PPE", "Not optional on site"]
        }
      }
    ],
    general: [
      { 
        term: "Site", 
        definition: "Construction or work location",
        pronunciation: "sight",
        etymology: "Location where work takes place",
        frequency: "very-common",
        regional: "UK-wide",
        examples: ["Meet you on site at 8am", "Site induction is mandatory"],
        dosDonts: {
          dos: ["Universal construction term", "Respect site rules"],
          donts: ["Don't enter site without proper authorisation", "Never ignore site safety rules"]
        }
      },
      { 
        term: "Plant", 
        definition: "Heavy machinery or equipment room",
        pronunciation: "plant",
        etymology: "Industrial equipment",
        frequency: "common",
        regional: "UK-wide",
        examples: ["The plant room houses the main switchgear", "Plant operators need special training"],
        dosDonts: {
          dos: ["Common in industrial/commercial", "Usually restricted access"],
          donts: ["Don't enter plant rooms without authorisation", "Be aware of noise and hazards"]
        }
      },
      { 
        term: "Trades", 
        definition: "Skilled construction workers",
        pronunciation: "traydz",
        etymology: "Traditional skilled occupations",
        frequency: "very-common",
        regional: "UK-wide",
        examples: ["All trades need to attend the safety briefing", "Coordinate with other trades"],
        dosDonts: {
          dos: ["Respect all trades", "Good communication essential"],
          donts: ["Don't interfere with other trades' work", "Don't assume others know your requirements"]
        }
      }
    ]
  };

  const allTerms = Object.values(jargonData).flat();
  
  const filteredTerms = allTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           Object.entries(jargonData).some(([cat, terms]) => 
                             cat === selectedCategory && terms.includes(term));
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (term: string) => {
    setFavoriteTerms(prev => 
      prev.includes(term) 
        ? prev.filter(t => t !== term)
        : [...prev, term]
    );
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case "very-common": return "bg-green-500";
      case "common": return "bg-yellow-500";
      case "uncommon": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "electrical": return <Zap className="h-4 w-4" />;
      case "tools": return <BookOpen className="h-4 w-4" />;
      case "safety": return <AlertTriangle className="h-4 w-4" />;
      case "general": return <MessageCircle className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  const startQuiz = () => {
    setQuizMode(true);
    setCurrentQuizIndex(0);
  };

  const quizTerms = filteredTerms.slice(0, 10);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Site Jargon & Terminology</h1>
          <p className="text-muted-foreground">Master the language of UK electrical and construction sites</p>
        </div>
        <Link to="/apprentice/toolbox" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Toolbox
          </Button>
        </Link>
      </div>

      {/* Search and Filter Controls */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search terms or definitions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-elec-dark/50"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[200px] bg-elec-dark/50">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-elec-yellow/20">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electrical">Electrical</SelectItem>
                <SelectItem value="tools">Tools</SelectItem>
                <SelectItem value="safety">Safety</SelectItem>
                <SelectItem value="general">General Site</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={startQuiz} className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
              <Trophy className="mr-2 h-4 w-4" />
              Start Quiz
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quiz Mode */}
      {quizMode && quizTerms.length > 0 && (
        <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Jargon Quiz - Term {currentQuizIndex + 1} of {quizTerms.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">{quizTerms[currentQuizIndex]?.term}</h3>
                <p className="text-sm text-muted-foreground">What does this term mean?</p>
              </div>
              <div className="text-center">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    // Show answer logic here
                    if (currentQuizIndex < quizTerms.length - 1) {
                      setCurrentQuizIndex(prev => prev + 1);
                    } else {
                      setQuizMode(false);
                    }
                  }}
                  className="mr-2"
                >
                  Show Answer
                </Button>
                <Button 
                  onClick={() => setQuizMode(false)}
                  variant="ghost"
                >
                  Exit Quiz
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Terms Display */}
      <div className="grid grid-cols-1 gap-4">
        {filteredTerms.map((item, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray/50 hover:bg-elec-gray/70 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getCategoryIcon(Object.keys(jargonData).find(cat => 
                    jargonData[cat as keyof typeof jargonData].includes(item)) || "general")}
                  <div>
                    <h3 className="font-bold text-elec-yellow text-xl">{item.term}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-blue-400"
                      >
                        <Volume2 className="h-3 w-3" />
                      </Button>
                      <span className="text-sm text-muted-foreground">{item.pronunciation}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`${getFrequencyColor(item.frequency)} text-white border-none`}>
                    {item.frequency.replace('-', ' ')}
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite(item.term)}
                    className={`h-8 w-8 p-0 ${favoriteTerms.includes(item.term) ? 'text-yellow-400' : 'text-muted-foreground'}`}
                  >
                    <Star className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <p className="text-elec-light/90 mb-4">{item.definition}</p>
              
              <Tabs defaultValue="examples" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-elec-dark/50">
                  <TabsTrigger value="examples">Examples</TabsTrigger>
                  <TabsTrigger value="usage">Usage</TabsTrigger>
                  <TabsTrigger value="etymology">Origin</TabsTrigger>
                  <TabsTrigger value="region">Regional</TabsTrigger>
                </TabsList>
                
                <TabsContent value="examples" className="mt-4">
                  <div className="space-y-2">
                    {item.examples.map((example, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-elec-yellow">•</span>
                        <span>"{example}"</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="usage" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-green-400 mb-2">Do's:</h5>
                      <ul className="space-y-1">
                        {item.dosDonts.dos.map((do_item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-green-400">✓</span>
                            {do_item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-red-400 mb-2">Don'ts:</h5>
                      <ul className="space-y-1">
                        {item.dosDonts.donts.map((dont, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-red-400">✗</span>
                            {dont}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="etymology" className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-blue-400">Origin:</span> {item.etymology}
                  </p>
                </TabsContent>
                
                <TabsContent value="region" className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-purple-400">Regional Usage:</span> {item.regional}
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="text-center py-12">
            <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No terms found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}

      {/* Learning Tips */}
      <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Learning Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <h5 className="font-medium text-white mb-2">Quick Learning:</h5>
              <ul className="space-y-1">
                <li>• Use the quiz mode to test yourself</li>
                <li>• Mark frequently used terms as favorites</li>
                <li>• Practice pronunciation using the audio guide</li>
                <li>• Learn the context through examples</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-white mb-2">On Site:</h5>
              <ul className="space-y-1">
                <li>• Listen to how experienced tradespeople speak</li>
                <li>• Ask for clarification when unsure</li>
                <li>• Note regional variations you encounter</li>
                <li>• Practice using terms in appropriate context</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteJargon;
