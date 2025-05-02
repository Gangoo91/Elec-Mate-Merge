
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Video, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const ApprenticeHub = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Apprentice Hub</h1>
        <p className="text-muted-foreground">
          Comprehensive resources for electrical apprentices at any level.
        </p>
      </div>

      {/* Learning Paths Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Learning Paths</h2>
          <Button variant="outline" size="sm">View All</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Level 2 Path */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Level 2 Electrical Installation</CardTitle>
              <CardDescription>Beginner to intermediate concepts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>0%</span>
              </div>
              <Progress value={0} className="h-2 bg-elec-dark" />
              <div className="pt-2">
                <Button className="w-full">Begin Path</Button>
              </div>
            </CardContent>
          </Card>

          {/* Level 3 Path */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Level 3 MOET Qualification</CardTitle>
              <CardDescription>Advanced electrical theory and practices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>0%</span>
              </div>
              <Progress value={0} className="h-2 bg-elec-dark" />
              <div className="pt-2">
                <Button className="w-full">Begin Path</Button>
              </div>
            </CardContent>
          </Card>

          {/* Regulations Path */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Wiring Regulations 18th Edition</CardTitle>
              <CardDescription>BS 7671 regulations and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>0%</span>
              </div>
              <Progress value={0} className="h-2 bg-elec-dark" />
              <div className="pt-2">
                <Button className="w-full">Begin Path</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Study Materials */}
      <Tabs defaultValue="videos" className="space-y-4">
        <TabsList className="bg-elec-gray border border-elec-yellow/20">
          <TabsTrigger value="videos">Video Lessons</TabsTrigger>
          <TabsTrigger value="notes">Study Notes</TabsTrigger>
          <TabsTrigger value="quizzes">Practice Quizzes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="videos" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="border-elec-yellow/20 bg-elec-gray">
                <div className="aspect-video relative bg-elec-dark flex items-center justify-center">
                  <Video className="h-8 w-8 text-elec-yellow opacity-50" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">
                    {["Basic Circuit Principles", "Safety Fundamentals", "Cable Installation Techniques"][i]}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>{["25 min", "18 min", "32 min"][i]}</span>
                    <Button variant="outline" size="sm">Watch</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button variant="outline" className="w-full">Load More Videos</Button>
        </TabsContent>
        
        <TabsContent value="notes" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader className="pb-2 flex flex-row items-start gap-3">
                  <FileText className="h-6 w-6 text-elec-yellow mt-1" />
                  <div>
                    <CardTitle className="text-base">
                      {["Electrical Theory Notes", "Wiring Diagrams Guide", "Testing Procedures"][i]}
                    </CardTitle>
                    <CardDescription>{["PDF", "PDF", "PDF"][i]} • {["24 pages", "18 pages", "12 pages"][i]}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full">Download</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="quizzes" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader className="pb-2 flex flex-row items-start gap-3">
                  <Award className="h-6 w-6 text-elec-yellow mt-1" />
                  <div>
                    <CardTitle className="text-base">
                      {["Basic Electrical Concepts", "Health & Safety", "Circuit Analysis"][i]}
                    </CardTitle>
                    <CardDescription>{["10 questions", "15 questions", "12 questions"][i]} • {["Beginner", "Intermediate", "Advanced"][i]}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full">Start Quiz</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Featured Study Resources */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Featured Resources</h2>
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-start gap-4">
              <BookOpen className="h-8 w-8 text-elec-yellow" />
              <div>
                <CardTitle>Level 3 MOET Exam Preparation Guide</CardTitle>
                <CardDescription>
                  Comprehensive guide to help you prepare for your Level 3 qualification exams.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow"></span>
                  Detailed revision checklist
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow"></span>
                  Practice exam questions
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow"></span>
                  Topic breakdown with tips
                </li>
              </ul>
              <Button>Access Guide</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApprenticeHub;
