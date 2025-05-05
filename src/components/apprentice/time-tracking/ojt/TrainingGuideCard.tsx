
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

const TrainingGuideCard = () => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-elec-yellow" />
          Off-the-Job Training Guide
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>
            Off-the-job training is a key requirement for all apprenticeships. It refers to the learning that takes place outside of day-to-day work duties, 
            but within your paid working hours. This should represent at least 20% of your total working time.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-elec-dark p-4 rounded-md">
              <h3 className="text-elec-yellow font-medium mb-2">What counts as off-the-job training:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Theory lessons and lectures</li>
                <li>Practical training (shadowing, mentoring)</li>
                <li>Learning support sessions</li>
                <li>Online learning and research</li>
                <li>Industry visits or competitions</li>
              </ul>
            </div>
            <div className="bg-elec-dark p-4 rounded-md">
              <h3 className="text-elec-yellow font-medium mb-2">Evidence requirements:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Records of training activities</li>
                <li>Certificates of completion</li>
                <li>Photographs of practical work</li>
                <li>Projects and assignments</li>
                <li>Witness testimonials</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingGuideCard;
