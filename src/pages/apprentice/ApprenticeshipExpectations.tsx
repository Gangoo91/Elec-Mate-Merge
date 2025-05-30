
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Clock, Users } from "lucide-react";

const ApprenticeshipExpectations = () => {
  const day1Checklist = [
    "Arrive 15 minutes early",
    "Bring basic PPE (hard hat, hi-vis, safety boots)",
    "Have a notepad and pen ready",
    "Bring your apprenticeship agreement/paperwork",
    "Dress appropriately for the trade",
    "Bring lunch and water bottle"
  ];

  const siteEtiquette = [
    {
      rule: "Follow the Chain of Command",
      description: "Always speak to your supervisor first, not the client or main contractor directly"
    },
    {
      rule: "Ask Questions the Right Way",
      description: "Say 'I want to make sure I do this correctly, can you show me?' instead of just 'I don't know'"
    },
    {
      rule: "Listen Before Speaking",
      description: "Observe for your first few days. Learn names, routines, and site-specific rules"
    },
    {
      rule: "Respect the Tea Fund",
      description: "Contribute to communal expenses and don't take without giving back"
    }
  ];

  const essentialTools = [
    { category: "Hand Tools", items: ["Basic screwdriver set", "Wire strippers", "Side cutters", "Long nose pliers"] },
    { category: "Measuring", items: ["Tape measure", "Spirit level", "Voltage tester pen"] },
    { category: "PPE", items: ["Safety boots", "Hard hat", "Hi-vis vest", "Safety glasses"] },
    { category: "Organisation", items: ["Tool bag/box", "Knee pads", "Head torch"] }
  ];

  const yearExpectations = [
    {
      year: "First Year",
      expectations: [
        "Learn basic safety procedures and follow them religiously",
        "Carry materials and assist qualified electricians",
        "Practise basic wiring techniques under supervision",
        "Learn to use basic hand tools properly",
        "Start understanding electrical theory at college"
      ],
      responsibilities: [
        "Keep work area clean and tidy",
        "Ask questions when unsure",
        "Be on time and reliable",
        "Complete college assignments"
      ]
    },
    {
      year: "Second Year",
      expectations: [
        "Work more independently on basic tasks",
        "Understand circuit design basics",
        "Use power tools safely and effectively",
        "Help with installation planning",
        "Prepare for 18th Edition exam"
      ],
      responsibilities: [
        "Take ownership of specific tasks",
        "Help train newer apprentices",
        "Complete more complex college work",
        "Start building your portfolio"
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">What to Expect in Your Apprenticeship</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Essential guidance for starting your electrical apprenticeship and succeeding from day one
        </p>
        <BackButton customUrl="/apprentice/toolbox" label="Back to Guidance Area" />
      </div>

      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <CardTitle className="text-green-300">Day 1 on Site: Show Up Prepared</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Essential Checklist</h4>
              <ul className="space-y-2">
                {day1Checklist.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-elec-yellow/10 p-4 rounded-lg">
              <h4 className="font-semibold text-elec-yellow mb-2">Pro Tip</h4>
              <p className="text-sm text-muted-foreground">
                Your first impression matters. Being prepared shows you're serious about the trade and 
                sets you up for success from day one.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Site Etiquette & Chain of Command</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {siteEtiquette.map((rule, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{rule.rule}</h4>
                <p className="text-sm text-muted-foreground">{rule.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Tools You Should Own (Not Borrow)</CardTitle>
          <p className="text-muted-foreground text-sm">
            Investing in your own tools shows professionalism and ensures you always have what you need
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {essentialTools.map((category, index) => (
              <div key={index}>
                <h4 className="font-semibold text-white mb-3">{category.category}</h4>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-elec-yellow mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {yearExpectations.map((year, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-xl text-elec-yellow">{year.year}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-2">What to Expect</h4>
                <ul className="space-y-1">
                  {year.expectations.map((expectation, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-elec-yellow mt-1">•</span>
                      {expectation}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Your Responsibilities</h4>
                <ul className="space-y-1">
                  {year.responsibilities.map((responsibility, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-orange-500/50 bg-orange-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-orange-400" />
            <CardTitle className="text-orange-300">Remember</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Every site is different, but these fundamentals will serve you well anywhere. Stay curious, 
            work safely, and remember that everyone was new once. Your attitude and willingness to learn 
            matter more than what you don't know yet.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApprenticeshipExpectations;
