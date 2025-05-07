
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
            <Users className="h-6 w-6 text-elec-yellow" /> Mentor Connect
          </h1>
          <p className="text-muted-foreground">
            Find apprentices seeking guidance or become a mentor to earn rewards
          </p>
        </div>
        <Link to="/electrical-hub">
          <Button variant="outline" size="sm">
            <ChevronLeft className="mr-1 h-4 w-4" /> Back to Electrical Hub
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="browse">Apprentices Seeking Mentors</TabsTrigger>
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
              <h3 className="text-xl font-semibold mb-3">How Mentoring Works</h3>
              <ol className="list-decimal pl-5 space-y-3">
                <li>Browse apprentices seeking guidance and find someone whose learning goals match your expertise</li>
                <li>Offer your mentoring by clicking "Offer Mentoring"</li>
                <li>Once accepted, you'll be able to message your apprentice directly</li>
                <li>Schedule one-on-one sessions or answer questions through the messaging system</li>
                <li>Track your mentoring hours which count toward your professional development</li>
              </ol>
              <div className="mt-6 p-4 bg-blue-500/10 rounded-md border border-blue-500/20">
                <p className="text-sm text-blue-400">
                  <strong>Pro Tip:</strong> Regular mentoring sessions lead to better outcomes. Try to schedule consistent weekly check-ins with your apprentices.
                </p>
              </div>
              
              <div className="mt-6 p-4 bg-green-500/10 rounded-md border border-green-500/20">
                <h4 className="font-semibold text-green-400 mb-2">Mentor Rewards Program</h4>
                <p className="text-sm text-green-400">
                  Each month, the highest-rated mentor will receive a <strong>£50 tools voucher</strong> as recognition for their commitment to developing the next generation of electricians. Ratings are based on apprentice feedback and session quality.
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
