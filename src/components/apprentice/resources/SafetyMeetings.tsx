
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const SafetyMeetings = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 animate-fade-in">
      {/* Back button */}
      <Link to="/apprentice/study/eal/level-2-diploma-in-electrical-installation/unit/elec2-01/section/2/subsection/2.3">
        <Button variant="outline" className="mb-8 border-elec-yellow/30 hover:bg-elec-yellow/10">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Safety Communication
        </Button>
      </Link>
      
      {/* Main content */}
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-elec-yellow mb-2">
            Safety Meeting Structure Guide
          </h1>
          <p className="text-elec-light/80 max-w-2xl mx-auto">
            Well-structured safety meetings maintain awareness and ensure all workers stay updated with critical safety information.
          </p>
        </div>
        
        {/* Content sections */}
        <div className="space-y-6">
          <section className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4">Types of Safety Meetings</h2>
            <div className="space-y-4">
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">Daily Toolbox Talks (5-15 minutes)</h3>
                <ul className="list-disc pl-6 space-y-1 text-elec-light/90">
                  <li>Focus on immediate daily tasks and hazards</li>
                  <li>Conducted at the start of each shift</li>
                  <li>Led by site supervisor or foreman</li>
                  <li>Topics directly relevant to the day's work</li>
                </ul>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">Weekly Safety Meetings (15-30 minutes)</h3>
                <ul className="list-disc pl-6 space-y-1 text-elec-light/90">
                  <li>Review of the week's incidents or near-misses</li>
                  <li>Discussion of upcoming work and associated risks</li>
                  <li>Focus on one specific safety topic in depth</li>
                  <li>Opportunity for workers to raise safety concerns</li>
                </ul>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">Monthly Safety Committee Meetings (30-60 minutes)</h3>
                <ul className="list-disc pl-6 space-y-1 text-elec-light/90">
                  <li>Formal review of safety performance metrics</li>
                  <li>Discussion of ongoing safety initiatives</li>
                  <li>Review of regulatory changes or updates</li>
                  <li>Planning for safety training and improvements</li>
                </ul>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">Emergency Response Drills (varies)</h3>
                <ul className="list-disc pl-6 space-y-1 text-elec-light/90">
                  <li>Practical exercises testing emergency procedures</li>
                  <li>Immediate debrief and feedback session</li>
                  <li>Identification of improvements needed</li>
                  <li>Assignment of corrective actions</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4">Effective Meeting Structure</h2>
            <ol className="list-decimal pl-6 space-y-4 text-elec-light/90">
              <li>
                <p className="font-medium text-elec-yellow">Opening (1-2 minutes)</p>
                <ul className="list-disc pl-6 mt-1">
                  <li>Welcome participants and take attendance</li>
                  <li>State the meeting purpose and agenda</li>
                  <li>Set expectations for participation</li>
                </ul>
              </li>
              
              <li>
                <p className="font-medium text-elec-yellow">Review (3-5 minutes)</p>
                <ul className="list-disc pl-6 mt-1">
                  <li>Recap previous safety points or concerns</li>
                  <li>Update on any action items from previous meetings</li>
                  <li>Review recent incidents or near-misses</li>
                </ul>
              </li>
              
              <li>
                <p className="font-medium text-elec-yellow">Main Topic Discussion (5-15 minutes)</p>
                <ul className="list-disc pl-6 mt-1">
                  <li>Present the main safety topic with clear information</li>
                  <li>Use visual aids when possible</li>
                  <li>Relate the topic to current work activities</li>
                  <li>Include real examples or case studies</li>
                </ul>
              </li>
              
              <li>
                <p className="font-medium text-elec-yellow">Interactive Element (5-10 minutes)</p>
                <ul className="list-disc pl-6 mt-1">
                  <li>Demonstration of proper techniques or equipment</li>
                  <li>Guided discussion or Q&A session</li>
                  <li>Brief practical exercise when applicable</li>
                </ul>
              </li>
              
              <li>
                <p className="font-medium text-elec-yellow">Open Forum (3-5 minutes)</p>
                <ul className="list-disc pl-6 mt-1">
                  <li>Invite workers to raise safety concerns</li>
                  <li>Discuss potential hazards identified by the team</li>
                  <li>Gather suggestions for safety improvements</li>
                </ul>
              </li>
              
              <li>
                <p className="font-medium text-elec-yellow">Action Items & Closure (2-3 minutes)</p>
                <ul className="list-disc pl-6 mt-1">
                  <li>Summarize key points discussed</li>
                  <li>Assign any action items with clear responsibilities</li>
                  <li>Preview the next meeting topic</li>
                  <li>Thank participants and close the meeting</li>
                </ul>
              </li>
            </ol>
          </section>
          
          <section className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4">Meeting Documentation</h2>
            <p className="mb-4">Every safety meeting should be documented to track attendance and content covered:</p>
            <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10 space-y-3">
              <p className="font-medium text-elec-yellow">Essential Documentation Elements:</p>
              <ul className="list-disc pl-6 text-elec-light/90">
                <li>Date, time, and location of meeting</li>
                <li>List of attendees (with signatures when possible)</li>
                <li>Meeting leader name</li>
                <li>Topics discussed</li>
                <li>Key points covered</li>
                <li>Questions raised</li>
                <li>Action items assigned (with responsible persons and deadlines)</li>
                <li>Planned date for next meeting</li>
              </ul>
            </div>
          </section>
          
          <section className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4">Best Practices for Engaging Safety Meetings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <p className="font-medium text-elec-yellow mb-2">Keep It Relevant</p>
                <p className="text-elec-light/90">Focus on topics directly applicable to current work tasks and actual conditions on site.</p>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <p className="font-medium text-elec-yellow mb-2">Use Visual Aids</p>
                <p className="text-elec-light/90">Include photos, diagrams, or actual equipment to illustrate key points and improve retention.</p>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <p className="font-medium text-elec-yellow mb-2">Encourage Participation</p>
                <p className="text-elec-light/90">Ask questions, invite experiences, and create an environment where workers feel comfortable contributing.</p>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <p className="font-medium text-elec-yellow mb-2">Rotate Leadership</p>
                <p className="text-elec-light/90">Allow different team members to lead meetings to increase engagement and develop safety leadership.</p>
              </div>
            </div>
          </section>
        </div>
        
        {/* Resources */}
        <div className="bg-elec-dark/70 p-6 rounded-lg border border-elec-yellow/20 mt-8">
          <h2 className="text-xl font-semibold text-elec-yellow mb-4">Meeting Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-elec-dark/30 rounded-md">
              <FileText className="text-elec-yellow h-5 w-5" />
              <span>Toolbox Talk Templates</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-elec-dark/30 rounded-md">
              <FileText className="text-elec-yellow h-5 w-5" />
              <span>Safety Meeting Attendance Log</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-elec-dark/30 rounded-md">
              <FileText className="text-elec-yellow h-5 w-5" />
              <span>Monthly Safety Topics Calendar</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-elec-dark/30 rounded-md">
              <FileText className="text-elec-yellow h-5 w-5" />
              <span>Safety Meeting Evaluation Form</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyMeetings;
