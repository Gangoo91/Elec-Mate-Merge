
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import TimeTracker from "@/components/apprentice/TimeTracker";
import OJTRatioCard from "@/components/apprentice/OJTRatioCard";
import ResourceCard from "@/components/apprentice/ResourceCard";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const ApprenticeHub = () => {
  // Mock EAL resources data
  const ealResources = [
    { 
      id: 1, 
      title: "EAL Level 2 Diploma Guide",
      description: "Official qualification guide",
      type: "document" as const,
      cta: "Download PDF", 
      href: "#",
      duration: "48 pages" 
    },
    { 
      id: 2, 
      title: "EAL Assessment Method Overview",
      description: "Understanding your assessment process",
      type: "document" as const,
      cta: "View Guide", 
      href: "#",
      duration: "12 pages" 
    },
    { 
      id: 3, 
      title: "Off-The-Job Training Explained",
      description: "Comprehensive overview of OJT requirements",
      type: "video" as const,
      cta: "Watch Video", 
      href: "#",
      duration: "15 min" 
    }
  ];

  // Mock learning materials
  const learningMaterials = [
    { 
      id: 1, 
      title: "Electrical Science Fundamentals",
      description: "Core theory for Level 2 & 3",
      type: "learning" as const,
      cta: "Start Learning", 
      duration: "6 modules" 
    },
    { 
      id: 2, 
      title: "Installation Methods & Technologies",
      description: "Practical installation techniques",
      type: "learning" as const,
      cta: "Continue Learning", 
      duration: "8 modules" 
    },
    { 
      id: 3, 
      title: "Health & Safety in Electrical Work",
      description: "Essential safety protocols",
      type: "learning" as const,
      cta: "Start Learning", 
      duration: "4 modules" 
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Apprentice Hub</h1>
        <p className="text-muted-foreground">
          EAL-compliant training resources and time tracking for electrical apprentices.
        </p>
      </div>

      {/* Navigation Menu */}
      <NavigationMenu className="bg-elec-gray border border-elec-yellow/20 rounded-md max-w-full">
        <NavigationMenuList className="flex-wrap">
          <NavigationMenuItem>
            <NavigationMenuTrigger>Qualification Levels</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                <li>
                  <NavigationMenuLink asChild>
                    <a
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href="#"
                    >
                      <div className="text-sm font-medium">Level 2</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Electrical Installation Diploma
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <a
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href="#"
                    >
                      <div className="text-sm font-medium">Level 3</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Electrotechnical Qualification (MOET)
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <a
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href="#"
                    >
                      <div className="text-sm font-medium">Level 3</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        BS 7671 Wiring Regulations
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <a
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href="#"
                    >
                      <div className="text-sm font-medium">Level 4</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Higher National Certificate (HNC)
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Assessment Units</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[500px] lg:w-[600px] grid-cols-2">
                <li>
                  <NavigationMenuLink asChild>
                    <a
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href="#"
                    >
                      <div className="text-sm font-medium">QELT3/001</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Health and Safety Legislation
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <a
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href="#"
                    >
                      <div className="text-sm font-medium">QELT3/002</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Principles of Electrical Science
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <a
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href="#"
                    >
                      <div className="text-sm font-medium">QELT3/003</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Electrical Installations: Design
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <a
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href="#"
                    >
                      <div className="text-sm font-medium">QELT3/004</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Inspection, Testing and Commissioning
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="#resources" className={cn(
              "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
            )}>
              EAL Resources
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="#time-tracker" className={cn(
              "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
            )}>
              Off-Job Tracker
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* OJT Progress Card */}
      <OJTRatioCard />

      {/* Main Content Tabs */}
      <Tabs defaultValue="time-tracker" className="space-y-6">
        <TabsList className="bg-elec-gray border border-elec-yellow/20 w-full sm:w-auto">
          <TabsTrigger value="time-tracker">Time Tracker</TabsTrigger>
          <TabsTrigger value="learning">Learning Materials</TabsTrigger>
          <TabsTrigger value="eal-resources">EAL Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="time-tracker" id="time-tracker" className="space-y-6">
          <TimeTracker />
        </TabsContent>
        
        <TabsContent value="learning" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {learningMaterials.map((resource) => (
              <ResourceCard 
                key={resource.id}
                title={resource.title}
                description={resource.description}
                type={resource.type}
                cta={resource.cta}
                duration={resource.duration}
              />
            ))}
          </div>
          <Button variant="outline" className="w-full">Load More Learning Resources</Button>
        </TabsContent>
        
        <TabsContent value="eal-resources" id="resources" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ealResources.map((resource) => (
              <ResourceCard 
                key={resource.id}
                title={resource.title}
                description={resource.description}
                type={resource.type}
                cta={resource.cta}
                href={resource.href}
                duration={resource.duration}
              />
            ))}
          </div>
          <Button variant="outline" className="w-full">Browse All EAL Resources</Button>
        </TabsContent>
      </Tabs>

      {/* EAL Integration Note */}
      <div className="bg-elec-gray border border-elec-yellow/20 rounded-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="font-semibold">EAL Integration</h3>
          <p className="text-sm text-muted-foreground">ElecMate is designed to align with EAL's 20% off-the-job training requirements.</p>
        </div>
        <Button variant="outline" size="sm">Learn More</Button>
      </div>
    </div>
  );
};

export default ApprenticeHub;
