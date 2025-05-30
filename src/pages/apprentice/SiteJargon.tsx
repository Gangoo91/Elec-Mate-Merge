
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search, MessageSquare, MapPin } from "lucide-react";

const SiteJargon = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const jargonTerms = [
    { term: "2nd Fix", meaning: "Second phase of electrical installation - switches, sockets, light fittings", category: "Installation" },
    { term: "1st Fix", meaning: "First phase - cables, back boxes, rough wiring before plastering", category: "Installation" },
    { term: "Genny", meaning: "Generator - portable power source", category: "Equipment" },
    { term: "Daisy Chain", meaning: "Connecting multiple devices in series, one after another", category: "Wiring" },
    { term: "Dead Test", meaning: "Testing with power isolated/switched off", category: "Testing" },
    { term: "Live Test", meaning: "Testing with power on (dangerous - needs proper procedures)", category: "Testing" },
    { term: "Sparky", meaning: "Electrician (common nickname)", category: "People" },
    { term: "Mate", meaning: "Apprentice or assistant electrician", category: "People" },
    { term: "Gaffer", meaning: "Boss, supervisor, or site manager", category: "People" },
    { term: "Spark up", meaning: "Turn the power on, energize a circuit", category: "Operation" },
    { term: "Kill it", meaning: "Turn off the power, isolate a circuit", category: "Operation" },
    { term: "Hot", meaning: "Live electrical circuit (dangerous)", category: "Safety" },
    { term: "Earth", meaning: "Ground connection for safety", category: "Safety" },
    { term: "Zs", meaning: "Earth fault loop impedance", category: "Testing" },
    { term: "IR", meaning: "Insulation resistance testing", category: "Testing" },
    { term: "RCD", meaning: "Residual Current Device (safety trip switch)", category: "Equipment" },
    { term: "MCB", meaning: "Miniature Circuit Breaker", category: "Equipment" },
    { term: "CU", meaning: "Consumer Unit (fuse box)", category: "Equipment" },
    { term: "DB", meaning: "Distribution Board", category: "Equipment" },
    { term: "SWA", meaning: "Steel Wire Armoured cable", category: "Cable" },
    { term: "T&E", meaning: "Twin and Earth cable", category: "Cable" },
    { term: "3C+E", meaning: "3 Core plus Earth cable", category: "Cable" },
    { term: "Ring", meaning: "Ring final circuit (sockets)", category: "Wiring" },
    { term: "Radial", meaning: "Circuit that goes out and doesn't return", category: "Wiring" },
    { term: "Trunking", meaning: "Plastic or metal channel for cables", category: "Installation" },
    { term: "Conduit", meaning: "Tube for protecting and routing cables", category: "Installation" }
  ];

  const regionalSlang = [
    { region: "North", terms: ["Barms (bread rolls)", "Ginnel (alleyway)", "Owt (anything)", "Nowt (nothing)"] },
    { region: "South", terms: ["Rolls (bread)", "Alley", "Anything", "Nothing"] },
    { region: "Scotland", terms: ["Piece (sandwich)", "Ken (know)", "Cannae (can't)", "Dinnae (don't)"] },
    { region: "London", terms: ["Butty (sandwich)", "Gaff (place/home)", "Sorted (fixed/done)", "Proper (very/really)"] }
  ];

  const commonPhrases = [
    { phrase: "Right, let's crack on", meaning: "Let's get started/continue working" },
    { phrase: "Bob's your uncle", meaning: "There you go, it's done" },
    { phrase: "Piece of piss", meaning: "Very easy task" },
    { phrase: "Bodge job", meaning: "Poor quality, temporary fix" },
    { phrase: "Proper job", meaning: "Well done, correct way" },
    { phrase: "Having a mare", meaning: "Having a difficult/bad time" },
    { phrase: "Wind your neck in", meaning: "Calm down, stop being aggressive" },
    { phrase: "Don't be a melt", meaning: "Don't be stupid/annoying" }
  ];

  const filteredTerms = jargonTerms.filter(item =>
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    const colors = {
      "Installation": "border-blue-500/40 text-blue-300",
      "Equipment": "border-green-500/40 text-green-300", 
      "Testing": "border-purple-500/40 text-purple-300",
      "Wiring": "border-yellow-500/40 text-yellow-300",
      "Cable": "border-orange-500/40 text-orange-300",
      "People": "border-pink-500/40 text-pink-300",
      "Operation": "border-cyan-500/40 text-cyan-300",
      "Safety": "border-red-500/40 text-red-300"
    };
    return colors[category as keyof typeof colors] || "border-elec-yellow/40 text-elec-yellow";
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Site Slang & Jargon Decoder</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Decode the language of the trade and feel confident in site conversations
        </p>
        <BackButton customUrl="/apprentice/toolbox" label="Back to Guidance Area" />
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search electrical terms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTerms.map((item, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-elec-yellow">{item.term}</CardTitle>
                <Badge variant="outline" className={getCategoryColor(item.category)}>
                  {item.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.meaning}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Common Site Phrases</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {commonPhrases.map((phrase, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-3">
                <h4 className="font-semibold text-white mb-1">"{phrase.phrase}"</h4>
                <p className="text-sm text-muted-foreground">{phrase.meaning}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Regional Differences</CardTitle>
          </div>
          <p className="text-muted-foreground text-sm">
            The same things get called different names depending on where you work
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regionalSlang.map((region, index) => (
              <div key={index}>
                <h4 className="font-semibold text-white mb-3">{region.region}</h4>
                <ul className="space-y-2">
                  {region.terms.map((term, termIndex) => (
                    <li key={termIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-elec-yellow mt-1">•</span>
                      {term}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300">Why This Matters</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Understanding site language isn't just about fitting in - it's about safety and efficiency. 
            When someone shouts "kill it!" in an emergency, you need to know they mean turn off the power, 
            not ask for clarification. Learning the language helps you communicate clearly and shows you're 
            becoming part of the trade.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteJargon;
