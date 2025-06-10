
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Eye, 
  Zap, 
  Search, 
  BookOpen, 
  Shield, 
  Wrench, 
  AlertTriangle, 
  GraduationCap, 
  Phone,
  Camera,
  Mic,
  Star,
  Download,
  MessageSquare,
  Play,
  ArrowRight
} from "lucide-react";
import { useState } from "react";

const AdvancedHelp = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isListening, setIsListening] = useState(false);

  const helpCategories = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: Play,
      color: "bg-green-500/20 text-green-400",
      items: [
        "Setting up your profile",
        "Navigating the apprentice hub",
        "Understanding OJT requirements",
        "First week checklist"
      ]
    },
    {
      id: "technical",
      title: "Technical Support",
      icon: Wrench,
      color: "bg-blue-500/20 text-blue-400",
      items: [
        "Equipment troubleshooting",
        "Software issues",
        "Login problems",
        "Performance optimization"
      ]
    },
    {
      id: "learning",
      title: "Learning Resources",
      icon: BookOpen,
      color: "bg-purple-500/20 text-purple-400",
      items: [
        "Study materials access",
        "Progress tracking",
        "Assessment guidance",
        "Revision techniques"
      ]
    },
    {
      id: "safety",
      title: "Safety Guidelines",
      icon: Shield,
      color: "bg-orange-500/20 text-orange-400",
      items: [
        "PPE requirements",
        "Risk assessments",
        "Emergency procedures",
        "Incident reporting"
      ]
    },
    {
      id: "equipment",
      title: "Equipment Guides",
      icon: Eye,
      color: "bg-cyan-500/20 text-cyan-400",
      items: [
        "AR equipment viewer",
        "3D wiring diagrams",
        "Tool identification",
        "Maintenance schedules"
      ]
    },
    {
      id: "career",
      title: "Career Guidance",
      icon: GraduationCap,
      color: "bg-elec-yellow/20 text-elec-yellow",
      items: [
        "Career pathways",
        "Qualification requirements",
        "Industry networking",
        "Professional development"
      ]
    }
  ];

  const aiFeatures = [
    {
      title: "Smart Q&A Assistant",
      description: "Get instant answers to your questions using AI",
      icon: Bot,
      action: "Ask AI"
    },
    {
      title: "Learning Path Recommendations",
      description: "Personalised study recommendations based on your progress",
      icon: Zap,
      action: "Get Recommendations"
    },
    {
      title: "Voice Assistant",
      description: "Hands-free help using voice commands",
      icon: Mic,
      action: isListening ? "Stop Listening" : "Start Voice"
    },
    {
      title: "Document Analysis",
      description: "Upload documents for AI-powered analysis and insights",
      icon: Search,
      action: "Upload Document"
    }
  ];

  const arFeatures = [
    {
      title: "Virtual Equipment Guides",
      description: "View 3D models of electrical equipment with AR",
      icon: Eye,
      action: "Launch AR"
    },
    {
      title: "3D Wiring Diagrams",
      description: "Interactive 3D circuit visualisation",
      icon: Zap,
      action: "View 3D"
    },
    {
      title: "Tool Recognition",
      description: "Point camera at tools for instant information",
      icon: Camera,
      action: "Scan Tool"
    },
    {
      title: "Safety Visualisation",
      description: "AR overlay of safety procedures and hazards",
      icon: Shield,
      action: "Start AR Safety"
    }
  ];

  const quickActions = [
    { title: "Emergency Contacts", icon: Phone, urgent: true },
    { title: "Report Issue", icon: AlertTriangle, urgent: true },
    { title: "Ask Mentor", icon: MessageSquare, urgent: false },
    { title: "Download Guides", icon: Download, urgent: false }
  ];

  const filteredCategories = helpCategories.filter(category => 
    selectedCategory === "all" || category.id === selectedCategory
  );

  const handleVoiceAssistant = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Advanced Help Centre</h1>
        <p className="text-xl text-elec-yellow font-semibold mb-2">AI & AR Powered Support</p>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Get intelligent help with AI assistance, augmented reality guides, and comprehensive support resources
        </p>
        <BackButton customUrl="/apprentice" label="Back to Apprentice Hub" />
      </div>

      {/* Quick Actions Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Button 
            key={index}
            variant={action.urgent ? "destructive" : "outline"}
            className="h-16 flex flex-col gap-1"
          >
            <action.icon className="h-5 w-5" />
            <span className="text-xs">{action.title}</span>
          </Button>
        ))}
      </div>

      {/* Smart Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Smart Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Ask anything... 'How do I test RCD?' or 'Show me cable types'"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleVoiceAssistant} variant="outline">
              <Mic className={`h-4 w-4 ${isListening ? 'text-red-500' : ''}`} />
            </Button>
            <Button>
              <Search className="h-4 w-4" />
            </Button>
          </div>
          {isListening && (
            <div className="mt-2 p-2 bg-red-500/10 border border-red-500/20 rounded">
              <p className="text-sm text-red-400">🎤 Listening... Speak your question</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="help-centre" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="help-centre">Help Centre</TabsTrigger>
          <TabsTrigger value="ai-assistant">AI Assistant</TabsTrigger>
          <TabsTrigger value="ar-tools">AR Tools</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="help-centre">
          <div className="space-y-6">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant={selectedCategory === "all" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory("all")}
              >
                All Categories
              </Badge>
              {helpCategories.map((category) => (
                <Badge 
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.title}
                </Badge>
              ))}
            </div>

            {/* Help Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category) => (
                <Card key={category.id} className={`${category.color} border-0`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <category.icon className="h-5 w-5" />
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.items.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm cursor-pointer hover:underline">
                          <ArrowRight className="h-3 w-3" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="ai-assistant">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aiFeatures.map((feature, index) => (
                <Card key={index} className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <feature.icon className="h-5 w-5 text-blue-400" />
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <Button 
                      className="w-full"
                      onClick={feature.title === "Voice Assistant" ? handleVoiceAssistant : undefined}
                    >
                      {feature.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* AI Chat Interface */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  AI Chat Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-elec-gray rounded-lg p-4 h-64 mb-4 overflow-y-auto">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Bot className="h-6 w-6 text-blue-400 mt-1" />
                      <div className="bg-blue-500/20 rounded-lg p-3 max-w-md">
                        <p className="text-sm">Hello! I'm your AI assistant. I can help you with electrical questions, study guidance, and apprenticeship support. What would you like to know?</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Type your question here..." />
                  <Button>Send</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ar-tools">
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-green-400" />
                  AR Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Use your device's camera to access augmented reality features for enhanced learning
                </p>
                <Button className="w-full mb-4">
                  <Camera className="h-4 w-4 mr-2" />
                  Start Camera Access
                </Button>
                <p className="text-xs text-muted-foreground">
                  * AR features require camera permissions and work best on mobile devices
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {arFeatures.map((feature, index) => (
                <Card key={index} className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border-green-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <feature.icon className="h-5 w-5 text-green-400" />
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <Button className="w-full">
                      {feature.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="resources">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Download Centre
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2 cursor-pointer hover:underline">
                      <ArrowRight className="h-3 w-3" />
                      Quick Reference Cards
                    </li>
                    <li className="flex items-center gap-2 cursor-pointer hover:underline">
                      <ArrowRight className="h-3 w-3" />
                      Safety Checklists
                    </li>
                    <li className="flex items-center gap-2 cursor-pointer hover:underline">
                      <ArrowRight className="h-3 w-3" />
                      Regulation Summaries
                    </li>
                    <li className="flex items-center gap-2 cursor-pointer hover:underline">
                      <ArrowRight className="h-3 w-3" />
                      Formula Sheets
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Favourites
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    Save frequently used help topics for quick access
                  </p>
                  <Button variant="outline" className="w-full">
                    Manage Favourites
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Contact Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      Chat with Mentor
                    </Button>
                    <Button variant="outline" className="w-full">
                      Technical Support
                    </Button>
                    <Button variant="destructive" className="w-full">
                      Emergency Help
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Progress Tracking */}
      <Card className="border-elec-yellow/50 bg-gradient-to-br from-elec-yellow/10 to-orange-500/10">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Smart Help Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-elec-yellow">87</p>
              <p className="text-sm text-muted-foreground">Questions Answered</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">23</p>
              <p className="text-sm text-muted-foreground">AR Sessions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">15</p>
              <p className="text-sm text-muted-foreground">Resources Downloaded</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedHelp;
