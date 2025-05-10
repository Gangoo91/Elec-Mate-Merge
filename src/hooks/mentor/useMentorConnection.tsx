
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useMessenger } from "@/components/messenger/useMessenger";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

// Define an interface for the mentor data from Supabase
interface MentorData {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  availability: string;
  avatar?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  is_featured?: boolean; // Make is_featured optional since it may not exist in the database
}

// Define an enhanced mentor type with additional client-side properties
interface EnhancedMentor extends MentorData {
  rating: number;
  responseTime: string;
  is_featured: boolean; // This will always be defined after enhancement
}

export const useMentorConnection = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { addMentorConversation } = useMessenger();
  const [requestingMentor, setRequestingMentor] = useState<string | null>(null);
  const [mentors, setMentors] = useState<EnhancedMentor[]>([]);
  const [featuredMentors, setFeaturedMentors] = useState<EnhancedMentor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [skillFilter, setSkillFilter] = useState<string>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');

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
        
        if (data) {
          // Add some mock ratings for demo purposes
          const enhancedData: EnhancedMentor[] = data.map((mentor: MentorData) => ({
            ...mentor,
            rating: Math.floor(Math.random() * 2) + 4, // Random rating 4-5
            responseTime: ['Within 24h', 'Same day', '1-2 days'][Math.floor(Math.random() * 3)],
            // Add is_featured property with a default value if it doesn't exist
            is_featured: mentor.is_featured || false
          }));
          
          // Filter featured mentors
          const featured = enhancedData.filter((m) => m.is_featured);
          setFeaturedMentors(featured);
          
          // Set all mentors
          setMentors(enhancedData);
        }
      } catch (err) {
        console.error("Error fetching mentors:", err);
        setError("Failed to load apprentices seeking mentorship. Please try again later.");
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
        description: "Please sign in to connect with an apprentice.",
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
        .eq('apprentice_id', mentor.id)
        .eq('mentor_id', profile.id)
        .single();
      
      let connectionId;
      
      if (existingConnection) {
        connectionId = existingConnection.id;
      } else {
        // Create a new connection in Supabase
        const { data: newConnection, error } = await supabase
          .from('mentor_connections')
          .insert({
            apprentice_id: mentor.id,
            mentor_id: profile.id,
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
            sender_id: profile.id,
            content: `Hi there! I'm ${profile.full_name || 'your new mentor'}. I'd be happy to provide guidance during your electrical apprenticeship journey.`
          });
      }
      
      // Create a new conversation with this mentor in the messenger system
      const conversationId = addMentorConversation({
        mentorId: profile.id,
        mentorName: profile.full_name || 'Your Mentor',
        mentorAvatar: profile.avatar_url,
        dbConnectionId: connectionId
      });
      
      // Show success notification
      toast({
        title: "Mentoring Offer Sent",
        description: `Your offer to mentor ${mentor.name} has been sent successfully.`,
        duration: 5000,
      });
      
      // Navigate to the messenger with the conversation open
      navigate('/messages', { state: { conversationId } });
      
    } catch (err) {
      console.error("Error connecting with apprentice:", err);
      toast({
        title: "Connection Failed",
        description: "There was a problem connecting with the apprentice. Please try again later.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setRequestingMentor(null);
    }
  };

  return {
    mentors,
    featuredMentors,
    isLoading,
    error,
    requestingMentor,
    handleConnectMentor,
    skillFilter,
    setSkillFilter,
    availabilityFilter,
    setAvailabilityFilter
  };
};
