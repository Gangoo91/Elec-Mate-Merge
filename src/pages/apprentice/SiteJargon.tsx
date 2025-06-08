import { useState, useMemo } from "react";
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MessageSquare, MapPin, Lightbulb, Volume2, Star, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SiteJargon = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [activeTab, setActiveTab] = useState("terminology");

  const jargonTerms = [
    { term: "2nd Fix", meaning: "Second phase of electrical installation - switches, sockets, light fittings", category: "Installation", difficulty: "beginner", audio: true },
    { term: "1st Fix", meaning: "First phase - cables, back boxes, rough wiring before plastering", category: "Installation", difficulty: "beginner", audio: true },
    { term: "Genny", meaning: "Generator - portable power source", category: "Equipment", difficulty: "beginner", audio: true },
    { term: "Daisy Chain", meaning: "Connecting multiple devices in series, one after another", category: "Wiring", difficulty: "intermediate", audio: true },
    { term: "Dead Test", meaning: "Testing with power isolated/switched off", category: "Testing", difficulty: "beginner", audio: true },
    { term: "Live Test", meaning: "Testing with power on (dangerous - needs proper procedures)", category: "Testing", difficulty: "advanced", audio: true },
    { term: "Sparky", meaning: "Electrician (common nickname)", category: "People", difficulty: "beginner", audio: true },
    { term: "Mate", meaning: "Apprentice or assistant electrician", category: "People", difficulty: "beginner", audio: true },
    { term: "Gaffer", meaning: "Boss, supervisor, or site manager", category: "People", difficulty: "beginner", audio: true },
    { term: "Spark up", meaning: "Turn the power on, energize a circuit", category: "Operation", difficulty: "beginner", audio: true },
    { term: "Kill it", meaning: "Turn off the power, isolate a circuit", category: "Operation", difficulty: "beginner", audio: true },
    { term: "Hot", meaning: "Live electrical circuit (dangerous)", category: "Safety", difficulty: "beginner", audio: true },
    { term: "Earth", meaning: "Ground connection for safety", category: "Safety", difficulty: "beginner", audio: true },
    { term: "Zs", meaning: "Earth fault loop impedance", category: "Testing", difficulty: "advanced", audio: false },
    { term: "IR", meaning: "Insulation resistance testing", category: "Testing", difficulty: "intermediate", audio: false },
    { term: "RCD", meaning: "Residual Current Device (safety trip switch)", category: "Equipment", difficulty: "beginner", audio: true },
    { term: "MCB", meaning: "Miniature Circuit Breaker", category: "Equipment", difficulty: "beginner", audio: true },
    { term: "CU", meaning: "Consumer Unit (fuse box)", category: "Equipment", difficulty: "beginner", audio: true },
    { term: "DB", meaning: "Distribution Board", category: "Equipment", difficulty: "beginner", audio: true },
    { term: "SWA", meaning: "Steel Wire Armoured cable", category: "Cable", difficulty: "intermediate", audio: true },
    { term: "T&E", meaning: "Twin and Earth cable", category: "Cable", difficulty: "beginner", audio: true },
    { term: "3C+E", meaning: "3 Core plus Earth cable", category: "Cable", difficulty: "beginner", audio: true },
    { term: "Ring", meaning: "Ring final circuit (sockets)", category: "Wiring", difficulty: "intermediate", audio: true },
    { term: "Radial", meaning: "Circuit that goes out and doesn't return", category: "Wiring", difficulty: "intermediate", audio: true },
    { term: "Trunking", meaning: "Plastic or metal channel for cables", category: "Installation", difficulty: "beginner", audio: true },
    { term: "Conduit", meaning: "Tube for protecting and routing cables", category: "Installation", difficulty: "beginner", audio: true },
    
    { term: "Banjo", meaning: "Metal earth tag used on glands", category: "Equipment", difficulty: "intermediate", audio: true },
    { term: "Choc Block", meaning: "Terminal block connector", category: "Equipment", difficulty: "beginner", audio: true },
    { term: "Coffin", meaning: "Joint box or enclosure", category: "Equipment", difficulty: "beginner", audio: true },
    { term: "Crimp", meaning: "Method of joining cables with a metal sleeve", category: "Technique", difficulty: "beginner", audio: true },
    { term: "Grunt", meaning: "Apprentice or labourer", category: "People", difficulty: "beginner", audio: true },
    { term: "Juice", meaning: "Electrical power", category: "General", difficulty: "beginner", audio: true },
    { term: "Loom", meaning: "Bundle of cables", category: "Cable", difficulty: "beginner", audio: true },
    { term: "Nutty", meaning: "Something dangerous or dodgy", category: "Safety", difficulty: "beginner", audio: true },
    { term: "Pattress", meaning: "Back box for switches/sockets", category: "Installation", difficulty: "beginner", audio: true },
    { term: "Ramp", meaning: "Cable protection ramp", category: "Installation", difficulty: "beginner", audio: true },
    { term: "Spanner", meaning: "Wrench tool", category: "Tools", difficulty: "beginner", audio: true },
    { term: "Topped off", meaning: "Energised, made live", category: "Operation", difficulty: "beginner", audio: true },
    { term: "Volt stick", meaning: "Non-contact voltage detector", category: "Tools", difficulty: "beginner", audio: true },
    { term: "Wagos", meaning: "Type of connector (brand name)", category: "Equipment", difficulty: "beginner", audio: true },
    { term: "Bodge", meaning: "Temporary or poor quality fix", category: "General", difficulty: "beginner", audio: true },
    { term: "Brick", meaning: "Large transformer or power supply", category: "Equipment", difficulty: "beginner", audio: true },
    { term: "Donkey", meaning: "Portable cable drum stand", category: "Equipment", difficulty: "beginner", audio: true },
    { term: "Duct", meaning: "Cable management system", category: "Installation", difficulty: "beginner", audio: true },
    { term: "Gland", meaning: "Cable entry device", category: "Equipment", difficulty: "intermediate", audio: true },
    { term: "Hippo", meaning: "Large cable joint", category: "Equipment", difficulty: "intermediate", audio: true }
  ];

  const situationalPhrases = [
    { phrase: "Right, let's crack on", meaning: "Let's get started/continue working", situation: "Starting work", formality: "informal" },
    { phrase: "Bob's your uncle", meaning: "There you go, it's done", situation: "Completing a task", formality: "informal" },
    { phrase: "Piece of piss", meaning: "Very easy task", situation: "Describing difficulty", formality: "informal" },
    { phrase: "Bodge job", meaning: "Poor quality, temporary fix", situation: "Describing workmanship", formality: "informal" },
    { phrase: "Proper job", meaning: "Well done, correct way", situation: "Praising work", formality: "informal" },
    { phrase: "Having a mare", meaning: "Having a difficult/bad time", situation: "Struggling with work", formality: "informal" },
    { phrase: "Wind your neck in", meaning: "Calm down, stop being aggressive", situation: "Conflict resolution", formality: "informal" },
    { phrase: "Don't be a melt", meaning: "Don't be stupid/annoying", situation: "Mild criticism", formality: "informal" },
    { phrase: "Safe as houses", meaning: "Very secure or reliable", situation: "Describing safety", formality: "informal" },
    { phrase: "Take it steady", meaning: "Work carefully, don't rush", situation: "Safety reminder", formality: "informal" },
    { phrase: "Catch you later", meaning: "See you later", situation: "Saying goodbye", formality: "informal" },
    { phrase: "Cheers mate", meaning: "Thank you", situation: "Expressing gratitude", formality: "informal" }
  ];

  const regionalSlang = [
    { 
      region: "North England", 
      terms: [
        { term: "Barms", meaning: "Bread rolls" },
        { term: "Ginnel", meaning: "Narrow alleyway" },
        { term: "Owt", meaning: "Anything" },
        { term: "Nowt", meaning: "Nothing" },
        { term: "Reyt", meaning: "Right/very" },
        { term: "Chuffed", meaning: "Pleased/happy" }
      ],
      accent: "Often dropping 'h' sounds, 'the' becomes 'thee'"
    },
    { 
      region: "South England", 
      terms: [
        { term: "Rolls", meaning: "Bread" },
        { term: "Alley", meaning: "Narrow passage" },
        { term: "Anything", meaning: "Something" },
        { term: "Nothing", meaning: "Not anything" },
        { term: "Proper", meaning: "Very/really" },
        { term: "Brilliant", meaning: "Excellent" }
      ],
      accent: "Clearer pronunciation, longer vowels"
    },
    { 
      region: "Scotland", 
      terms: [
        { term: "Piece", meaning: "Sandwich" },
        { term: "Ken", meaning: "Know" },
        { term: "Cannae", meaning: "Can't" },
        { term: "Dinnae", meaning: "Don't" },
        { term: "Wee", meaning: "Small" },
        { term: "Braw", meaning: "Good/great" }
      ],
      accent: "Rolling 'r' sounds, distinct vowel pronunciation"
    },
    { 
      region: "London", 
      terms: [
        { term: "Butty", meaning: "Sandwich" },
        { term: "Gaff", meaning: "Place/home" },
        { term: "Sorted", meaning: "Fixed/done" },
        { term: "Bloke", meaning: "Man/guy" },
        { term: "Quid", meaning: "Pounds (money)" },
        { term: "Innit", meaning: "Isn't it" }
      ],
      accent: "Cockney influences, rhyming slang elements"
    },
    { 
      region: "Wales", 
      terms: [
        { term: "Cwtch", meaning: "Cuddle/hug" },
        { term: "Tidy", meaning: "Good/nice" },
        { term: "Lush", meaning: "Great/lovely" },
        { term: "Butt", meaning: "Friend/mate" },
        { term: "Where to?", meaning: "Where is it?" },
        { term: "By there", meaning: "Over there" }
      ],
      accent: "Musical intonation, Welsh language influences"
    },
    { 
      region: "Northern Ireland", 
      terms: [
        { term: "Wee buns", meaning: "Easy/simple" },
        { term: "Craic", meaning: "Fun/news" },
        { term: "Bout ye", meaning: "How are you?" },
        { term: "Dead on", meaning: "Okay/alright" },
        { term: "Catch yourself on", meaning: "Get real/wise up" },
        { term: "Quare", meaning: "Very/quite" }
      ],
      accent: "Irish influences, distinctive rhythm"
    }
  ];

  const safetyTerms = [
    { term: "Hot work", meaning: "Work involving heat/sparks (welding, cutting)", category: "Safety", difficulty: "intermediate" },
    { term: "Permit to work", meaning: "Safety document for high-risk activities", category: "Safety", difficulty: "intermediate" },
    { term: "LOTO", meaning: "Lock Out Tag Out - isolation procedure", category: "Safety", difficulty: "advanced" },
    { term: "PPE", meaning: "Personal Protective Equipment", category: "Safety", difficulty: "beginner" },
    { term: "Safe system of work", meaning: "Planned method to work safely", category: "Safety", difficulty: "intermediate" },
    { term: "Risk assessment", meaning: "Process of identifying hazards", category: "Safety", difficulty: "beginner" },
    { term: "Method statement", meaning: "Step-by-step work procedure", category: "Safety", difficulty: "intermediate" },
    { term: "Toolbox talk", meaning: "Short safety briefing", category: "Safety", difficulty: "beginner" }
  ];

  const categories = ["all", "Installation", "Equipment", "Testing", "Wiring", "Cable", "People", "Operation", "Safety", "Tools", "General", "Technique"];
  const difficulties = ["all", "beginner", "intermediate", "advanced"];
  const regions = ["all", "North England", "South England", "Scotland", "London", "Wales", "Northern Ireland"];

  const filteredTerms = useMemo(() => {
    let filtered = jargonTerms;
    
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    return filtered;
  }, [searchTerm, selectedCategory]);

  const filteredPhrases = useMemo(() => {
    return situationalPhrases.filter(phrase =>
      phrase.phrase.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phrase.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phrase.situation.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const filteredRegionalTerms = useMemo(() => {
    if (selectedRegion === "all") return regionalSlang;
    return regionalSlang.filter(region => region.region === selectedRegion);
  }, [selectedRegion]);

  const getCategoryColor = (category: string) => {
    const colors = {
      "Installation": "border-blue-500/40 text-blue-300",
      "Equipment": "border-green-500/40 text-green-300", 
      "Testing": "border-purple-500/40 text-purple-300",
      "Wiring": "border-yellow-500/40 text-yellow-300",
      "Cable": "border-orange-500/40 text-orange-300",
      "People": "border-pink-500/40 text-pink-300",
      "Operation": "border-cyan-500/40 text-cyan-300",
      "Safety": "border-red-500/40 text-red-300",
      "Tools": "border-indigo-500/40 text-indigo-300",
      "General": "border-gray-500/40 text-gray-300",
      "Technique": "border-emerald-500/40 text-emerald-300"
    };
    return colors[category as keyof typeof colors] || "border-elec-yellow/40 text-elec-yellow";
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      "beginner": "bg-green-500/20 text-green-300",
      "intermediate": "bg-yellow-500/20 text-yellow-300",
      "advanced": "bg-red-500/20 text-red-300"
    };
    return colors[difficulty as keyof typeof colors] || "bg-gray-500/20 text-gray-300";
  };

  const playAudio = (term: string) => {
    // Placeholder for audio functionality
    console.log(`Playing audio for: ${term}`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Site Slang & Jargon Decoder</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Master the language of the trade and communicate confidently on any UK construction site
        </p>
        <BackButton customUrl="/apprentice/toolbox" label="Back to Guidance Area" />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="terminology">Terminology</TabsTrigger>
          <TabsTrigger value="phrases">Common Phrases</TabsTrigger>
          <TabsTrigger value="regional">Regional Differences</TabsTrigger>
          <TabsTrigger value="learning">Learning Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="terminology" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search electrical terms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-elec-yellow/20 bg-elec-gray/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-elec-yellow">{filteredTerms.length}</div>
                <div className="text-sm text-muted-foreground">Terms Found</div>
              </CardContent>
            </Card>
            <Card className="border-elec-yellow/20 bg-elec-gray/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">
                  {filteredTerms.filter(t => t.difficulty === "beginner").length}
                </div>
                <div className="text-sm text-muted-foreground">Beginner</div>
              </CardContent>
            </Card>
            <Card className="border-elec-yellow/20 bg-elec-gray/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {filteredTerms.filter(t => t.difficulty === "intermediate").length}
                </div>
                <div className="text-sm text-muted-foreground">Intermediate</div>
              </CardContent>
            </Card>
            <Card className="border-elec-yellow/20 bg-elec-gray/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-400">
                  {filteredTerms.filter(t => t.difficulty === "advanced").length}
                </div>
                <div className="text-sm text-muted-foreground">Advanced</div>
              </CardContent>
            </Card>
          </div>

          {/* Terms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTerms.map((item, index) => (
              <Card key={index} className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-elec-yellow flex items-center gap-2">
                      {item.term}
                      {item.audio && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => playAudio(item.term)}
                          className="h-6 w-6 p-0"
                        >
                          <Volume2 className="h-3 w-3 text-elec-yellow" />
                        </Button>
                      )}
                    </CardTitle>
                    <div className="flex gap-1">
                      <Badge variant="outline" className={getCategoryColor(item.category)}>
                        {item.category}
                      </Badge>
                      <Badge className={getDifficultyColor(item.difficulty)}>
                        {item.difficulty}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.meaning}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="phrases" className="space-y-6">
          <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-6 w-6 text-elec-yellow" />
                <CardTitle className="text-elec-yellow">Common Site Phrases</CardTitle>
              </div>
              <p className="text-muted-foreground">
                Context matters - here's when and how to use these phrases appropriately
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPhrases.map((phrase, index) => (
                  <div key={index} className="border border-elec-yellow/20 rounded-lg p-4 bg-elec-dark/30">
                    <h4 className="font-semibold text-white mb-1">"{phrase.phrase}"</h4>
                    <p className="text-sm text-muted-foreground mb-2">{phrase.meaning}</p>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">
                        {phrase.situation}
                      </Badge>
                      <Badge variant="outline" className={phrase.formality === "informal" ? "text-orange-300" : "text-blue-300"}>
                        {phrase.formality}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regional" className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MapPin className="h-6 w-6 text-elec-yellow" />
              <h2 className="text-xl font-semibold text-elec-yellow">Regional Differences</h2>
            </div>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map(region => (
                  <SelectItem key={region} value={region}>
                    {region === "all" ? "All Regions" : region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRegionalTerms.map((region, index) => (
              <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="text-elec-yellow">{region.region}</CardTitle>
                  <p className="text-sm text-muted-foreground">{region.accent}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {region.terms.map((term, termIndex) => (
                      <div key={termIndex} className="flex justify-between items-start">
                        <span className="font-medium text-white">{term.term}</span>
                        <span className="text-sm text-muted-foreground text-right">{term.meaning}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="learning" className="space-y-6">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-elec-yellow" />
                <CardTitle className="text-elec-yellow">Learning & Memory Tools</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Quick Learning Tips */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-white">Memory Techniques</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Star className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      Group terms by category (tools, safety, people)
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      Practice with audio pronunciations
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      Start with beginner terms, progress gradually
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      Use context clues from conversations
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-white">Communication Tips</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Star className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      Don't be afraid to ask for clarification
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      Listen to how experienced workers communicate
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      Match the formality level of your team
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      Learn safety terms first - they're critical
                    </li>
                  </ul>
                </div>
              </div>

              {/* Safety-Critical Terms */}
              <div>
                <h3 className="font-semibold text-white mb-3">Safety-Critical Terms (Learn These First!)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {safetyTerms.map((term, index) => (
                    <div key={index} className="p-3 border border-red-500/30 rounded-lg bg-red-500/10">
                      <div className="flex justify-between items-start">
                        <span className="font-medium text-red-300">{term.term}</span>
                        <Badge className={getDifficultyColor(term.difficulty)}>
                          {term.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{term.meaning}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Why This Matters Section */}
      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300">Why Understanding Site Language Matters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-white">Safety</h4>
              <p className="text-sm text-muted-foreground">
                Quick understanding of urgent safety instructions can prevent accidents and save lives.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-white">Efficiency</h4>
              <p className="text-sm text-muted-foreground">
                Clear communication reduces mistakes, rework, and project delays.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-white">Integration</h4>
              <p className="text-sm text-muted-foreground">
                Speaking the trade language helps you fit in and gain respect from colleagues.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteJargon;
