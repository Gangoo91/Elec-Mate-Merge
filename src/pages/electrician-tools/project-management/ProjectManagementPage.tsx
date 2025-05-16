
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardList, FileText, Calendar, Users, PieChart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ProjectManagementPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Project Management</h1>
          <p className="text-muted-foreground">
            Professional electrical project management tools and guidance.
          </p>
        </div>
        <Link to="/electrician-tools/admin">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Admin Tools
          </Button>
        </Link>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4" /> Projects
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" /> Documents
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Schedule
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-2">
            <Users className="h-4 w-4" /> Team
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle>Project Management Essentials</CardTitle>
                <CardDescription>Key principles for successful electrical projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>Effective project management is vital for electrical contractors to deliver work on time, within budget, and to specification. Follow these key principles:</p>
                  
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Clear scope definition</strong> - Ensure all parties understand the exact requirements, deliverables and constraints before work begins
                    </li>
                    <li>
                      <strong>Detailed planning</strong> - Break projects into manageable tasks with assigned responsibilities and realistic timeframes
                    </li>
                    <li>
                      <strong>Risk assessment</strong> - Identify potential issues early and develop mitigation strategies
                    </li>
                    <li>
                      <strong>Regular communication</strong> - Keep clients and team members informed with progress updates and issues
                    </li>
                    <li>
                      <strong>Quality control</strong> - Implement inspection points throughout the project to maintain standards
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle>Project Management Resources</CardTitle>
                <CardDescription>Tools to help manage your electrical projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>Access these resources to improve your project management capabilities:</p>
                  
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Project schedule templates</li>
                    <li>Risk assessment documentation</li>
                    <li>Client communication guides</li>
                    <li>Quality control checklists</li>
                    <li>Project handover documents</li>
                  </ul>
                  
                  <Button className="w-full mt-4">Access Resources</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Common Project Management Challenges</CardTitle>
              <CardDescription>Solutions for electrical contractors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Scope Creep</h3>
                    <p className="text-sm">When clients request additional work beyond the original agreement.</p>
                    <p className="text-sm mt-2"><strong>Solution:</strong> Document all requirements thoroughly in initial contracts and use change orders for additional requests. Clarify the impact on timeline and cost.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Resource Allocation</h3>
                    <p className="text-sm">Managing staff and materials across multiple projects.</p>
                    <p className="text-sm mt-2"><strong>Solution:</strong> Use resource scheduling software to track availability and implement just-in-time ordering for materials to reduce wastage.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Regulatory Compliance</h3>
                    <p className="text-sm">Ensuring all work meets current standards and building regulations.</p>
                    <p className="text-sm mt-2"><strong>Solution:</strong> Stay updated with BS 7671 requirements and implement compliance checklists at key project milestones.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Client Communication</h3>
                    <p className="text-sm">Keeping clients informed without overwhelming them.</p>
                    <p className="text-sm mt-2"><strong>Solution:</strong> Establish regular update schedules and use visual progress reports that clients can easily understand.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Project Management Tools</CardTitle>
              <CardDescription>Manage your electrical projects efficiently</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-center py-8">
                <p className="text-lg mb-4">Project management features will be available soon.</p>
                <Button>Request Early Access</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Document Management</CardTitle>
              <CardDescription>Organise project documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-center py-8">
                <p className="text-lg mb-4">Document management features will be available soon.</p>
                <Button>Request Early Access</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Project Scheduling</CardTitle>
              <CardDescription>Plan and track project timelines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-center py-8">
                <p className="text-lg mb-4">Project scheduling features will be available soon.</p>
                <Button>Request Early Access</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Team Management</CardTitle>
              <CardDescription>Assign and track team responsibilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-center py-8">
                <p className="text-lg mb-4">Team management features will be available soon.</p>
                <Button>Request Early Access</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectManagementPage;
