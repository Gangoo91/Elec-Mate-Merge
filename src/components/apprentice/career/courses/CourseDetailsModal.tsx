
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin } from "lucide-react";

interface CourseDetailsModalProps {
  course: {
    id: number;
    title: string;
    provider: string;
    description: string;
    duration: string;
    level: string;
    price: string;
    format: string;
    nextDates: string[];
    rating: number;
    locations: string[];
  } | null;
  onClose: () => void;
}

const CourseDetailsModal = ({ course, onClose }: CourseDetailsModalProps) => {
  if (!course) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-semibold">{course.title}</h3>
              <p className="text-amber-400">{course.provider}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
          
          <p>{course.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-elec-yellow/10 pt-4">
            <div>
              <h4 className="text-sm text-elec-yellow">Duration</h4>
              <p className="text-sm">{course.duration}</p>
            </div>
            <div>
              <h4 className="text-sm text-elec-yellow">Level</h4>
              <p className="text-sm">{course.level}</p>
            </div>
            <div>
              <h4 className="text-sm text-elec-yellow">Format</h4>
              <p className="text-sm">{course.format}</p>
            </div>
            <div>
              <h4 className="text-sm text-elec-yellow">Price</h4>
              <p className="text-sm">{course.price}</p>
            </div>
          </div>
          
          <div className="border-t border-elec-yellow/10 pt-4">
            <h4 className="text-sm text-elec-yellow mb-2">Available Locations</h4>
            <div className="flex flex-wrap gap-2">
              {course.locations.map((location, idx) => (
                <span 
                  key={idx} 
                  className="text-xs bg-elec-gray px-2 py-1 rounded-md flex items-center gap-1"
                >
                  <MapPin className="h-3 w-3" />
                  {location}
                </span>
              ))}
            </div>
          </div>
          
          <div className="border-t border-elec-yellow/10 pt-4">
            <h4 className="text-sm text-elec-yellow mb-2">Upcoming Course Dates</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {course.nextDates.map((date, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{date}</TableCell>
                    <TableCell>{course.locations[idx % course.locations.length]}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-0.5 rounded text-xs ${idx % 3 === 0 ? "bg-red-500/20 text-red-300" : "bg-green-500/20 text-green-300"}`}>
                        {idx % 3 === 0 ? "Limited spaces" : "Available"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline">Enquire</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="border-t border-elec-yellow/10 pt-4">
            <h4 className="text-sm text-elec-yellow mb-2">Course Enquiry</h4>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm">Name</label>
                  <Input placeholder="Your full name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm">Email</label>
                  <Input type="email" placeholder="Your email address" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm">Phone</label>
                  <Input placeholder="Your contact number" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm">Preferred location</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {course.locations.map((location) => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm">Message</label>
                <Textarea placeholder="Any specific questions or requirements..." />
              </div>
              <Button className="w-full bg-elec-yellow text-elec-dark hover:bg-amber-400">
                Submit Enquiry
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsModal;
