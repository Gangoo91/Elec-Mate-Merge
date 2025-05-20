
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageSquare, ChevronLeft, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const ApprenticeChat = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const chatTopics = [
    {
      category: "Technical",
      topics: [
        "Electrical Regulations",
        "Circuit Design",
        "Testing Procedures",
        "Wiring Methods",
        "Troubleshooting Common Issues"
      ]
    },
    {
      category: "Career",
      topics: [
        "Interview Tips",
        "Resume Building",
        "Professional Development",
        "Certification Advice",
        "Finding Apprenticeships"
      ]
    },
    {
      category: "Study",
      topics: [
        "Exam Preparation",
        "Learning Strategies",
        "Resources Recommendation",
        "Practice Questions",
        "Study Group Formation"
      ]
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-elec-yellow" /> Apprentice Chat
          </h1>
          <p className="text-muted-foreground">
            Connect with other apprentices to share knowledge and ask questions
          </p>
        </div>
        <Link to="/apprentice">
          <Button variant="outline" size="sm">
            <ChevronLeft className="mr-1 h-4 w-4" /> Back to Apprentice Hub
          </Button>
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search discussions..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="all">All Topics</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="career">Career</TabsTrigger>
          <TabsTrigger value="study">Study</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          {chatTopics.map((categoryData) => (
            <div key={categoryData.category} className="space-y-4">
              <h2 className="text-xl font-semibold">{categoryData.category} Discussions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryData.topics.map((topic) => (
                  <Card key={topic} className="hover:border-elec-yellow/30 cursor-pointer transition-colors">
                    <CardContent className="p-4">
                      <div className="font-medium">{topic}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>
        
        {chatTopics.map((categoryData) => (
          <TabsContent key={categoryData.category.toLowerCase()} value={categoryData.category.toLowerCase()} className="space-y-4">
            <h2 className="text-xl font-semibold">{categoryData.category} Discussions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryData.topics.map((topic) => (
                <Card key={topic} className="hover:border-elec-yellow/30 cursor-pointer transition-colors">
                  <CardContent className="p-4">
                    <div className="font-medium">{topic}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="bg-elec-gray p-6 rounded-lg border border-elec-yellow/20 mt-6">
        <h3 className="text-xl font-semibold mb-3">Chat Guidelines</h3>
        <ul className="space-y-2 list-disc pl-5">
          <li>Be respectful and supportive to all community members</li>
          <li>Stay on topic and contribute meaningfully to discussions</li>
          <li>Share knowledge, but indicate when providing opinion vs. fact</li>
          <li>Do not share personal contact information publicly</li>
          <li>Report any concerning behavior to moderators</li>
        </ul>
      </div>
    </div>
  );
};

export default ApprenticeChat;
