
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
      <CardHeader className="bg-gradient-to-r from-purple-500/10 to-transparent border-b border-purple-500/10">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-purple-400" />
          Mental Health Mate
        </CardTitle>
        <CardDescription>
          Connect with fellow professionals who volunteer to provide peer support
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {!isVolunteer ? (
          <div className="bg-purple-500/5 border border-purple-500/10 rounded-lg p-4 text-center space-y-4">
            <UserPlus className="h-10 w-10 text-purple-400 mx-auto opacity-80" />
            <h3 className="font-medium text-lg">Become a Mental Health Mate</h3>
            <p className="text-muted-foreground text-sm">
              Volunteer to be available for other electrical professionals who need someone to talk to
            </p>
            <Button 
              onClick={handleBecomeMate}
              className="bg-purple-500 hover:bg-purple-600 text-white"
            >
              Sign Up as a Volunteer
            </Button>
          </div>
        ) : (
          <div className="bg-purple-500/5 border border-purple-500/10 rounded-lg p-4 text-center space-y-4">
            <div className="w-3 h-3 bg-green-500 rounded-full mx-auto animate-pulse mb-2" />
            <h3 className="font-medium text-lg">You're a Mental Health Mate</h3>
            <p className="text-muted-foreground text-sm">
              Thank you for volunteering! Others can now reach out to you for support.
            </p>
          </div>
        )}
        
        <div className="space-y-3">
          <h3 className="font-medium">Available Mental Health Mates</h3>
          
          <div className="space-y-2">
            {availableMates.map(mate => (
              <div 
                key={mate.id}
                className="flex items-center justify-between border border-purple-500/10 rounded-lg p-3 hover:bg-purple-500/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${mate.status === "Available" ? "bg-green-500" : "bg-amber-500"}`} />
                  <div>
                    <p className="font-medium text-sm">{mate.name}</p>
                    <p className="text-xs text-muted-foreground">{mate.role}</p>
                  </div>
                </div>
                
                <Link to={`/messages?contact=${mate.id}`}>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" />
                    <span>Message</span>
                  </Button>
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center pt-2">
            <Link to="/messages">
              <Button variant="link" size="sm" className="text-purple-400">
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
