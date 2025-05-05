
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useMessenger } from "@/components/messenger/useMessenger";

const ApprenticeMentor = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { addMentorConversation } = useMessenger();
  const [requestingMentor, setRequestingMentor] = useState<number | null>(null);

  const mentors = [
    {
      id: 1,
      name: "Sarah Williams",
      specialty: "Commercial Electrical",
      experience: "15 years",
      availability: "Available",
      avatar: "SW"
    },
    {
      id: 2,
      name: "David Chen",
      specialty: "Industrial Systems",
      experience: "12 years",
      availability: "Available next week",
      avatar: "DC"
    },
    {
      id: 3,
      name: "Michael Rodriguez",
      specialty: "Renewable Energy",
      experience: "10 years",
      availability: "Limited availability",
      avatar: "MR"
    },
    {
      id: 4,
      name: "Emma Thompson",
      specialty: "Residential Wiring",
      experience: "8 years",
      availability: "Available",
      avatar: "ET"
    }
  ];

  const handleConnectMentor = (mentor) => {
    setRequestingMentor(mentor.id);
    
    // Simulate a delay to show loading state
    setTimeout(() => {
      // Create a new conversation with this mentor in the messenger system
      const conversationId = addMentorConversation({
        mentorId: `mentor-${mentor.id}`,
        mentorName: mentor.name,
        mentorAvatar: mentor.avatar
      });

      setRequestingMentor(null);
      
      // Show success notification
      toast({
        title: "Mentoring Request Sent",
        description: `Your request to connect with ${mentor.name} has been sent successfully.`,
        duration: 5000,
      });
      
      // Navigate to the messenger with the conversation open
      navigate('/messages', { state: { conversationId } });
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mentor Connect</h1>
          <p className="text-muted-foreground">
            Connect with industry mentors and experienced professionals for guidance
          </p>
        </div>
        <Link to="/apprentice">
          <Button variant="outline">Back to Apprentice Hub</Button>
        </Link>
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-elec-yellow" />
            Find Your Mentor
          </CardTitle>
          <CardDescription>
            A good mentor can make all the difference in your apprenticeship journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Browse our network of experienced electricians who volunteer their time to support apprentices. 
            You can schedule one-on-one sessions, ask questions, or join group mentoring.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mentors.map((mentor) => (
          <Card key={mentor.id} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border-2 border-elec-yellow/50">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-elec-yellow/20 text-elec-yellow">
                    {mentor.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl">{mentor.name}</CardTitle>
                  <CardDescription className="text-sm">{mentor.specialty}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                <div>
                  <p className="text-muted-foreground">Experience</p>
                  <p className="font-medium">{mentor.experience}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Availability</p>
                  <p className="font-medium">{mentor.availability}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                onClick={() => handleConnectMentor(mentor)}
                disabled={requestingMentor === mentor.id}
              >
                {requestingMentor === mentor.id ? 'Connecting...' : 'Request Mentoring'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ApprenticeMentor;
