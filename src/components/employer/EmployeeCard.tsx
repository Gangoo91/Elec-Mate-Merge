import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "./StatusBadge";
import { cn } from "@/lib/utils";

interface EmployeeCardProps {
  name: string;
  role: string;
  avatar?: string;
  status: string;
  certifications?: number;
  activeJobs?: number;
  onClick?: () => void;
  className?: string;
}

export function EmployeeCard({
  name,
  role,
  avatar,
  status,
  certifications = 0,
  activeJobs = 0,
  onClick,
  className
}: EmployeeCardProps) {
  const initials = name.split(" ").map(n => n[0]).join("").toUpperCase();
  
  return (
    <Card 
      className={cn("card-hover cursor-pointer", className)}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 border-2 border-elec-yellow/20">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-foreground truncate">{name}</h4>
            <p className="text-sm text-muted-foreground truncate">{role}</p>
          </div>
          <StatusBadge status={status} />
        </div>
        <div className="mt-4 pt-4 border-t border-border flex justify-between text-sm">
          <div>
            <span className="text-muted-foreground">Certs: </span>
            <span className="font-medium text-elec-yellow">{certifications}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Jobs: </span>
            <span className="font-medium text-elec-yellow">{activeJobs}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}