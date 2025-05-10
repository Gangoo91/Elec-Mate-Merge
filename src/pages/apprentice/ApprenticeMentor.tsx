
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MentorIntroCard from "@/components/mentor/MentorIntroCard";
import MentorGrid from "@/components/mentor/MentorGrid";
import { useMentorConnection } from "@/hooks/mentor/useMentorConnection";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { Users, ChevronLeft, BookOpen, MessageSquare, ChevronDown } from "lucide-react";
import MentorshipGuide from "@/components/mentor/MentorshipGuide";
import FeaturedMentors from "@/components/mentor/FeaturedMentors";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

const ApprenticeMentor = () => {
  const { 
    mentors, 
    isLoading, 
    error, 
    requestingMentor, 
    handleConnectMentor, 
    featuredMentors 
  } = useMentorConnection();
  
  const [activeSection, setActiveSection] = useState("browse");
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const isMobile = useIsMobile();

  const renderActiveContent = () => {
    switch (activeSection) {
      case "browse":
        return (
          <div className="space-y-6 animate-fade-in">
            {featuredMentors && featuredMentors.length > 0 && (
              <>
                <h2 className="text-xl font-semibold">Featured Mentors</h2>
                <FeaturedMentors 
                  mentors={featuredMentors} 
                  requestingMentor={requestingMentor}
                  onConnectMentor={handleConnectMentor}
                />
                <Separator className="my-6" />
              </>
            )}
            
            <h2 className="text-xl font-semibold">All Available Mentors</h2>
            <MentorGrid 
              mentors={mentors}
              isLoading={isLoading}
              error={error}
              requestingMentor={requestingMentor}
              onConnectMentor={handleConnectMentor}
            />
          </div>
        );
        
      case "guide":
        return <MentorshipGuide />;
        
      case "about":
        return (
          <div className="space-y-6">
            <MentorIntroCard />
            <div className="bg-elec-gray p-6 rounded-lg border border-elec-yellow/20">
              <h3 className="text-xl font-semibold mb-3">How Mentoring Works for Apprentices</h3>
              <ol className="list-decimal pl-5 space-y-3">
                <li>Browse available mentors and find someone whose expertise matches your learning needs</li>
                <li>Request mentorship by clicking "Request Mentorship"</li>
                <li>Once accepted, you'll be able to message your mentor directly</li>
                <li>Schedule one-on-one sessions or ask questions through the messaging system</li>
                <li>Track your mentored hours which count toward your apprenticeship requirements</li>
              </ol>
              <div className="mt-6 p-4 bg-blue-500/10 rounded-md border border-blue-500/20">
                <p className="text-sm text-blue-400">
                  <strong>Pro Tip:</strong> Come prepared with specific questions or topics you'd like guidance on to make the most of your mentorship sessions.
                </p>
              </div>
              
              <div className="mt-6 p-4 bg-green-500/10 rounded-md border border-green-500/20">
                <h4 className="font-semibold text-green-400 mb-2">Apprentice Benefits</h4>
                <p className="text-sm text-green-400">
                  Apprentices who actively engage with mentors typically complete their qualifications 30% faster and report higher job satisfaction. Your mentor can provide invaluable real-world advice that goes beyond textbook learning.
                </p>
              </div>
            </div>
            <Collapsible open={isInfoOpen} onOpenChange={setIsInfoOpen} className="w-full">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Mentorship Workbook</h3>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9 p-0">
                    <ChevronDown className={`h-4 w-4 transition-transform ${isInfoOpen ? "rotate-180" : ""}`} />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="mt-4 p-4 border rounded-lg">
                <div className="space-y-4">
                  <p className="text-sm">
                    Use this workbook to track your goals and progress with your mentor:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border p-3 rounded-md hover:border-elec-yellow/50 cursor-pointer transition-all">
                      <h4 className="font-medium text-sm">Goal Setting Template</h4>
                      <p className="text-xs text-muted-foreground">Define your short and long-term apprenticeship goals</p>
                    </div>
                    <div className="border p-3 rounded-md hover:border-elec-yellow/50 cursor-pointer transition-all">
                      <h4 className="font-medium text-sm">Session Planner</h4>
                      <p className="text-xs text-muted-foreground">Plan topics for your next mentoring session</p>
                    </div>
                    <div className="border p-3 rounded-md hover:border-elec-yellow/50 cursor-pointer transition-all">
                      <h4 className="font-medium text-sm">Learning Journal</h4>
                      <p className="text-xs text-muted-foreground">Document key insights from each mentoring session</p>
                    </div>
                    <div className="border p-3 rounded-md hover:border-elec-yellow/50 cursor-pointer transition-all">
                      <h4 className="font-medium text-sm">Skill Progress Tracker</h4>
                      <p className="text-xs text-muted-foreground">Track improvement in specific electrical skills</p>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        );
        
      default:
        return <div>Select a section</div>;
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Users className="h-6 w-6 text-elec-yellow" /> Find a Mentor
          </h1>
          <p className="text-muted-foreground">
            Connect with experienced electricians who can guide you through your apprenticeship journey
          </p>
        </div>
        <Link to="/apprentice/hub">
          <Button variant="outline" size="sm">
            <ChevronLeft className="mr-1 h-4 w-4" /> Back to Apprentice Hub
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <Select value={activeSection} onValueChange={setActiveSection}>
          <SelectTrigger className="w-full sm:w-[300px]">
            <SelectValue placeholder="Select a section" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="browse">
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                <span>Find Mentors</span>
              </div>
            </SelectItem>
            <SelectItem value="guide">
              <div className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4" />
                <span>Mentorship Guide</span>
              </div>
            </SelectItem>
            <SelectItem value="about">
              <div className="flex items-center">
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>About Mentoring</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {renderActiveContent()}
    </div>
  );
};

export default ApprenticeMentor;
