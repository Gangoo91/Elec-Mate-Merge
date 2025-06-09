
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Target, Users, BookOpen, Award, TrendingUp, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CareerPlanningTab = () => {
  const { toast } = useToast();
  
  const [careerGoal, setCareerGoal] = useState({
    short_term_goal: "",
    long_term_goal: "",
    target_role: "",
    target_timeline: "",
    development_areas: "",
    action_steps: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just show a toast - this would be saved to database in full implementation
    toast({
      title: "Career Plan Updated",
      description: "Your career development plan has been saved."
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Level</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Apprentice</div>
            <p className="text-xs text-muted-foreground">
              Level 3 Electrical
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Milestone</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Qualified</div>
            <p className="text-xs text-muted-foreground">
              Electrician (Level 3)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Timeline</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18m</div>
            <p className="text-xs text-muted-foreground">
              Estimated completion
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Career Development Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="short_term_goal">Short-term Goal (6-12 months)</Label>
                <Textarea
                  id="short_term_goal"
                  placeholder="e.g. Complete Level 3 apprenticeship, gain AM2 qualification"
                  value={careerGoal.short_term_goal}
                  onChange={(e) => setCareerGoal(prev => ({ ...prev, short_term_goal: e.target.value }))}
                  rows={2}
                />
              </div>
              
              <div>
                <Label htmlFor="long_term_goal">Long-term Goal (2-5 years)</Label>
                <Textarea
                  id="long_term_goal"
                  placeholder="e.g. Become a qualified electrician, start own electrical business"
                  value={careerGoal.long_term_goal}
                  onChange={(e) => setCareerGoal(prev => ({ ...prev, long_term_goal: e.target.value }))}
                  rows={2}
                />
              </div>
              
              <div>
                <Label htmlFor="target_role">Target Role</Label>
                <Select value={careerGoal.target_role} onValueChange={(value) => setCareerGoal(prev => ({ ...prev, target_role: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="qualified_electrician">Qualified Electrician</SelectItem>
                    <SelectItem value="senior_electrician">Senior Electrician</SelectItem>
                    <SelectItem value="electrical_supervisor">Electrical Supervisor</SelectItem>
                    <SelectItem value="electrical_contractor">Electrical Contractor</SelectItem>
                    <SelectItem value="electrical_inspector">Electrical Inspector</SelectItem>
                    <SelectItem value="electrical_designer">Electrical Designer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="development_areas">Key Development Areas</Label>
                <Textarea
                  id="development_areas"
                  placeholder="e.g. Industrial installations, renewable energy systems, project management"
                  value={careerGoal.development_areas}
                  onChange={(e) => setCareerGoal(prev => ({ ...prev, development_areas: e.target.value }))}
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="action_steps">Action Steps</Label>
                <Textarea
                  id="action_steps"
                  placeholder="e.g. 1. Complete current modules, 2. Gain additional certifications, 3. Network with industry professionals"
                  value={careerGoal.action_steps}
                  onChange={(e) => setCareerGoal(prev => ({ ...prev, action_steps: e.target.value }))}
                  rows={3}
                />
              </div>
              
              <Button type="submit" className="w-full">
                Save Career Plan
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Career Pathways
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Traditional Route</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>1. Complete Apprenticeship (18-24 months)</div>
                  <div>2. Qualified Electrician (JIB ECS Card)</div>
                  <div>3. Gain Experience (2-3 years)</div>
                  <div>4. Advanced Qualifications</div>
                  <div>5. Specialisation or Management</div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Specialisation Options</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>• Industrial Installations</div>
                  <div>• Renewable Energy Systems</div>
                  <div>• Building Management Systems</div>
                  <div>• Fire & Security Systems</div>
                  <div>• Motor Control & Automation</div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Business Route</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>1. Gain Qualified Status</div>
                  <div>2. Build Client Base</div>
                  <div>3. Business Skills Training</div>
                  <div>4. Start Contracting Business</div>
                  <div>5. Grow & Expand</div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Further Education</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>• HNC/HND Electrical Engineering</div>
                  <div>• Degree in Electrical Engineering</div>
                  <div>• Project Management Qualifications</div>
                  <div>• Health & Safety Certifications</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CareerPlanningTab;
