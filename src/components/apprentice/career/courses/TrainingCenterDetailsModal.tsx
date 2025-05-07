
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin } from "lucide-react";

interface TrainingCenterDetailsModalProps {
  center: {
    id: number;
    name: string;
    location: string;
    address: string;
    contact: string;
    courses: string[];
    facilities: string[];
  } | null;
  onClose: () => void;
}

const TrainingCenterDetailsModal = ({ center, onClose }: TrainingCenterDetailsModalProps) => {
  if (!center) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-semibold">{center.name}</h3>
              <p className="text-amber-400 flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {center.location}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-elec-yellow/10 pt-4">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm text-elec-yellow mb-2">Address</h4>
                <p className="text-sm">{center.address}</p>
              </div>
              
              <div>
                <h4 className="text-sm text-elec-yellow mb-2">Contact</h4>
                <p className="text-sm">{center.contact}</p>
              </div>
              
              <div>
                <h4 className="text-sm text-elec-yellow mb-2">Facilities</h4>
                <ul className="text-sm grid gap-1.5">
                  {center.facilities.map((facility, idx) => (
                    <li key={idx} className="flex items-center gap-1">
                      <span className="h-1 w-1 rounded-full bg-elec-yellow"></span>
                      <span>{facility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm text-elec-yellow mb-2">Available Courses</h4>
                <ul className="text-sm grid gap-1.5">
                  {center.courses.map((course, idx) => (
                    <li key={idx} className="flex items-center gap-1">
                      <span className="h-1 w-1 rounded-full bg-elec-yellow"></span>
                      <span>{course}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm text-elec-yellow mb-2">Opening Hours</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Monday - Friday</div>
                  <div>08:30 - 17:00</div>
                  <div>Saturday</div>
                  <div>09:00 - 13:00</div>
                  <div>Sunday</div>
                  <div>Closed</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-elec-yellow/10 pt-4">
            <h4 className="text-sm text-elec-yellow mb-2">Contact Training Center</h4>
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
                  <label className="text-sm">Course interest</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {center.courses.map((course) => (
                        <SelectItem key={course} value={course}>{course}</SelectItem>
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
                Contact Center
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingCenterDetailsModal;
