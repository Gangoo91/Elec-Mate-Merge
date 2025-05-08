
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, UserPlus, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface MentalHealthMateProps {
  onBecomeMate?: () => void;
}

const MentalHealthMate = ({ onBecomeMate }: MentalHealthMateProps) => {
  const [isVolunteer, setIsVolunteer] = useState(false);
  const [availableMates, setAvailableMates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, profile } = useAuth();

  useEffect(() => {
    // Check if user is already a mental health mate
    if (user?.id) {
      // For now, we'll use mock data until the mental_health_mates table is created
      checkVolunteerStatus();
      fetchAvailableMates();
    } else {
      setIsLoading(false);
    }
  }, [user?.id]);

  // Mock implementation until the mental_health_mates table is created
  const checkVolunteerStatus = async () => {
    try {
      // Mock data for demo purposes
      const isAlreadyVolunteer = localStorage.getItem(`mental_health_mate_${user?.id}`) === 'true';
      setIsVolunteer(isAlreadyVolunteer);
    } catch (error) {
      console.error("Error checking volunteer status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAvailableMates = async () => {
    try {
      // Mock data for demo purposes
      const mockMates = [
        {
          id: 'mate-1',
          userId: 'user-1',
          name: 'John Smith',
          role: 'Master Electrician',
          status: 'Available',
          avatar: null
        },
        {
          id: 'mate-2',
          userId: 'user-2',
          name: 'Sarah Jones',
          role: 'Electrical Engineer',
          status: 'Available',
          avatar: null
        },
        {
          id: 'mate-3',
          userId: 'user-3',
          name: 'Michael Brown',
          role: 'Apprentice Electrician',
          status: 'Available',
          avatar: null
        }
      ];
      
      setAvailableMates(mockMates);
    } catch (error) {
      console.error("Error fetching mental health mates:", error);
    }
  };

  const handleBecomeMate = async () => {
    if (!user) {
      toast.error("You must be signed in to become a Mental Health Mate.");
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Mock data for demo purposes
      localStorage.setItem(`mental_health_mate_${user.id}`, 'true');
      setIsVolunteer(true);
      
      toast.success("Thank you for becoming a Mental Health Mate!", {
        description: "You are now available to help others in need.",
      });
      
      if (onBecomeMate) {
        onBecomeMate();
      }

      // Refresh the list of available mates
      fetchAvailableMates();
    } catch (error) {
      console.error("Error registering as mental health mate:", error);
      toast.error("There was a problem registering you as a Mental Health Mate. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (status: 'Available' | 'Busy' | 'Unavailable') => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      // Mock data storage for demo purposes
      localStorage.setItem(`mental_health_mate_status_${user.id}`, status);
      
      toast.success(`Status updated to ${status}`);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("There was a problem updating your status.");
    } finally {
      setIsLoading(false);
      fetchAvailableMates();
    }
  };

  return (
    <Card className="border-purple-500/20 bg-elec-gray overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-500/10 to-transparent border-b border-purple-500/10 pb-3">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <Users className="h-5 w-5 text-purple-400" />
          Mental Health Mate
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Connect with fellow professionals who volunteer to provide peer support
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {!isVolunteer ? (
          <div className="bg-purple-500/5 border border-purple-500/10 rounded-lg p-3 sm:p-4 text-center space-y-3 sm:space-y-4">
            <UserPlus className="h-8 w-8 sm:h-10 sm:w-10 text-purple-400 mx-auto opacity-80" />
            <h3 className="font-medium text-base sm:text-lg">Become a Mental Health Mate</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Volunteer to be available for other electrical professionals who need someone to talk to
            </p>
            <Button 
              onClick={handleBecomeMate}
              className="bg-purple-500 hover:bg-purple-600 text-white text-sm w-full sm:w-auto"
              size="sm"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Sign Up as a Volunteer"}
            </Button>
          </div>
        ) : (
          <div className="bg-purple-500/5 border border-purple-500/10 rounded-lg p-3 sm:p-4 text-center space-y-3 sm:space-y-4">
            <div className="w-3 h-3 bg-green-500 rounded-full mx-auto animate-pulse mb-2" />
            <h3 className="font-medium text-base sm:text-lg">You're a Mental Health Mate</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Thank you for volunteering! Others can now reach out to you for support.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button 
                onClick={() => handleUpdateStatus('Available')} 
                variant="outline" 
                size="sm"
                className="border-green-500/30 text-green-400 hover:bg-green-500/10"
              >
                Set Available
              </Button>
              <Button 
                onClick={() => handleUpdateStatus('Busy')} 
                variant="outline" 
                size="sm"
                className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
              >
                Set Busy
              </Button>
              <Button 
                onClick={() => handleUpdateStatus('Unavailable')} 
                variant="outline" 
                size="sm"
                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
              >
                Set Unavailable
              </Button>
            </div>
          </div>
        )}
        
        <div className="space-y-3">
          <h3 className="font-medium text-sm sm:text-base">Available Mental Health Mates</h3>
          
          <div className="space-y-2">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-purple-500 border-t-transparent"></div>
                <p className="text-sm text-muted-foreground mt-2">Loading available mates...</p>
              </div>
            ) : availableMates.length > 0 ? (
              availableMates.map(mate => (
                <div 
                  key={mate.id}
                  className="flex items-center justify-between border border-purple-500/10 rounded-lg p-2 sm:p-3 hover:bg-purple-500/5 transition-colors"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className={`w-2 h-2 rounded-full ${mate.status === "Available" ? "bg-green-500" : "bg-amber-500"}`} />
                    <div>
                      <p className="font-medium text-xs sm:text-sm">{mate.name}</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">{mate.role}</p>
                    </div>
                  </div>
                  
                  <Link to={`/messages?contact=${mate.userId}`} state={{ contactType: 'mental-health', contactName: mate.name }}>
                    <Button variant="outline" size="sm" className="flex items-center gap-1 text-xs h-7 px-2 sm:h-8 sm:px-3">
                      <MessageCircle className="h-3 w-3" />
                      <span>Message</span>
                    </Button>
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center py-4 border border-dashed border-purple-500/20 rounded-lg">
                <p className="text-sm text-muted-foreground">No mental health mates are currently available.</p>
              </div>
            )}
          </div>
          
          <div className="text-center pt-1 sm:pt-2">
            <Link to="/messages" state={{ activeTab: 'mental-health' }}>
              <Button variant="link" size="sm" className="text-purple-400 text-xs sm:text-sm h-auto p-0">
                View All Mental Health Mates
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MentalHealthMate;
