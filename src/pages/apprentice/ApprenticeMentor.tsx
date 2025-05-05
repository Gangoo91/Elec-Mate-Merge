
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useMessenger } from "@/components/messenger/useMessenger";
import { supabase } from "@/integrations/supabase/client";

const ApprenticeMentor = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { addMentorConversation } = useMessenger();
  const [requestingMentor, setRequestingMentor] = useState<string | null>(null);
  const [mentors, setMentors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch mentors from Supabase
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('mentors')
          .select('*')
          .eq('is_active', true);
          
        if (error) throw error;
        
        setMentors(data || []);
      } catch (err) {
        console.error("Error fetching mentors:", err);
        setError("Failed to load mentors. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMentors();
  }, []);

  const handleConnectMentor = async (mentor) => {
    if (!profile?.id) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to connect with a mentor.",
        duration: 5000,
      });
      return;
    }
    
    setRequestingMentor(mentor.id);
    
    try {
      // Check if connection already exists
      const { data: existingConnection } = await supabase
        .from('mentor_connections')
        .select('id')
        .eq('apprentice_id', profile.id)
        .eq('mentor_id', mentor.id)
        .single();
      
      let connectionId;
      
      if (existingConnection) {
        connectionId = existingConnection.id;
      } else {
        // Create a new connection in Supabase
        const { data: newConnection, error } = await supabase
          .from('mentor_connections')
          .insert({
            apprentice_id: profile.id,
            mentor_id: mentor.id,
            status: 'pending'
          })
          .select('id')
          .single();
        
        if (error) throw error;
        connectionId = newConnection.id;
        
        // Create initial welcome message from mentor
        await supabase
          .from('mentor_messages')
          .insert({
            connection_id: connectionId,
            sender_type: 'mentor',
            sender_id: mentor.id,
            content: `Hi there! I'm ${mentor.name}, your new mentor. Feel free to ask me any questions about your electrical apprenticeship journey.`
          });
      }
      
      // Create a new conversation with this mentor in the messenger system
      const conversationId = addMentorConversation({
        mentorId: mentor.id,
        mentorName: mentor.name,
        mentorAvatar: mentor.avatar,
        dbConnectionId: connectionId
      });
      
      // Show success notification
      toast({
        title: "Mentoring Request Sent",
        description: `Your request to connect with ${mentor.name} has been sent successfully.`,
        duration: 5000,
      });
      
      // Navigate to the messenger with the conversation open
      navigate('/messages', { state: { conversationId } });
      
    } catch (err) {
      console.error("Error connecting with mentor:", err);
      toast({
        title: "Connection Failed",
        description: "There was a problem connecting with the mentor. Please try again later.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setRequestingMentor(null);
    }
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
            You can schedule one-to-one sessions, ask questions, or join group mentoring.
          </p>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-elec-yellow/20 border-t-elec-yellow rounded-full"></div>
        </div>
      ) : error ? (
        <Card className="border-red-500/20 bg-red-500/5 text-center p-6">
          <p className="text-lg font-medium">{error}</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </Card>
      ) : (
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
      )}
    </div>
  );
};

export default ApprenticeMentor;
