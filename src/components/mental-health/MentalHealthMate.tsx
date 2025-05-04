
import { useState } from "react";
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
  const { user } = useAuth();

  const handleBecomeMate = () => {
    // In a real implementation, this would update a database record
    setIsVolunteer(true);
    toast.success("Thank you for becoming a Mental Health Mate!", {
      description: "You are now available to help others in need.",
    });
    
    if (onBecomeMate) {
      onBecomeMate();
    }
  };

  const availableMates = [
    { id: "1", name: "Sarah Thompson", role: "Journeyman Electrician", status: "Available" },
    { id: "2", name: "Michael Chen", role: "Master Electrician", status: "Available" },
    { id: "3", name: "James Wilson", role: "Apprentice", status: "Busy" },
  ];

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
            >
              Sign Up as a Volunteer
            </Button>
          </div>
        ) : (
          <div className="bg-purple-500/5 border border-purple-500/10 rounded-lg p-3 sm:p-4 text-center space-y-3 sm:space-y-4">
            <div className="w-3 h-3 bg-green-500 rounded-full mx-auto animate-pulse mb-2" />
            <h3 className="font-medium text-base sm:text-lg">You're a Mental Health Mate</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Thank you for volunteering! Others can now reach out to you for support.
            </p>
          </div>
        )}
        
        <div className="space-y-3">
          <h3 className="font-medium text-sm sm:text-base">Available Mental Health Mates</h3>
          
          <div className="space-y-2">
            {availableMates.map(mate => (
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
                
                <Link to={`/messages?contact=${mate.id}`}>
                  <Button variant="outline" size="sm" className="flex items-center gap-1 text-xs h-7 px-2 sm:h-8 sm:px-3">
                    <MessageCircle className="h-3 w-3" />
                    <span>Message</span>
                  </Button>
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center pt-1 sm:pt-2">
            <Link to="/messages">
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
