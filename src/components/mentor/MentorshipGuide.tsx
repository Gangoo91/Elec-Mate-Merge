
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { ChevronDown, BookOpen, CheckCircle2, HelpCircle, Download } from "lucide-react";

const MentorshipGuide = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'start': true,
    'effective': false,
    'questions': false,
    'resources': false,
  });
  
  const toggleSection = (id: string) => {
    setOpenSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-elec-yellow" />
        <h2 className="text-2xl font-bold">Mentorship Guide</h2>
      </div>
      
      <p className="text-muted-foreground">
        This guide will help you make the most of your mentoring relationship.
        Expand each section to learn more about effective mentorship.
      </p>
      
      <Collapsible 
        open={openSections['start']} 
        onOpenChange={() => toggleSection('start')}
        className="w-full border rounded-lg overflow-hidden bg-elec-gray/50"
      >
        <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => toggleSection('start')}>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center">
              1
            </div>
            <h3 className="text-lg font-semibold">Getting Started with a Mentor</h3>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <ChevronDown 
                className={`h-4 w-4 transition-transform ${openSections['start'] ? "rotate-180" : ""}`} 
              />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="p-4 pt-0 border-t">
          <div className="space-y-4">
            <p>Building a successful mentorship relationship starts with clear communication and setting expectations.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 cursor-pointer hover:border-elec-yellow/50 transition-all">
                <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-500" /> Initial Introduction
                </h4>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• Share your current level and experience</li>
                  <li>• Explain your learning goals and objectives</li>
                  <li>• Discuss your preferred communication style</li>
                </ul>
              </Card>
              
              <Card className="p-4 cursor-pointer hover:border-elec-yellow/50 transition-all">
                <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-500" /> Setting Expectations
                </h4>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• Agree on meeting frequency and duration</li>
                  <li>• Establish communication channels</li>
                  <li>• Define what success looks like for both parties</li>
                </ul>
              </Card>
              
              <Button className="mt-2" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download First Meeting Template
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      <Collapsible 
        open={openSections['effective']} 
        onOpenChange={() => toggleSection('effective')}
        className="w-full border rounded-lg overflow-hidden bg-elec-gray/50"
      >
        <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => toggleSection('effective')}>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center">
              2
            </div>
            <h3 className="text-lg font-semibold">Being an Effective Mentee</h3>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <ChevronDown 
                className={`h-4 w-4 transition-transform ${openSections['effective'] ? "rotate-180" : ""}`} 
              />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="p-4 pt-0 border-t">
          <div className="space-y-4">
            <p>The most successful apprentices make the most of their mentorship by being proactive.</p>
            
            <div className="space-y-3">
              <Card className="p-4 cursor-pointer hover:border-elec-yellow/50 transition-all">
                <h4 className="font-medium mb-2">Come Prepared</h4>
                <p className="text-sm text-muted-foreground">
                  Always arrive to mentorship sessions with specific questions, topics to discuss, 
                  or challenges you're facing. This shows respect for your mentor's time and ensures 
                  you get the most value from each interaction.
                </p>
              </Card>
              
              <Card className="p-4 cursor-pointer hover:border-elec-yellow/50 transition-all">
                <h4 className="font-medium mb-2">Take Action on Advice</h4>
                <p className="text-sm text-muted-foreground">
                  When your mentor provides guidance or suggestions, implement them and report back 
                  on the results. This creates a feedback loop that leads to deeper learning and shows 
                  your commitment to growth.
                </p>
              </Card>
              
              <Card className="p-4 cursor-pointer hover:border-elec-yellow/50 transition-all">
                <h4 className="font-medium mb-2">Be Receptive to Feedback</h4>
                <p className="text-sm text-muted-foreground">
                  Approach criticism with openness and a growth mindset. Remember that your mentor's 
                  feedback is intended to help you improve, not to judge or criticize you personally.
                </p>
              </Card>
              
              <Button className="mt-2" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Mentee Checklist
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      <Collapsible 
        open={openSections['questions']} 
        onOpenChange={() => toggleSection('questions')}
        className="w-full border rounded-lg overflow-hidden bg-elec-gray/50"
      >
        <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => toggleSection('questions')}>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center">
              3
            </div>
            <h3 className="text-lg font-semibold">Questions to Ask Your Mentor</h3>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <ChevronDown 
                className={`h-4 w-4 transition-transform ${openSections['questions'] ? "rotate-180" : ""}`} 
              />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="p-4 pt-0 border-t">
          <div className="space-y-4">
            <p>
              Getting stuck on what to ask? Here are some effective questions organized by category that can 
              help drive meaningful conversations with your mentor.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Career Development</h4>
                <ul className="text-sm space-y-2 text-muted-foreground list-disc pl-5">
                  <li>What skills should I focus on developing at my current stage?</li>
                  <li>How did you navigate challenges similar to mine?</li>
                  <li>What certifications would be most valuable for my career path?</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Technical Skills</h4>
                <ul className="text-sm space-y-2 text-muted-foreground list-disc pl-5">
                  <li>Can you explain how you approach troubleshooting this type of issue?</li>
                  <li>What resources helped you learn this particular skill?</li>
                  <li>How do you stay updated with changing electrical codes?</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Workplace Navigation</h4>
                <ul className="text-sm space-y-2 text-muted-foreground list-disc pl-5">
                  <li>How do you handle difficult clients or colleagues?</li>
                  <li>What's your approach to work-life balance in this industry?</li>
                  <li>How do you manage time effectively on complex projects?</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Business Acumen</h4>
                <ul className="text-sm space-y-2 text-muted-foreground list-disc pl-5">
                  <li>What factors do you consider when quoting a job?</li>
                  <li>How did you build your professional network?</li>
                  <li>What business skills are most important for an electrician?</li>
                </ul>
              </div>
              
              <Button className="mt-2 sm:col-span-2" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download 50+ Questions Template
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      <Collapsible 
        open={openSections['resources']} 
        onOpenChange={() => toggleSection('resources')}
        className="w-full border rounded-lg overflow-hidden bg-elec-gray/50"
      >
        <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => toggleSection('resources')}>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center">
              4
            </div>
            <h3 className="text-lg font-semibold">Mentorship Resources</h3>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <ChevronDown 
                className={`h-4 w-4 transition-transform ${openSections['resources'] ? "rotate-180" : ""}`} 
              />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="p-4 pt-0 border-t">
          <div className="space-y-4">
            <p>Use these resources to enhance your mentoring experience:</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="p-4 cursor-pointer hover:border-elec-yellow/50 transition-all">
                <h4 className="font-medium mb-2">Progress Tracking Templates</h4>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>Document your journey and track improvements over time.</p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="h-3 w-3 mr-1" /> Download Templates
                  </Button>
                </div>
              </Card>
              
              <Card className="p-4 cursor-pointer hover:border-elec-yellow/50 transition-all">
                <h4 className="font-medium mb-2">Goal-Setting Framework</h4>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>SMART goals template specifically for electrical apprentices.</p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="h-3 w-3 mr-1" /> Download Framework
                  </Button>
                </div>
              </Card>
              
              <Card className="p-4 cursor-pointer hover:border-elec-yellow/50 transition-all">
                <h4 className="font-medium mb-2">Meeting Log Template</h4>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>Keep track of discussions and action items from each session.</p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="h-3 w-3 mr-1" /> Download Log
                  </Button>
                </div>
              </Card>
              
              <Card className="p-4 cursor-pointer hover:border-elec-yellow/50 transition-all">
                <h4 className="font-medium mb-2">Skill Assessment Checklist</h4>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>Track your progress against industry-standard competencies.</p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="h-3 w-3 mr-1" /> Download Checklist
                  </Button>
                </div>
              </Card>
            </div>
            
            <div className="mt-6 p-4 bg-blue-500/10 rounded-md border border-blue-500/20">
              <div className="flex items-start gap-3">
                <HelpCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-400">Need Help?</h4>
                  <p className="text-sm text-blue-400 mt-1">
                    If you have questions about how to use these resources or want additional guidance 
                    on making the most of your mentorship, contact our apprenticeship support team 
                    at <span className="underline">apprentice.support@elec-mate.co.uk</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
    </div>
  );
};

export default MentorshipGuide;
