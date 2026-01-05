import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Home, Users, Briefcase, Shield, Wallet, 
  FileText, Settings, Clock, MessageSquare,
  Wrench, Camera, MapPin, ClipboardList
} from "lucide-react";
import type { Section } from "@/pages/employer/EmployerDashboard";

interface MobileNavSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (section: Section) => void;
  currentSection: Section;
}

interface NavItem {
  section: Section;
  label: string;
  icon: React.ElementType;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: "Main",
    items: [
      { section: "overview", label: "Overview", icon: Home },
      { section: "peoplehub", label: "People", icon: Users },
      { section: "jobshub", label: "Jobs", icon: Briefcase },
      { section: "financehub", label: "Finance", icon: Wallet },
      { section: "safetyhub", label: "Safety", icon: Shield },
    ]
  },
  {
    label: "Operations",
    items: [
      { section: "timesheets", label: "Timesheets", icon: Clock },
      { section: "comms", label: "Communications", icon: MessageSquare },
      { section: "jobpacks", label: "Job Packs", icon: FileText },
      { section: "tracking", label: "Worker Tracking", icon: MapPin },
      { section: "photogallery", label: "Photo Gallery", icon: Camera },
    ]
  },
  {
    label: "Tools",
    items: [
      { section: "testing", label: "Testing", icon: ClipboardList },
      { section: "procurement", label: "Procurement", icon: Wrench },
    ]
  },
  {
    label: "System",
    items: [
      { section: "settings", label: "Settings", icon: Settings },
    ]
  },
];

export function MobileNavSheet({ open, onOpenChange, onNavigate, currentSection }: MobileNavSheetProps) {
  const handleNavigate = (section: Section) => {
    onNavigate(section);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[300px] p-0 bg-sidebar border-r border-sidebar-border">
        <SheetHeader className="p-5 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <img 
              src="/images/elec-mate-logo.png" 
              alt="Elec-Mate" 
              className="h-10 w-10 rounded-lg"
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-sidebar-foreground">
                <span className="text-elec-yellow">Elec</span>-Mate
              </span>
              <span className="text-xs text-sidebar-foreground/60">Electrical Management</span>
            </div>
          </div>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-88px)]">
          <div className="py-4">
            {navGroups.map((group, groupIdx) => (
              <div key={group.label}>
                {groupIdx > 0 && <Separator className="my-3 bg-sidebar-border" />}
                
                <div className="px-4 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50">
                    {group.label}
                  </span>
                </div>
                
                <div className="px-2 space-y-0.5">
                  {group.items.map((item) => {
                    const isActive = currentSection === item.section;
                    const Icon = item.icon;
                    
                    return (
                      <button
                        key={item.section}
                        onClick={() => handleNavigate(item.section)}
                        className={`
                          w-full flex items-center gap-3 px-3 py-3 rounded-lg
                          transition-all duration-200 text-left
                          ${isActive
                            ? "bg-elec-yellow/15 text-elec-yellow border-l-3 border-elec-yellow font-medium"
                            : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                          }
                        `}
                      >
                        <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? "text-elec-yellow" : ""}`} />
                        <span className="text-sm">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
