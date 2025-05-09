
import { Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SupportGroup {
  name: string;
  members: number;
  meetings: string;
  format: string;
  url?: string;
}

interface SupportGroupsProps {
  groups: SupportGroup[];
}

const SupportGroups = ({ groups }: SupportGroupsProps) => {
  const handleJoinGroup = (group: SupportGroup) => {
    if (group.url) {
      // Open the external group page
      window.open(group.url, "_blank", "noopener,noreferrer");
    } else {
      toast.success("Request sent!", {
        description: "We'll contact you with details about joining the support group.",
      });
    }
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
              className="w-full text-xs flex items-center justify-center gap-1"
              onClick={() => handleJoinGroup(group)}
            >
              Request to join
              {group.url && <ExternalLink className="h-3 w-3" />}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportGroups;
