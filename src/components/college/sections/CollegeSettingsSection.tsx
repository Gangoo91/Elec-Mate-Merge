import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { CollegeSectionHeader } from "@/components/college/CollegeSectionHeader";
import {
  Settings,
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  Bell,
  Shield,
  Users,
  Calendar,
  Clock,
  Save,
  Upload,
  Palette,
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CollegeSettingsSection() {
  const [hasChanges, setHasChanges] = useState(false);

  const handleInputChange = () => {
    setHasChanges(true);
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <CollegeSectionHeader
        title="College Settings"
        description="Manage your institution settings and preferences"
        actions={
          hasChanges && (
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              <span className="hidden sm:inline">Save Changes</span>
            </Button>
          )
        }
      />

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Institution Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <Building2 className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Logo
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">PNG or SVG, max 2MB</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Institution Name</Label>
                  <Input
                    defaultValue="City College of Engineering"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Short Name / Code</Label>
                  <Input
                    defaultValue="CCE"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  defaultValue="A leading provider of electrical and engineering qualifications in the region."
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                    Email Address
                  </Label>
                  <Input
                    type="email"
                    defaultValue="admin@citycollege.ac.uk"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                    Phone Number
                  </Label>
                  <Input
                    defaultValue="+44 20 1234 5678"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                    Website
                  </Label>
                  <Input
                    defaultValue="https://citycollege.ac.uk"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label>UKPRN</Label>
                  <Input
                    defaultValue="10001234"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                  Address
                </Label>
                <Textarea
                  defaultValue="123 Engineering Way, London, EC1A 1BB"
                  onChange={handleInputChange}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Branding
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Primary Colour</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      defaultValue="#2563eb"
                      className="w-16 h-10 p-1"
                      onChange={handleInputChange}
                    />
                    <Input defaultValue="#2563eb" className="flex-1" onChange={handleInputChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Secondary Colour</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      defaultValue="#10b981"
                      className="w-16 h-10 p-1"
                      onChange={handleInputChange}
                    />
                    <Input defaultValue="#10b981" className="flex-1" onChange={handleInputChange} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Email Notifications
              </CardTitle>
              <CardDescription>
                Configure which emails are sent from the system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label>Student Enrolment</Label>
                  <p className="text-xs text-muted-foreground">Notify when students are enrolled</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label>Attendance Alerts</Label>
                  <p className="text-xs text-muted-foreground">Alert when attendance drops below threshold</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label>ILP Review Reminders</Label>
                  <p className="text-xs text-muted-foreground">Remind tutors of upcoming ILP reviews</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label>Assessment Due Dates</Label>
                  <p className="text-xs text-muted-foreground">Notify students of upcoming assessments</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label>EPA Gateway Alerts</Label>
                  <p className="text-xs text-muted-foreground">Alert when students reach gateway</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label>Compliance Expiry Warnings</Label>
                  <p className="text-xs text-muted-foreground">Warn before staff compliance expires</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Notification Thresholds</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Attendance Alert Threshold (%)</Label>
                  <Input type="number" defaultValue="85" onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label>Compliance Warning (days before)</Label>
                  <Input type="number" defaultValue="90" onChange={handleInputChange} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Academic Settings */}
        <TabsContent value="academic" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Academic Year
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Current Academic Year</Label>
                  <Select defaultValue="2024-25">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2023-24">2023/24</SelectItem>
                      <SelectItem value="2024-25">2024/25</SelectItem>
                      <SelectItem value="2025-26">2025/26</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Year Start Date</Label>
                  <Input type="date" defaultValue="2024-09-01" onChange={handleInputChange} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Default Schedules
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Default Class Duration (minutes)</Label>
                  <Input type="number" defaultValue="180" onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label>ILP Review Frequency (weeks)</Label>
                  <Input type="number" defaultValue="6" onChange={handleInputChange} />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>OTJ Hours Target (per week)</Label>
                  <Input type="number" defaultValue="6" onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label>Attendance Register Window (minutes)</Label>
                  <Input type="number" defaultValue="30" onChange={handleInputChange} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4" />
                Cohort Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Default Cohort Size</Label>
                  <Input type="number" defaultValue="20" onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label>Maximum Cohort Size</Label>
                  <Input type="number" defaultValue="30" onChange={handleInputChange} />
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label>Auto-assign Tutor</Label>
                  <p className="text-xs text-muted-foreground">Automatically assign lead tutor to new cohorts</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Access Control
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label>Require Two-Factor Authentication</Label>
                  <p className="text-xs text-muted-foreground">All staff must use 2FA</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label>Password Expiry</Label>
                  <p className="text-xs text-muted-foreground">Require password change every 90 days</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label>Session Timeout</Label>
                  <p className="text-xs text-muted-foreground">Auto-logout after inactivity</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>Session Timeout Duration (minutes)</Label>
                <Input type="number" defaultValue="60" onChange={handleInputChange} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Data Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label>Auto-archive Completed Students</Label>
                  <p className="text-xs text-muted-foreground">Archive student records after completion</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>Archive After (months)</Label>
                <Input type="number" defaultValue="12" onChange={handleInputChange} />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label>Audit Logging</Label>
                  <p className="text-xs text-muted-foreground">Log all system changes</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Data Export</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">Export Students (CSV)</Button>
                <Button variant="outline" size="sm">Export Staff (CSV)</Button>
                <Button variant="outline" size="sm">Export Attendance (CSV)</Button>
                <Button variant="outline" size="sm">Full Data Export</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
