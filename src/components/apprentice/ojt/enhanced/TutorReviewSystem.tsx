
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageSquare, 
  Star, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Eye,
  Send,
  Reply,
  ThumbsUp,
  Calendar,
  User
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TutorReviewSystem = () => {
  const { toast } = useToast();
  
  const [replyText, setReplyText] = useState("");

  // Mock review data
  const pendingReviews = [
    {
      id: 1,
      itemTitle: "Consumer Unit Installation",
      itemType: "Portfolio Entry",
      submittedDate: "2024-01-15",
      tutor: "John Smith",
      priority: "High",
      estimatedReviewTime: "2-3 days"
    },
    {
      id: 2,
      itemTitle: "Cable Sizing Evidence",
      itemType: "Evidence Upload",
      submittedDate: "2024-01-14",
      tutor: "Sarah Jones",
      priority: "Medium",
      estimatedReviewTime: "3-5 days"
    }
  ];

  const completedReviews = [
    {
      id: 1,
      itemTitle: "Socket Installation Photos",
      itemType: "Evidence Upload",
      tutor: "John Smith",
      tutorAvatar: "/avatars/john.jpg",
      reviewDate: "2024-01-12",
      rating: 5,
      feedback: "Excellent work! Your installation technique is spot-on and you've clearly demonstrated proper safety procedures. The photos show good attention to detail and the quality of work is professional standard.",
      grade: "Pass",
      suggestions: [
        "Consider documenting the testing sequence in more detail",
        "Include a brief reflection on any challenges faced"
      ],
      replies: []
    },
    {
      id: 2,
      itemTitle: "Fault Finding Report",
      itemType: "Portfolio Entry",
      tutor: "Mike Wilson",
      tutorAvatar: "/avatars/mike.jpg",
      reviewDate: "2024-01-10",
      rating: 4,
      feedback: "Good systematic approach to fault finding. Your methodology is sound and the documentation is clear. There are a few areas where you could provide more technical detail.",
      grade: "Merit",
      suggestions: [
        "Include more detailed circuit analysis",
        "Explain the reasoning behind each test step",
        "Add photos of test equipment readings"
      ],
      replies: [
        {
          id: 1,
          author: "Student",
          content: "Thank you for the feedback. I'll make sure to include more technical detail in my next submission.",
          timestamp: "2024-01-11 10:30"
        }
      ]
    }
  ];

  const reviewStats = {
    totalSubmitted: 25,
    pending: 5,
    completed: 20,
    averageRating: 4.3,
    averageResponseTime: "3.2 days"
  };

  const handleReply = (reviewId: number) => {
    if (!replyText.trim()) {
      toast({
        title: "Message Required",
        description: "Please enter a message before sending.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Reply Sent",
      description: "Your reply has been sent to your tutor."
    });

    setReplyText("");
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge className="bg-red-500">High Priority</Badge>;
      case "Medium":
        return <Badge className="bg-orange-500">Medium</Badge>;
      case "Low":
        return <Badge className="bg-green-500">Low</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  const getGradeBadge = (grade: string) => {
    switch (grade) {
      case "Pass":
        return <Badge className="bg-green-500">Pass</Badge>;
      case "Merit":
        return <Badge className="bg-blue-500">Merit</Badge>;
      case "Distinction":
        return <Badge className="bg-purple-500">Distinction</Badge>;
      case "Refer":
        return <Badge className="bg-red-500">Refer</Badge>;
      default:
        return <Badge variant="secondary">{grade}</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'fill-current text-yellow-500' : 'text-gray-300'
        }`}
      />
    ));
  };

  const ReviewStats = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{reviewStats.totalSubmitted}</div>
            <p className="text-sm text-muted-foreground">Total Submitted</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{reviewStats.pending}</div>
            <p className="text-sm text-muted-foreground">Pending Review</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{reviewStats.completed}</div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{reviewStats.averageRating}</div>
            <p className="text-sm text-muted-foreground">Avg. Rating</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Tutor Review System</h2>
          <p className="text-muted-foreground">Track feedback and communicate with your tutors</p>
        </div>
      </div>

      <ReviewStats />

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="pending" className="flex-1">Pending Reviews</TabsTrigger>
          <TabsTrigger value="completed" className="flex-1">Completed Reviews</TabsTrigger>
          <TabsTrigger value="communication" className="flex-1">Communication</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Items Awaiting Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              {pendingReviews.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
                  <p className="text-muted-foreground">No items are currently waiting for review.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingReviews.map((review) => (
                    <div key={review.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{review.itemTitle}</h3>
                          <p className="text-sm text-muted-foreground">{review.itemType}</p>
                        </div>
                        {getPriorityBadge(review.priority)}
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Submitted: {review.submittedDate}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          Tutor: {review.tutor}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Est. Review: {review.estimatedReviewTime}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                        <span className="text-sm">Review in progress</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Completed Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {completedReviews.map((review) => (
                  <div key={review.id} className="border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{review.itemTitle}</h3>
                        <p className="text-sm text-muted-foreground">{review.itemType}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getGradeBadge(review.grade)}
                        <div className="flex">{renderStars(review.rating)}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <Avatar>
                        <AvatarImage src={review.tutorAvatar} />
                        <AvatarFallback>{review.tutor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{review.tutor}</p>
                        <p className="text-sm text-muted-foreground">Reviewed on {review.reviewDate}</p>
                      </div>
                    </div>

                    <div className="bg-muted p-4 rounded-lg mb-4">
                      <h4 className="font-medium mb-2">Feedback:</h4>
                      <p className="text-sm">{review.feedback}</p>
                    </div>

                    {review.suggestions.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Suggestions for Improvement:</h4>
                        <ul className="text-sm space-y-1">
                          {review.suggestions.map((suggestion, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-muted-foreground">•</span>
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {review.replies.length > 0 && (
                      <div className="border-t pt-4 mb-4">
                        <h4 className="font-medium mb-3">Conversation:</h4>
                        <div className="space-y-3">
                          {review.replies.map((reply) => (
                            <div key={reply.id} className="bg-blue-50 p-3 rounded-lg">
                              <div className="flex justify-between items-start mb-1">
                                <span className="font-medium text-sm">{reply.author}</span>
                                <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                              </div>
                              <p className="text-sm">{reply.content}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="border-t pt-4">
                      <div className="flex gap-2 mb-3">
                        <Textarea
                          placeholder="Reply to your tutor..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          rows={3}
                          className="flex-1"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => handleReply(review.id)} size="sm">
                          <Send className="h-4 w-4 mr-1" />
                          Send Reply
                        </Button>
                        <Button variant="outline" size="sm">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          Thank Tutor
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communication" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Communication Hub</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Direct Messaging</h3>
                <p className="text-muted-foreground mb-4">
                  Communicate directly with your tutors about any questions or concerns.
                </p>
                <Button>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Start New Conversation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TutorReviewSystem;
