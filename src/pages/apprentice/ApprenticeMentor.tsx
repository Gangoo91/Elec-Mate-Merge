
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MentorIntroCard from "@/components/mentor/MentorIntroCard";
import MentorGrid from "@/components/mentor/MentorGrid";
import { useMentorConnection } from "@/hooks/mentor/useMentorConnection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, ChevronLeft } from "lucide-react";

const ApprenticeMentor = () => {
  const { mentors, isLoading, error, requestingMentor, handleConnectMentor } = useMentorConnection();

  return (
    <div className="space-y-8 animate-fade-in">
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

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="browse">Find Mentors</TabsTrigger>
          <TabsTrigger value="about">About Mentoring</TabsTrigger>
        </TabsList>
        <TabsContent value="browse" className="space-y-6">
          <MentorGrid 
            mentors={mentors}
            isLoading={isLoading}
            error={error}
            requestingMentor={requestingMentor}
            onConnectMentor={handleConnectMentor}
          />
        </TabsContent>
        <TabsContent value="about">
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
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApprenticeMentor;
