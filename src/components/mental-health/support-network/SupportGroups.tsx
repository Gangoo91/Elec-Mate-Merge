import { useState } from "react";
import { Users, Clock, Monitor, ExternalLink, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  defaultExpanded?: boolean;
}

const SupportGroups = ({ groups, defaultExpanded = true }: SupportGroupsProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleJoinGroup = (group: SupportGroup) => {
    if (group.url) {
      window.open(group.url, "_blank", "noopener,noreferrer");
    } else {
      toast.success("Request sent!", {
        description: "We'll contact you with details about joining the support group.",
      });
    }
  };

  if (groups.length === 0) {
    return null;
  }

  const totalMembers = groups.reduce((acc, g) => acc + g.members, 0);

  return (
    <Card className="border-emerald-500/20 overflow-hidden">
      {/* Collapsible Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between bg-gradient-to-r from-emerald-500/10 to-transparent
          min-h-[72px] touch-manipulation active:bg-emerald-500/20 transition-colors duration-300"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
            <Users className="h-5 w-5 text-emerald-400" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-foreground">Support Groups</h3>
            <p className="text-xs text-white/70">{groups.length} group{groups.length !== 1 ? 's' : ''} • {totalMembers} total members</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            {totalMembers}
          </Badge>
          <div
            className="transition-transform duration-300"
            style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            <ChevronDown className="h-5 w-5 text-white/70" />
          </div>
        </div>
      </button>

      {/* Collapsible Content */}
      {isExpanded && (
        <CardContent className="p-3 pt-0 space-y-3">
          {groups.map((group, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5
                touch-manipulation active:scale-[0.99] transition-all duration-300"
            >
              {/* Group Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{group.name}</h4>
                    <Badge variant="outline" className="mt-1 bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                      {group.members} members
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Group Details */}
              <div className="flex items-center gap-4 mb-3 text-xs text-white/70">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{group.meetings}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Monitor className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{group.format}</span>
                </div>
              </div>

              {/* Join Button */}
              <Button
                className="w-full h-11 bg-emerald-500 hover:bg-emerald-600 text-black font-medium
                  touch-manipulation active:scale-[0.98] transition-all duration-300"
                onClick={() => handleJoinGroup(group)}
              >
                Request to Join
                {group.url && <ExternalLink className="h-4 w-4 ml-2" />}
              </Button>
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  );
};

export default SupportGroups;
