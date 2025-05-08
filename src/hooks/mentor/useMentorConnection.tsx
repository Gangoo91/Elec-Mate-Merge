
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useMessenger } from "@/components/messenger/useMessenger";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export const useMentorConnection = () => {
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
        setError("Failed to load available mentors. Please try again later.");
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
        description: "Please sign in to request mentorship.",
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
        .eq('mentor_id', mentor.id)
        .eq('apprentice_id', profile.id)
        .single();
      
      let connectionId;
      
      if (existingConnection) {
        connectionId = existingConnection.id;
      } else {
        // Create a new connection in Supabase
        const { data: newConnection, error } = await supabase
          .from('mentor_connections')
          .insert({
            mentor_id: mentor.id,
            apprentice_id: profile.id,
            status: 'pending'
          })
          .select('id')
          .single();
        
        if (error) throw error;
        connectionId = newConnection.id;
        
        // Create initial welcome message from apprentice
        await supabase
          .from('mentor_messages')
          .insert({
            connection_id: connectionId,
            sender_type: 'apprentice',
            sender_id: profile.id,
            content: `Hi, I'm ${profile.full_name || 'an apprentice electrician'}. I'd like to request your mentorship to help me during my apprenticeship journey.`
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
        title: "Mentorship Request Sent",
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

  return {
    mentors,
    isLoading,
    error,
    requestingMentor,
    handleConnectMentor
  };
};
