import { BookOpen, ExternalLink } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";

interface BS7671ReferenceTooltipProps {
  reference: string;
}

// Common BS 7671 regulation explanations
const REGULATION_INFO: Record<string, { title: string; description: string }> = {
  "411": {
    title: "Protection against electric shock",
    description: "Requirements for protective measures against direct and indirect contact, including earthing and bonding."
  },
  "314": {
    title: "Division of installation",
    description: "Guidance on dividing electrical installations into circuits to avoid hazards and facilitate testing and maintenance."
  },
  "522": {
    title: "Selection and erection of wiring systems",
    description: "Requirements for cable installation methods, support, and mechanical protection."
  },
  "543": {
    title: "Protective conductors",
    description: "Requirements for the sizing and installation of protective conductors (CPCs)."
  },
  "559": {
    title: "Luminaires and lighting installations",
    description: "Special requirements for the selection and erection of luminaires and lighting installations."
  },
  "701": {
    title: "Locations containing a bath or shower",
    description: "Special requirements for electrical installations in bathrooms and shower rooms, including zones and protection."
  },
  "702": {
    title: "Swimming pools and other basins",
    description: "Special requirements for electrical installations in and around swimming pools."
  },
  "705": {
    title: "Agricultural and horticultural premises",
    description: "Special requirements for installations in agricultural buildings and horticultural premises."
  },
  "706": {
    title: "Conducting locations with restricted movement",
    description: "Requirements for confined conductive locations such as boilers and metal tanks."
  },
};

export const BS7671ReferenceTooltip = ({ reference }: BS7671ReferenceTooltipProps) => {
  const cleanRef = reference.replace(/[^\d.]/g, '');
  const section = cleanRef.split('.')[0];
  const info = REGULATION_INFO[section];

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Badge 
          variant="outline" 
          className="cursor-help bg-primary/5 border-primary/20 text-primary hover:bg-primary/10 transition-colors"
        >
          <BookOpen className="h-3 w-3 mr-1" />
          {reference}
        </Badge>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-card border-border/40" align="start">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="text-sm font-semibold text-foreground">BS 7671:{reference}</h4>
              {info && <p className="text-xs text-muted-foreground mt-1">{info.title}</p>}
            </div>
            <BookOpen className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          </div>
          {info ? (
            <p className="text-xs text-muted-foreground leading-relaxed">{info.description}</p>
          ) : (
            <p className="text-xs text-muted-foreground leading-relaxed">
              Regulation {reference} - refer to BS 7671:2018+A2:2022 for full details.
            </p>
          )}
          <div className="pt-2 border-t border-border/40">
            <a 
              href={`https://electrical.theiet.org/bs-7671/`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              View in BS 7671 online
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
