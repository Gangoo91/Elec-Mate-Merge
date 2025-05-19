
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Search, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import BackButton from "@/components/common/BackButton";
import { toast } from "@/hooks/use-toast";

const SupervisorKnowledge = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [questionSubmitted, setQuestionSubmitted] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");

  const faqs = [
    {
      id: "q1",
      question: "How do I fill out a schedule of test results?",
      answer: "When filling out a schedule of test results, ensure you include:\n\n1. Circuit description and reference\n2. Type and rating of protective device\n3. Test results for continuity (R1+R2)\n4. Test results for insulation resistance (IR)\n5. Test results for earth fault loop impedance (Zs)\n6. Test results for polarity\n7. Test results for RCD operation (if applicable)\n8. Details of the test instruments used\n\nEnsure all results are dated, signed, and comply with BS 7671 requirements. Use indelible ink and avoid using correction fluid."
    },
    {
      id: "q2",
      question: "What does a failed IR test mean?",
      answer: "A failed insulation resistance (IR) test indicates a potential breakdown in the insulation between conductors or between conductors and earth. This could be caused by:\n\n1. Physical damage to cable insulation\n2. Moisture ingress into equipment\n3. Overheating causing insulation deterioration\n4. Equipment connected to the circuit that's affecting readings\n5. Aging of insulation material\n\nAlways isolate and disconnect sensitive electronic equipment before testing, and check for any obvious damage to cables or terminations. A failed IR test requires investigation and rectification before the circuit can be energized."
    },
    {
      id: "q3",
      question: "When do I use an RCD tester vs the button?",
      answer: "An RCD tester should be used during formal inspection and testing to verify that the RCD operates within the correct disconnection time. The test button on the RCD itself only confirms that the mechanical tripping mechanism works, but doesn't verify the correct operating current or disconnection time.\n\nUse the test button for:\n- Regular user checks (recommended monthly)\n- Quick operational verification\n\nUse an RCD tester for:\n- Initial verification\n- Periodic inspection and testing\n- Testing disconnection times at rated residual current\n- Testing at 50% and 100% of rated current as required by regulations\n\nAlways record the results when using an RCD tester for formal verification."
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuestion.trim()) {
      toast({
        title: "Question Submitted",
        description: "Your question has been sent to verified supervisors for review.",
        variant: "success",
      });
      setQuestionSubmitted(true);
      setNewQuestion("");
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Ask a Supervisor</h1>
        <BackButton customUrl="/apprentice/on-job-tools" label="Back to Tools" />
      </div>
      
      <div className="bg-elec-gray p-4 sm:p-6 rounded-lg border border-elec-yellow/20">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="bg-elec-yellow/10 p-3 rounded-md">
            <HelpCircle size={36} className="text-elec-yellow" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2">Knowledge Bank</h2>
            <p className="text-muted-foreground">
              Access common questions and expert answers from site supervisors and qualified electricians. 
              Can't find what you're looking for? Submit your own question to be answered by verified mentors.
            </p>
          </div>
        </div>
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray/50">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Search className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Search FAQs</CardTitle>
          </div>
          <CardDescription>
            Search through common questions asked by apprentices on-site
          </CardDescription>
          <div className="pt-2">
            <Input 
              placeholder="Search questions..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-background/50"
            />
          </div>
        </CardHeader>
        <CardContent>
          {filteredFaqs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="whitespace-pre-wrap text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No matching questions found</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray/50">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Ask a Question</CardTitle>
          </div>
          <CardDescription>
            Submit your question to be answered by verified supervisors and mentors
          </CardDescription>
        </CardHeader>
        <CardContent>
          {questionSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <p className="text-lg font-medium">Your question has been submitted!</p>
              <p className="text-muted-foreground">
                Verified supervisors will review and answer your question. Check back soon.
              </p>
              <Button onClick={() => setQuestionSubmitted(false)}>Ask Another Question</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmitQuestion} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="question" className="block text-sm font-medium">
                  Your Question
                </label>
                <textarea 
                  id="question"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="w-full h-32 rounded-md border border-input bg-background/50 px-3 py-2 text-sm"
                  placeholder="Type your question here... Be as specific as possible"
                ></textarea>
              </div>
              <div className="pt-2">
                <Button type="submit" className="w-full">Submit Question</Button>
              </div>
              <p className="text-xs text-muted-foreground text-center pt-2">
                Questions are reviewed by qualified electricians and site supervisors
              </p>
            </form>
          )}
        </CardContent>
      </Card>

      <div className="bg-amber-950/20 border border-amber-600/30 rounded-md p-6">
        <h3 className="text-lg font-semibold text-elec-yellow mb-2">Coming Soon</h3>
        <p className="text-sm text-amber-200/90">
          Future expansion will allow verified mentors or supervisors to directly answer submitted questions
          through a dedicated portal. This feature is currently in development.
        </p>
      </div>
    </div>
  );
};

export default SupervisorKnowledge;
