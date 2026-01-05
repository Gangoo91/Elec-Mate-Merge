import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, 
  Download, 
  Share2, 
  QrCode,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Briefcase,
  Award,
  GraduationCap,
  Clock,
  User
} from "lucide-react";
import type { ElecIdProfile } from "@/data/employerMockData";

interface ElecIDCardProps {
  profile: ElecIdProfile;
  onShare?: () => void;
  onExportPDF?: () => void;
  compact?: boolean;
}

const statusConfig = {
  "Active": { 
    bg: "bg-success/20", 
    text: "text-success", 
    border: "border-success/30",
    glow: "shadow-success/20",
    icon: CheckCircle2 
  },
  "Valid": { 
    bg: "bg-success/20", 
    text: "text-success", 
    border: "border-success/30",
    glow: "shadow-success/20",
    icon: CheckCircle2 
  },
  "Warning": { 
    bg: "bg-warning/20", 
    text: "text-warning", 
    border: "border-warning/30",
    glow: "shadow-warning/20",
    icon: AlertTriangle 
  },
  "Expiring": { 
    bg: "bg-warning/20", 
    text: "text-warning", 
    border: "border-warning/30",
    glow: "shadow-warning/20",
    icon: AlertTriangle 
  },
  "Expired": { 
    bg: "bg-destructive/20", 
    text: "text-destructive", 
    border: "border-destructive/30",
    glow: "shadow-destructive/20",
    icon: XCircle 
  },
};

export const ElecIDCard = ({ profile, onShare, onExportPDF, compact = false }: ElecIDCardProps) => {
  const status = statusConfig[profile.ecsStatus as keyof typeof statusConfig] || statusConfig.Active;
  const StatusIcon = status.icon;
  
  if (compact) {
    return (
      <Card className="group relative overflow-hidden bg-gradient-to-br from-card via-card to-elec-yellow/5 border-elec-yellow/20 hover:border-elec-yellow/40 transition-all duration-300 hover:shadow-lg hover:shadow-elec-yellow/10">
        {/* Holographic shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-elec-yellow/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        
        {/* Status accent bar */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 ${status.bg} ${status.text.replace('text-', 'bg-')}`} />
        
        <CardContent className="p-4 pl-5">
          <div className="flex items-center gap-4">
            {/* Photo placeholder with status ring */}
            <div className={`relative flex-shrink-0`}>
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-elec-yellow/30 to-elec-yellow/10 flex items-center justify-center ring-2 ${status.border.replace('border-', 'ring-')} ring-offset-2 ring-offset-card`}>
                <User className="h-6 w-6 text-elec-yellow/70" />
              </div>
              <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${status.bg} ${status.border} border flex items-center justify-center`}>
                <StatusIcon className={`h-3 w-3 ${status.text}`} />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground truncate">{profile.name}</p>
              <p className="text-sm text-muted-foreground truncate">{profile.role}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className={`${status.bg} ${status.text} ${status.border} text-xs py-0.5`}>
                  {profile.ecsCardType}
                </Badge>
                {profile.verified && (
                  <ShieldCheck className="h-4 w-4 text-success" />
                )}
              </div>
            </div>
            
            {/* Quick stats */}
            <div className="hidden sm:flex items-center gap-3 text-muted-foreground">
              <div className="text-center">
                <p className="text-lg font-bold text-elec-yellow">{profile.certifications.length}</p>
                <p className="text-[10px] uppercase tracking-wide">Certs</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-elec-yellow">{profile.training.length}</p>
                <p className="text-[10px] uppercase tracking-wide">Training</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="group relative overflow-hidden bg-gradient-to-br from-card via-card to-elec-yellow/5 border-elec-yellow/20 shadow-xl">
      {/* Holographic background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 11px)`
      }} />
      
      {/* Animated shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-elec-yellow/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      {/* Premium gold header bar */}
      <div className="h-2 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500" />
      
      <CardContent className="relative p-5 md:p-6">
        {/* Header with ID Number & Verification */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3 bg-muted/50 px-3 py-2 rounded-lg border border-border/50">
            <QrCode className="h-5 w-5 text-elec-yellow" />
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Elec-ID</p>
              <span className="font-mono text-sm font-semibold text-foreground">{profile.elecIdNumber}</span>
            </div>
          </div>
          {profile.verified && (
            <Badge className="bg-success/10 text-success border-success/30 gap-1.5 py-1.5 px-3">
              <ShieldCheck className="h-4 w-4" />
              <span className="font-medium">JIB Verified</span>
            </Badge>
          )}
        </div>
        
        {/* Main Profile Section */}
        <div className="flex flex-col lg:flex-row gap-5 mb-6">
          {/* Photo & Basic Info */}
          <div className="flex items-start gap-5">
            {/* Premium Photo Placeholder */}
            <div className="relative flex-shrink-0">
              <div className={`w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center border-2 ${status.border} shadow-lg ${status.glow}`}>
                <User className="h-12 w-12 text-muted-foreground/50" />
              </div>
              {/* Status indicator */}
              <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full ${status.bg} ${status.border} border-2 flex items-center justify-center shadow-lg`}>
                <StatusIcon className={`h-4 w-4 ${status.text}`} />
              </div>
            </div>
            
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">{profile.name}</h2>
              <p className="text-lg text-muted-foreground mt-0.5">{profile.role}</p>
              {profile.bio && (
                <p className="text-sm text-muted-foreground/80 mt-2 line-clamp-2 max-w-md">{profile.bio}</p>
              )}
              
              {/* ECS Card Badge - Premium Style */}
              <div className="flex items-center gap-3 mt-4">
                <Badge className={`${status.bg} ${status.text} ${status.border} gap-1.5 py-1.5 px-3 text-sm font-medium`}>
                  <StatusIcon className="h-4 w-4" />
                  {profile.ecsCardType}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Expires {new Date(profile.ecsExpiry).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>
          
          {/* ECS Card Details - ID Card Style */}
          <div className="lg:ml-auto">
            <div className="bg-gradient-to-br from-muted/80 to-muted/40 p-4 rounded-xl border border-border/50 min-w-[200px]">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/50">
                <Award className="h-4 w-4 text-elec-yellow" />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">ECS Card</span>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Card Number</p>
                  <p className="font-mono text-sm text-foreground font-semibold">{profile.ecsCardNumber}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Valid Until</p>
                  <p className="text-sm text-foreground font-medium">{new Date(profile.ecsExpiry).toLocaleDateString('en-GB')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Grid - Premium Design */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { value: profile.yearsExperience || 0, label: "Years Experience", icon: Clock },
            { value: profile.certifications.length, label: "Certifications", icon: Award },
            { value: profile.training.length, label: "Training Records", icon: GraduationCap },
            { value: profile.workHistory?.length || 0, label: "Previous Roles", icon: Briefcase },
          ].map((stat, idx) => (
            <div key={idx} className="group/stat relative overflow-hidden bg-gradient-to-br from-background to-muted/30 p-4 rounded-xl border border-border/50 hover:border-elec-yellow/30 transition-colors">
              <div className="absolute top-2 right-2 opacity-10 group-hover/stat:opacity-20 transition-opacity">
                <stat.icon className="h-8 w-8" />
              </div>
              <p className="text-3xl font-bold text-elec-yellow">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
        
        {/* Skills Section - Coloured Chips */}
        {profile.skills && profile.skills.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-1 w-1 rounded-full bg-elec-yellow" />
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Specialisms & Skills</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.skills.slice(0, 8).map((skill, idx) => (
                <Badge 
                  key={idx} 
                  variant="secondary" 
                  className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20 hover:bg-elec-yellow/20 transition-colors py-1.5 px-3"
                >
                  {skill.name}
                  {skill.level && (
                    <span className="ml-1.5 text-elec-yellow/60 text-[10px] uppercase">• {skill.level}</span>
                  )}
                </Badge>
              ))}
              {profile.skills.length > 8 && (
                <Badge variant="outline" className="text-muted-foreground py-1.5 px-3">
                  +{profile.skills.length - 8} more
                </Badge>
              )}
            </div>
          </div>
        )}
        
        {/* Portability Notice - Premium Style */}
        <div className="bg-gradient-to-r from-elec-yellow/10 via-elec-yellow/5 to-transparent border border-elec-yellow/20 rounded-xl p-4 mb-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
              <Briefcase className="h-5 w-5 text-elec-yellow" />
            </div>
            <div>
              <p className="font-medium text-foreground">Portable Worker Credential</p>
              <p className="text-sm text-muted-foreground mt-0.5">
                This Elec-ID belongs to {profile.name.split(' ')[0]} and follows them throughout their career
              </p>
            </div>
          </div>
        </div>
        
        {/* Action Buttons - Premium Style */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={onExportPDF} 
            variant="outline" 
            className="flex-1 gap-2 h-12 border-border/50 hover:border-elec-yellow/50 hover:bg-elec-yellow/5"
          >
            <Download className="h-4 w-4" />
            Export as PDF
          </Button>
          <Button 
            onClick={onShare} 
            className="flex-1 gap-2 h-12 bg-gradient-to-r from-elec-yellow to-elec-yellow/80 hover:from-elec-yellow/90 hover:to-elec-yellow/70 shadow-lg shadow-elec-yellow/20 text-elec-dark"
          >
            <Share2 className="h-4 w-4" />
            Share Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
