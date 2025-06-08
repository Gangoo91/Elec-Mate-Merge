
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, FileText, Video, Mic, Shield, CheckCircle } from "lucide-react";

const DocumentationGuide = () => {
  const photographyTips = [
    {
      tip: "Use good lighting",
      description: "Natural light or LED work lights provide the best illumination for your work"
    },
    {
      tip: "Show before and after",
      description: "Document the initial state, work in progress, and final result"
    },
    {
      tip: "Include context",
      description: "Show the work area, tools used, and safety measures in place"
    },
    {
      tip: "Capture details",
      description: "Close-up shots of connections, labels, and quality workmanship"
    }
  ];

  const writtenEvidenceTips = [
    {
      tip: "Start with context",
      description: "Explain the project, your role, and the learning objectives"
    },
    {
      tip: "Detail the process",
      description: "Step-by-step account of what you did and why"
    },
    {
      tip: "Reflect on learning",
      description: "What did you learn? What would you do differently?"
    },
    {
      tip: "Link to standards",
      description: "Reference relevant regulations, standards, and best practices"
    }
  ];

  const videoTips = [
    {
      tip: "Plan your content",
      description: "Outline what you want to show before recording"
    },
    {
      tip: "Explain as you go",
      description: "Narrate your actions and thought process"
    },
    {
      tip: "Keep it focused",
      description: "Short, focused videos are more effective than long ones"
    },
    {
      tip: "Ensure quality",
      description: "Good audio is more important than perfect video quality"
    }
  ];

  return (
    <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
      <CardHeader>
        <CardTitle className="text-green-400">Documentation Best Practices</CardTitle>
        <p className="text-sm text-muted-foreground">
          Professional guidance on capturing and presenting your work effectively
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="photography">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="photography" className="flex items-center gap-1">
              <Camera className="h-4 w-4" />
              <span className="hidden sm:inline">Photos</span>
            </TabsTrigger>
            <TabsTrigger value="written" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Written</span>
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-1">
              <Video className="h-4 w-4" />
              <span className="hidden sm:inline">Video</span>
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex items-center gap-1">
              <Mic className="h-4 w-4" />
              <span className="hidden sm:inline">Audio</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="photography" className="mt-4">
            <div className="space-y-4">
              <h4 className="font-medium text-white">Photography Guidelines</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {photographyTips.map((item, index) => (
                  <div key={index} className="p-3 bg-elec-gray/50 rounded border border-green-500/20">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h5 className="font-medium text-white text-sm">{item.tip}</h5>
                        <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="written" className="mt-4">
            <div className="space-y-4">
              <h4 className="font-medium text-white">Written Evidence Structure</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {writtenEvidenceTips.map((item, index) => (
                  <div key={index} className="p-3 bg-elec-gray/50 rounded border border-green-500/20">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h5 className="font-medium text-white text-sm">{item.tip}</h5>
                        <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="video" className="mt-4">
            <div className="space-y-4">
              <h4 className="font-medium text-white">Video Documentation</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {videoTips.map((item, index) => (
                  <div key={index} className="p-3 bg-elec-gray/50 rounded border border-green-500/20">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h5 className="font-medium text-white text-sm">{item.tip}</h5>
                        <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="audio" className="mt-4">
            <div className="space-y-4">
              <h4 className="font-medium text-white">Audio Notes & Reflections</h4>
              <div className="p-4 bg-elec-gray/50 rounded border border-green-500/20">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium text-white">Important Safety Note</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      Never record audio whilst working on live electrical systems. Only record 
                      reflections during safe periods or after work completion.
                    </p>
                  </div>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  Record learning reflections immediately after completing tasks
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  Explain your thought process and decision-making
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  Note any challenges faced and how you overcame them
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  Keep recordings concise and focused on key learning points
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DocumentationGuide;
