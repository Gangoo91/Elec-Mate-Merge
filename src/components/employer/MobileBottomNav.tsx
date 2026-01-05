import { Home, Users, Briefcase, Wallet, Shield, MoreHorizontal, FileText, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Section } from "@/pages/employer/EmployerDashboard";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MobileBottomNavProps {
  currentSection: Section;
  onNavigate: (section: Section) => void;
}

interface NavItem {
  section: Section;
  label: string;
  icon: React.ElementType;
  color?: string;
}

const primaryNavItems: NavItem[] = [
  { section: "overview", label: "Home", icon: Home, color: "text-elec-yellow" },
  { section: "peoplehub", label: "People", icon: Users, color: "text-blue-400" },
  { section: "jobshub", label: "Jobs", icon: Briefcase, color: "text-green-400" },
  { section: "financehub", label: "Finance", icon: Wallet, color: "text-purple-400" },
];

const moreNavItems: NavItem[] = [
  { section: "safetyhub", label: "Safety", icon: Shield, color: "text-red-400" },
  { section: "smartdocs", label: "Smart Docs", icon: FileText, color: "text-cyan-400" },
  { section: "settings", label: "Settings", icon: Settings, color: "text-gray-400" },
];

// Helper to check if current section belongs to a hub
const getSectionHub = (section: Section): Section | null => {
  const peopleSubSections: Section[] = ["team", "elecid", "timesheets", "comms", "talentpool", "vacancies"];
  const financeSubSections: Section[] = ["quotes", "tenders", "expenses", "procurement", "financials", "reports", "signatures", "pricebook"];
  const jobsSubSections: Section[] = ["jobpacks", "jobs", "jobboard", "timeline", "tracking", "progresslogs", "issues", "testing", "quality", "clientportal", "fleet", "photogallery"];
  const safetySubSections: Section[] = ["safety", "rams", "incidents", "policies", "contracts", "training", "briefings", "compliance"];
  const smartDocsSubSections: Section[] = ["aidesignspec", "airams", "aimethodstatement", "aibriefingpack", "aiquote"];

  if (peopleSubSections.includes(section)) return "peoplehub";
  if (financeSubSections.includes(section)) return "financehub";
  if (jobsSubSections.includes(section)) return "jobshub";
  if (safetySubSections.includes(section)) return "safetyhub";
  if (smartDocsSubSections.includes(section)) return "smartdocs";
  return null;
};

export function MobileBottomNav({ currentSection, onNavigate }: MobileBottomNavProps) {
  const [moreSheetOpen, setMoreSheetOpen] = useState(false);

  const activeHub = getSectionHub(currentSection);

  const isActive = (section: Section) => {
    return currentSection === section || activeHub === section;
  };

  const handleNavigate = (section: Section) => {
    onNavigate(section);
    setMoreSheetOpen(false);
  };

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-elec-gray/95 backdrop-blur-lg border-t border-elec-yellow/20 pb-safe">
        <div className="flex items-center justify-around h-16 px-2">
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.section);

            return (
              <button
                key={item.section}
                onClick={() => handleNavigate(item.section)}
                className={cn(
                  "flex flex-col items-center justify-center flex-1 h-full min-w-0 px-1",
                  "transition-all duration-200 touch-feedback",
                  "active:scale-95"
                )}
              >
                <div className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-xl mb-0.5 transition-all duration-200",
                  active
                    ? "bg-elec-yellow/20"
                    : "bg-transparent"
                )}>
                  <Icon
                    className={cn(
                      "h-5 w-5 transition-all duration-200",
                      active ? item.color || "text-elec-yellow" : "text-muted-foreground"
                    )}
                  />
                </div>
                <span className={cn(
                  "text-[10px] font-medium truncate w-full text-center transition-colors duration-200",
                  active ? "text-foreground" : "text-muted-foreground"
                )}>
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* More button */}
          <button
            onClick={() => setMoreSheetOpen(true)}
            className={cn(
              "flex flex-col items-center justify-center flex-1 h-full min-w-0 px-1",
              "transition-all duration-200 touch-feedback",
              "active:scale-95"
            )}
          >
            <div className={cn(
              "flex items-center justify-center w-10 h-10 rounded-xl mb-0.5 transition-all duration-200",
              moreNavItems.some(item => isActive(item.section))
                ? "bg-elec-yellow/20"
                : "bg-transparent"
            )}>
              <MoreHorizontal
                className={cn(
                  "h-5 w-5 transition-all duration-200",
                  moreNavItems.some(item => isActive(item.section))
                    ? "text-elec-yellow"
                    : "text-muted-foreground"
                )}
              />
            </div>
            <span className={cn(
              "text-[10px] font-medium truncate w-full text-center transition-colors duration-200",
              moreNavItems.some(item => isActive(item.section))
                ? "text-foreground"
                : "text-muted-foreground"
            )}>
              More
            </span>
          </button>
        </div>
      </nav>

      {/* More Sheet */}
      <Sheet open={moreSheetOpen} onOpenChange={setMoreSheetOpen}>
        <SheetContent side="bottom" className="h-auto max-h-[50vh] rounded-t-2xl bg-elec-gray border-t border-elec-yellow/20">
          <SheetHeader className="pb-4">
            <SheetTitle className="text-foreground">More Options</SheetTitle>
          </SheetHeader>
          <ScrollArea className="max-h-[calc(50vh-80px)]">
            <div className="grid grid-cols-3 gap-3 pb-safe">
              {moreNavItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.section);

                return (
                  <button
                    key={item.section}
                    onClick={() => handleNavigate(item.section)}
                    className={cn(
                      "flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200",
                      "touch-feedback active:scale-95",
                      active
                        ? "bg-elec-yellow/20 border border-elec-yellow/30"
                        : "bg-elec-gray/50 border border-border hover:bg-muted/50"
                    )}
                  >
                    <div className={cn(
                      "flex items-center justify-center w-12 h-12 rounded-full mb-2 transition-all duration-200",
                      active
                        ? "bg-elec-yellow/30"
                        : "bg-muted/50"
                    )}>
                      <Icon
                        className={cn(
                          "h-6 w-6 transition-all duration-200",
                          active ? item.color || "text-elec-yellow" : "text-muted-foreground"
                        )}
                      />
                    </div>
                    <span className={cn(
                      "text-xs font-medium text-center transition-colors duration-200",
                      active ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Spacer for content above bottom nav */}
      <div className="md:hidden h-16 pb-safe" />
    </>
  );
}
