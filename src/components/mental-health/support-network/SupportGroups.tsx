
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SupportGroup {
  name: string;
  members: number;
  meetings: string;
  format: string;
}

interface SupportGroupsProps {
  groups?: SupportGroup[];
}

// Default support groups
const defaultGroups: SupportGroup[] = [
  {
    name: "Electrical Trades Mental Health",
    members: 145,
    meetings: "Weekly",
    format: "In-person & Online"
  },
  {
    name: "Apprentice Support Circle",
    members: 89,
    meetings: "Bi-weekly",
    format: "Online"
  },
  {
    name: "Work-Life Balance Group",
    members: 56,
    meetings: "Monthly",
    format: "In-person"
  }
];

const SupportGroups = ({ groups = defaultGroups }: SupportGroupsProps) => {
  const handleJoinGroup = () => {
    toast.success("Request sent!", {
      description: "We'll contact you with details about joining the support group.",
    });
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Support Groups</h3>
      <div className="space-y-3">
        {groups.map((group, index) => (
          <div 
            key={index}
            className="p-3 bg-purple-500/5 border border-purple-500/10 rounded-lg space-y-2"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm flex items-center">
                <Users className="h-4 w-4 mr-2 text-purple-400" />
                {group.name}
              </h4>
              <span className="text-xs px-2 py-0.5 bg-purple-500/10 rounded-full text-purple-400">
                {group.members} members
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Meetings: {group.meetings}</span>
              <span>Format: {group.format}</span>
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              className="w-full text-xs"
              onClick={handleJoinGroup}
            >
              Request to join
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportGroups;
