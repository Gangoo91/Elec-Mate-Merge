
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, MessageSquare, Calendar, CheckCircle } from "lucide-react";

const MentorshipGuide = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-elec-yellow" /> Preparing for Mentorship
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Make the most of your mentorship by setting clear goals and expectations from the beginning.
            </p>
            <ul className="text-sm space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Define what you want to learn</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Prepare specific questions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Be open to feedback</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-elec-yellow" /> Communication Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Effective communication is key to a successful mentoring relationship.
            </p>
            <ul className="text-sm space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Listen actively and take notes</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Ask clarifying questions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Follow up on advice received</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-elec-yellow" /> Session Planning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Structure your mentoring sessions to maximize learning and growth.
            </p>
            <ul className="text-sm space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Set regular meeting times</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Create an agenda for each session</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Review previous learning points</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-elec-gray rounded-lg border border-elec-yellow/20 p-6">
        <h3 className="text-xl font-semibold mb-4">Mentorship FAQs</h3>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How long should a mentorship last?</AccordionTrigger>
            <AccordionContent>
              Mentorship duration varies based on your needs. Many successful mentorships last 6-12 months, with regular meetings (weekly or fortnightly). However, some apprentices maintain relationships with their mentors throughout their entire apprenticeship and beyond.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger>What if my mentor and I aren't a good match?</AccordionTrigger>
            <AccordionContent>
              Chemistry in mentoring relationships matters. If after 2-3 sessions you feel the mentorship isn't working, it's perfectly acceptable to politely end the relationship and look for another mentor. You can use the "End Mentorship" option in your messages with the mentor.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger>What topics should I discuss with my mentor?</AccordionTrigger>
            <AccordionContent>
              Focus on technical skills, career guidance, workplace challenges, industry best practices, and preparation for assessments. Your mentor can also provide insights into specializations within electrical work and help you build your professional network.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4">
            <AccordionTrigger>How do I track my mentorship hours?</AccordionTrigger>
            <AccordionContent>
              All mentorship sessions are automatically logged in your apprenticeship record when conducted through our platform. For offline sessions, you can manually log them in your Digital Logbook. These hours count toward your professional development requirements.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-5">
            <AccordionTrigger>Can I have more than one mentor?</AccordionTrigger>
            <AccordionContent>
              Yes, you can connect with multiple mentors who specialize in different areas. Having mentors with diverse expertise can provide you with a well-rounded apprenticeship experience and expose you to different perspectives and specializations.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div className="bg-blue-500/10 rounded-lg border border-blue-500/20 p-6">
        <h3 className="text-xl font-semibold mb-3 text-blue-400">Additional Resources</h3>
        <p className="text-sm mb-4 text-blue-300">
          Enhance your mentorship experience with these additional resources designed to help you make the most of your mentor relationships.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Button variant="outline" className="justify-start text-left border-blue-500/20 hover:bg-blue-500/5">
            <BookOpen className="h-4 w-4 mr-2" />
            <div>
              <p className="font-medium">Mentorship Workbook</p>
              <p className="text-xs text-muted-foreground">Track your progress and set goals</p>
            </div>
          </Button>
          
          <Button variant="outline" className="justify-start text-left border-blue-500/20 hover:bg-blue-500/5">
            <Calendar className="h-4 w-4 mr-2" />
            <div>
              <p className="font-medium">Session Planner Template</p>
              <p className="text-xs text-muted-foreground">Structure your mentoring meetings</p>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MentorshipGuide;
