
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, HelpCircle, CheckCircle, MessageSquare, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const OnJobSupervisorKnowledge = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqCategories = [
    {
      category: "Safety Procedures",
      icon: HelpCircle,
      questions: [
        {
          q: "What should I do if I'm unsure about safe isolation?",
          a: "Never proceed if you're uncertain. Always ask your supervisor to verify the isolation procedure. Use a proven voltage indicator and follow the lock-off/tag-out procedure."
        },
        {
          q: "When is it necessary to wear arc flash PPE?",
          a: "Arc flash PPE is required when working on live equipment above 50V AC or when there's a risk of electrical fault. Your supervisor should provide specific guidance based on the arc flash study."
        }
      ]
    },
    {
      category: "Installation Methods",
      icon: BookOpen,
      questions: [
        {
          q: "How do I calculate cable size for a new circuit?",
          a: "Consider: load current, ambient temperature, installation method, grouping factors, and voltage drop. Use BS7671 tables or approved software. Always verify calculations with your supervisor."
        },
        {
          q: "What's the maximum length for a ring final circuit?",
          a: "BS7671 doesn't specify a maximum length, but the floor area served shouldn't exceed 100m². The key is ensuring Zs values are within limits and proper operation of protective devices."
        }
      ]
    },
    {
      category: "Testing & Inspection",
      icon: CheckCircle,
      questions: [
        {
          q: "What Zs values indicate a failed test?",
          a: "Zs values must not exceed the maximum permitted values in BS7671 tables. For 32A Type B MCB: 1.44Ω, for 20A Type B: 2.3Ω. Temperature correction may apply."
        },
        {
          q: "Why might an RCD test fail?",
          a: "Common causes: damaged RCD, neutral-earth faults, incorrect wiring, or RCD outside tolerance. Check test current, timing, and ensure proper test button operation."
        }
      ]
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ask a Supervisor</h1>
          <p className="text-muted-foreground">Knowledge bank with FAQs from real-world site questions</p>
        </div>
        <Link to="/apprentice/on-job-tools" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Button>
        </Link>
      </div>

      {/* Search Bar */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search questions and answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* FAQ Categories */}
      <div className="space-y-6">
        {(searchQuery ? filteredFAQs : faqCategories).map((category) => (
          <Card key={category.category} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <category.icon className="h-5 w-5 text-elec-yellow" />
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {category.questions.map((qa, index) => (
                <div key={index} className="space-y-2 p-4 rounded-lg bg-elec-dark/30">
                  <h3 className="font-semibold text-sm text-elec-yellow">{qa.q}</h3>
                  <p className="text-sm text-elec-light/80">{qa.a}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Ask Question Card */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-elec-yellow" />
            Can't Find Your Answer?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-elec-light/80">
            If you can't find the answer you're looking for, don't hesitate to ask your supervisor directly. 
            Remember, asking questions is part of learning and shows professional responsibility.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button className="flex-1">
              <MessageSquare className="mr-2 h-4 w-4" />
              Submit a Question
            </Button>
            <Button variant="outline" className="flex-1">
              <BookOpen className="mr-2 h-4 w-4" />
              Browse All FAQs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnJobSupervisorKnowledge;
