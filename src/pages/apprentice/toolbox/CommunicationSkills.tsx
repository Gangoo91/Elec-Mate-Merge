
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Users, MessageSquare, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const CommunicationSkills = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Communication Skills</h1>
          <p className="text-muted-foreground">How to communicate effectively with supervisors, colleagues, and customers</p>
        </div>
        <Link to="/apprentice/toolbox" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Toolbox
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-elec-yellow" />
              <CardTitle>Working with Supervisors</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2 text-elec-light/80">
              <li>• Ask questions when unsure</li>
              <li>• Report problems immediately</li>
              <li>• Accept feedback positively</li>
              <li>• Communicate progress regularly</li>
              <li>• Be honest about your capabilities</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-center gap-3">
              <MessageSquare className="h-6 w-6 text-elec-yellow" />
              <CardTitle>Customer Interaction</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2 text-elec-light/80">
              <li>• Be polite and professional</li>
              <li>• Explain work in simple terms</li>
              <li>• Keep customers informed</li>
              <li>• Respect their property</li>
              <li>• Address concerns promptly</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CommunicationSkills;
