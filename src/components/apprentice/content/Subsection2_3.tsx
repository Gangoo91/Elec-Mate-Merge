
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Megaphone, MessageSquare, ShieldAlert } from "lucide-react";
import { SubsectionProps } from "./subsection1_1/types";
import CourseContentSection from "../CourseContentSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent } from "@/components/ui/card";

const Subsection2_3 = ({ 
  subsectionId, 
  isCompleted, 
  markAsComplete 
}: SubsectionProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-6 mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-elec-yellow text-center">Safety Communication Systems</h2>
      
      <Accordion type="single" collapsible defaultValue="overview" className="space-y-4">
        {/* Overview Section */}
        <AccordionItem value="overview" className="border-none">
          <Card className="bg-elec-dark/80 border-elec-yellow/30">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center">
                <h3 className="text-lg sm:text-xl text-elec-yellow font-medium">Overview</h3>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <CardContent className="px-4 pb-4 pt-2">
                <CourseContentSection
                  title="Safety Communication Systems"
                  description="Effective safety communication is vital to preventing accidents in electrical work. Clear communication ensures hazards are reported promptly and safety information reaches everyone who needs it. Communication structures should include clear reporting hierarchies, emergency communication procedures, designated safety representatives, feedback loops, and cross-team communication methods. Various communication methods should be employed, including toolbox talks, safety briefings, visual communication, digital tools, and anonymous reporting channels. Regular safety meetings with a structured format help maintain safety awareness and address emerging concerns. Communication must be inclusive, considering language needs, literacy levels, accessibility, and cultural factors."
                  keyPoints={[
                    "Clear communication structures prevent accidents by ensuring hazards are reported promptly",
                    "Multiple communication methods reach different people effectively",
                    "Regular structured safety meetings maintain awareness and address concerns",
                    "Inclusive communication considers language, literacy, and cultural factors",
                    "Effective communication must lead to appropriate action"
                  ]}
                  icon="info"
                  subsectionId={subsectionId}
                />
              </CardContent>
            </AccordionContent>
          </Card>
        </AccordionItem>

        {/* Communication Structures Section */}
        <AccordionItem value="structures" className="border-none">
          <Card className="bg-elec-dark/80 border-elec-yellow/30">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-elec-yellow" />
                <h3 className="text-lg sm:text-xl font-medium">Communication Structures</h3>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <CardContent className="px-4 pb-4 pt-2">
                <div className="space-y-4 text-center">
                  <p className="text-sm md:text-base">
                    Organized systems for safety information flow:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <Card className="border-elec-yellow/20 bg-elec-dark/30">
                      <CardContent className="p-3">
                        <h4 className="font-semibold text-white mb-2">Reporting Hierarchies</h4>
                        <p className="text-sm">
                          Clear chains of communication for different types of safety concerns. Everyone should know who to report to for various issues, and backup contacts should be established.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-elec-yellow/20 bg-elec-dark/30">
                      <CardContent className="p-3">
                        <h4 className="font-semibold text-white mb-2">Emergency Communication</h4>
                        <p className="text-sm">
                          Procedures for immediate response to serious hazards. These should be simple, practiced regularly, and include multiple communication methods in case primary systems fail.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-elec-yellow/20 bg-elec-dark/30">
                      <CardContent className="p-3">
                        <h4 className="font-semibold text-white mb-2">Safety Representatives</h4>
                        <p className="text-sm">
                          Designated individuals to facilitate safety communication. They serve as points of contact for safety concerns and help ensure information flows in both directions.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-elec-yellow/20 bg-elec-dark/30">
                      <CardContent className="p-3">
                        <h4 className="font-semibold text-white mb-2">Feedback Loops</h4>
                        <p className="text-sm">
                          Systems to ensure reported issues are addressed and reporters informed. This maintains trust in the communication system and encourages continued reporting.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </AccordionContent>
          </Card>
        </AccordionItem>

        {/* Communication Methods Section */}
        <AccordionItem value="methods" className="border-none">
          <Card className="bg-elec-dark/80 border-elec-yellow/30">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center">
                <Megaphone className="h-5 w-5 mr-2 text-elec-yellow" />
                <h3 className="text-lg sm:text-xl font-medium">Communication Methods</h3>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <CardContent className="px-4 pb-4 pt-2">
                <div className="space-y-4 text-center">
                  <p className="text-sm md:text-base">
                    Effective approaches to delivering safety messages:
                  </p>
                  
                  <Card className="border-elec-yellow/20 bg-elec-dark/30">
                    <CardContent className="p-4">
                      <ul className="list-disc pl-5 space-y-2 mx-auto max-w-lg text-left">
                        <li>
                          <span className="font-medium text-white">Toolbox Talks</span>
                          <p className="text-sm mt-1">Brief, focused discussions on specific safety topics before work begins. These should be relevant to the day's tasks and current site conditions.</p>
                        </li>
                        <li>
                          <span className="font-medium text-white">Safety Briefings</span>
                          <p className="text-sm mt-1">More detailed sessions when tasks change or new hazards emerge. These provide comprehensive information about potential risks and control measures.</p>
                        </li>
                        <li>
                          <span className="font-medium text-white">Visual Communication</span>
                          <p className="text-sm mt-1">Signage, color coding, and warning systems in work areas. Visual cues provide immediate reminders of hazards and required precautions.</p>
                        </li>
                        <li>
                          <span className="font-medium text-white">Digital Tools</span>
                          <p className="text-sm mt-1">Apps, messaging systems, and alerts for immediate hazard notification. These can reach multiple workers simultaneously and provide documentation of communication.</p>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </AccordionContent>
          </Card>
        </AccordionItem>

        {/* Safety Meeting Structure */}
        <AccordionItem value="meetings" className="border-none">
          <Card className="bg-elec-dark/80 border-elec-yellow/30">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center">
                <ShieldAlert className="h-5 w-5 mr-2 text-elec-yellow" />
                <h3 className="text-lg sm:text-xl font-medium">Safety Meeting Structure</h3>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <CardContent className="px-4 pb-4 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left">
                  <Card className="border-elec-yellow/20 bg-elec-dark/30">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Meeting Components:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm mx-auto text-left">
                        <li>Regular schedule (weekly or bi-weekly)</li>
                        <li>Clear agenda covering key safety topics</li>
                        <li>Review of recent incidents or near-misses</li>
                        <li>Discussion of upcoming work and associated risks</li>
                        <li>Time for questions and open discussion</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-elec-yellow/20 bg-elec-dark/30">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Inclusive Communication:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm mx-auto text-left">
                        <li>Materials in languages understood by all workers</li>
                        <li>Visual aids for those with limited reading ability</li>
                        <li>Accessibility considerations for people with disabilities</li>
                        <li>Cultural sensitivity in communication approaches</li>
                        <li>Verification that messages have been understood</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="mt-4 bg-elec-dark/70 border-elec-yellow/20 mx-auto max-w-lg">
                  <CardContent className="p-4">
                    <p className="font-medium mb-1 text-elec-yellow">Important Note:</p>
                    <p className="text-sm">Communication is only effective if it leads to action. Always include clear instructions about what workers should do with the information provided, and check that appropriate actions are being taken. Create a culture where safety communication is valued and acted upon at all levels of the organization.</p>
                  </CardContent>
                </Card>
              </CardContent>
            </AccordionContent>
          </Card>
        </AccordionItem>
      </Accordion>
      
      <Card className="bg-elec-dark/80 border-elec-yellow/20 mx-auto">
        <CardContent className="p-4 flex justify-center">
          <Button
            variant="study"
            className={`${isCompleted ? 'bg-green-600/20 border-green-500/50 text-green-400' : 'hover:bg-elec-yellow hover:text-elec-dark'}`}
            onClick={markAsComplete}
            disabled={isCompleted}
          >
            {isCompleted ? 'Completed' : 'Mark as Complete'}
            {isCompleted && <CheckCircle className="ml-2 h-4 w-4" />}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Subsection2_3;
