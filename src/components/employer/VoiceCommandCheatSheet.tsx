import { useState } from "react";
import { Search, Navigation, FormInput, Users, Briefcase, MapPin, PoundSterling, Shield, CheckCircle, Plus, RefreshCw, MessageSquare, Mail, Phone, ChevronDown, ChevronRight, Mic, Monitor } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";

interface VoiceCommand {
  name: string;
  description: string;
  examples: string[];
}

interface CommandCategory {
  category: string;
  icon: React.ElementType;
  colour: string;
  commands: VoiceCommand[];
}

const COMMAND_DATA: CommandCategory[] = [
  {
    category: "Navigation (40 Sections)",
    icon: Navigation,
    colour: "bg-blue-500/20 text-blue-400",
    commands: [
      { name: "navigate_to", description: "Navigate to any section", examples: ["Go to quotes", "Show me timesheets", "Open the jobs section", "Take me to employees", "Show people hub", "Open finance", "Go to tracking", "Show photo gallery"] },
      { name: "open_dialog", description: "Open a form dialog", examples: ["Create a new quote", "Add a new job", "Open the invoice form", "Add an employee", "New expense", "Post a vacancy"] },
      { name: "go_back", description: "Return to previous page", examples: ["Go back", "Return to previous page", "Back"] },
      { name: "close_dialog", description: "Close current dialog", examples: ["Close this", "Cancel", "Never mind"] },
    ],
  },
  {
    category: "UI Controls",
    icon: Monitor,
    colour: "bg-sky-500/20 text-sky-400",
    commands: [
      { name: "refresh_data", description: "Refresh current view data", examples: ["Refresh", "Update the list", "Reload", "Refresh the data"] },
      { name: "toggle_view", description: "Switch view mode", examples: ["Show as grid", "Switch to kanban", "List view", "Grid view", "Kanban view"] },
      { name: "filter_by", description: "Filter current data", examples: ["Show only pending", "Filter by Mike", "Just overdue", "Only active jobs", "Show completed"] },
      { name: "search_for", description: "Search in current section", examples: ["Search for Smith", "Find the kitchen job", "Look for Mike", "Search expenses for fuel"] },
      { name: "scroll_to", description: "Scroll to a section", examples: ["Scroll to the bottom", "Go to the top", "Show me the notes section"] },
    ],
  },
  {
    category: "Form Interaction",
    icon: FormInput,
    colour: "bg-purple-500/20 text-purple-400",
    commands: [
      { name: "fill_field", description: "Fill a form field", examples: ["The client is ABC Ltd", "Set the value to £5000", "The title is Kitchen Rewire"] },
      { name: "select_option", description: "Select from dropdown", examples: ["Select pending", "Choose Mike as the worker", "Pick urgent priority"] },
      { name: "toggle_field", description: "Toggle a checkbox/switch", examples: ["Enable notifications", "Turn on tracking", "Disable reminders"] },
      { name: "set_date", description: "Set a date field", examples: ["Set the start date to next Monday", "Due date is 15th January", "Deadline is end of month"] },
      { name: "add_labour_item", description: "Add labour to quote/invoice", examples: ["Add 8 hours of first fix at £45 per hour", "Include 4 hours testing at £50"] },
      { name: "add_material_item", description: "Add materials to quote/invoice", examples: ["Add 10 sockets at £3.50 each", "Include 50 metres of cable at £2 per metre"] },
      { name: "remove_item", description: "Remove a line item", examples: ["Remove the last item", "Delete the socket entry", "Take off the cable"] },
      { name: "submit_form", description: "Submit the current form", examples: ["Submit it", "Save the quote", "Create this job", "Confirm"] },
      { name: "clear_form", description: "Clear all form fields", examples: ["Clear the form", "Start again", "Reset everything"] },
    ],
  },
  {
    category: "Query - People",
    icon: Users,
    colour: "bg-green-500/20 text-green-400",
    commands: [
      { name: "get_employee_info", description: "Get employee details", examples: ["Tell me about Mike", "What's Sarah's info?", "Show me Dave's profile"] },
      { name: "list_employees", description: "List all employees", examples: ["Who's on the team?", "List all electricians", "Show me available workers"] },
      { name: "get_pending_timesheets", description: "Check pending approvals", examples: ["Any pending timesheets?", "Who needs approval?", "Outstanding timesheet requests"] },
      { name: "get_expiring_certifications", description: "Check expiring certs", examples: ["Any certifications expiring soon?", "Who needs training renewal?"] },
      { name: "get_leave_requests", description: "Check leave requests", examples: ["Any holiday requests pending?", "Who's off next week?", "Show leave calendar"] },
      { name: "get_worker_location", description: "Find a worker's location", examples: ["Where is Mike?", "Find Dave's location", "Where's Sarah right now?"] },
      { name: "get_all_worker_locations", description: "All worker locations", examples: ["Where is everyone?", "Show me all worker locations", "Team overview"] },
      { name: "get_nearest_worker", description: "Find nearest worker", examples: ["Who's nearest to the emergency call-out?", "Closest worker to London Bridge"] },
    ],
  },
  {
    category: "Query - Jobs",
    icon: Briefcase,
    colour: "bg-amber-500/20 text-amber-400",
    commands: [
      { name: "get_job_info", description: "Get job details", examples: ["Tell me about the Smith job", "What's the status of the kitchen rewire?"] },
      { name: "list_jobs", description: "List jobs by status", examples: ["What jobs are in progress?", "Show me pending quotes", "List completed jobs this month"] },
      { name: "get_job_workers", description: "Who's on a job", examples: ["Who's working on the Smith renovation?", "Which workers are at the Jones site?"] },
      { name: "get_job_timeline", description: "Job schedule/timeline", examples: ["When does the kitchen job start?", "What's the timeline for Smith?"] },
      { name: "get_todays_schedule", description: "Today's schedule", examples: ["What's happening today?", "Who's working where today?", "Today's jobs"] },
    ],
  },
  {
    category: "Query - Location",
    icon: MapPin,
    colour: "bg-rose-500/20 text-rose-400",
    commands: [
      { name: "get_job_location", description: "Get job address", examples: ["Where is the Smith job?", "Address for the kitchen rewire?"] },
      { name: "get_worker_eta", description: "Worker ETA", examples: ["When will Mike arrive?", "ETA for Dave at the Jones job"] },
      { name: "get_job_client_info", description: "Job client details", examples: ["Client details for the Smith job", "Who's the contact for the kitchen rewire?"] },
    ],
  },
  {
    category: "Query - Finance",
    icon: PoundSterling,
    colour: "bg-emerald-500/20 text-emerald-400",
    commands: [
      { name: "get_quote_info", description: "Quote details", examples: ["Tell me about quote Q-001", "What's in the Smith quote?"] },
      { name: "get_invoice_info", description: "Invoice details", examples: ["What's the status of invoice 123?", "Is the Jones invoice paid?"] },
      { name: "list_quotes", description: "List quotes", examples: ["Show me pending quotes", "What quotes were sent this week?"] },
      { name: "list_invoices", description: "List invoices", examples: ["Any overdue invoices?", "Unpaid invoices this month"] },
      { name: "get_job_value", description: "Job financials", examples: ["What's the value of the Smith job?", "Total invoiced for kitchen rewire"] },
      { name: "get_expense_claims", description: "Expense claims", examples: ["Any pending expense claims?", "Mike's expenses this month"] },
    ],
  },
  {
    category: "Query - Safety",
    icon: Shield,
    colour: "bg-red-500/20 text-red-400",
    commands: [
      { name: "get_rams_status", description: "RAMS for a job", examples: ["Is the RAMS approved for Smith?", "Check RAMS status for the kitchen job"] },
      { name: "get_incidents", description: "Recent incidents", examples: ["Any incidents this week?", "Recent safety reports"] },
      { name: "get_job_pack_status", description: "Job pack status", examples: ["Has the job pack been sent for Smith?", "Job pack acknowledgements"] },
    ],
  },
  {
    category: "Approvals",
    icon: CheckCircle,
    colour: "bg-teal-500/20 text-teal-400",
    commands: [
      { name: "approve_timesheet", description: "Approve timesheet", examples: ["Approve Mike's timesheet", "Accept all pending timesheets"] },
      { name: "reject_timesheet", description: "Reject timesheet", examples: ["Reject Sarah's timesheet", "Decline with reason: incorrect hours"] },
      { name: "approve_leave", description: "Approve leave request", examples: ["Approve Dave's holiday", "Accept the leave request"] },
      { name: "reject_leave", description: "Reject leave request", examples: ["Reject the leave request", "Decline - too many off that week"] },
      { name: "approve_expense", description: "Approve expense", examples: ["Approve Mike's expense claim", "Accept the materials expense"] },
      { name: "approve_rams", description: "Approve RAMS", examples: ["Approve the RAMS for Smith job", "Sign off the method statement"] },
    ],
  },
  {
    category: "Creation",
    icon: Plus,
    colour: "bg-indigo-500/20 text-indigo-400",
    commands: [
      { name: "create_job", description: "Create a new job", examples: ["Create a job for ABC Ltd at 123 High Street", "New job: Kitchen rewire for the Smiths"] },
      { name: "create_quote", description: "Create a quote", examples: ["Create a quote for the kitchen job", "New quote for Mr Jones"] },
      { name: "create_invoice", description: "Create an invoice", examples: ["Invoice the Smith job", "Create invoice from the accepted quote"] },
      { name: "assign_worker", description: "Assign to job", examples: ["Assign Mike to the Smith job", "Put Sarah on the kitchen rewire"] },
      { name: "create_task", description: "Add job task", examples: ["Add task: Install consumer unit", "Create checklist item for testing"] },
      { name: "log_time", description: "Log time entry", examples: ["Log 8 hours for Mike on Smith job today", "Record 4 hours testing yesterday"] },
      { name: "create_note", description: "Add a note", examples: ["Add note: Client wants extra sockets in kitchen", "Note for Smith job: Access via side gate"] },
      { name: "create_expense", description: "Create expense claim", examples: ["Create expense for £45 materials", "Log expense: cable from Edmundsons £120"] },
    ],
  },
  {
    category: "Updates",
    icon: RefreshCw,
    colour: "bg-orange-500/20 text-orange-400",
    commands: [
      { name: "update_job_status", description: "Change job status", examples: ["Mark Smith job as complete", "Move kitchen rewire to in progress"] },
      { name: "update_quote_status", description: "Change quote status", examples: ["Mark quote as accepted", "Set quote to declined"] },
      { name: "update_invoice_status", description: "Mark invoice paid", examples: ["Mark invoice 123 as paid", "Invoice received payment today"] },
      { name: "update_job_progress", description: "Update progress", examples: ["Smith job is 75% complete", "Update progress to 50%"] },
      { name: "reschedule_job", description: "Change job dates", examples: ["Reschedule Smith to next week", "Move start date to Monday"] },
      { name: "update_worker_status", description: "Change worker status", examples: ["Mark Mike as on leave", "Set Sarah to available"] },
    ],
  },
  {
    category: "Communication",
    icon: MessageSquare,
    colour: "bg-cyan-500/20 text-cyan-400",
    commands: [
      { name: "send_quote", description: "Email quote to client", examples: ["Send the quote to the client", "Email the Smith quote"] },
      { name: "send_invoice", description: "Email invoice", examples: ["Send the invoice", "Email invoice to client"] },
      { name: "send_reminder", description: "Send payment reminder", examples: ["Send a reminder for the overdue invoice", "Chase up the Jones payment"] },
      { name: "send_job_update_to_client", description: "Update client via portal", examples: ["Send update to client: Work completed today", "Message the Smith client"] },
    ],
  },
  {
    category: "Messaging",
    icon: Mail,
    colour: "bg-violet-500/20 text-violet-400",
    commands: [
      { name: "send_worker_message", description: "Message an employee", examples: ["Message Mike: bring extra cable tomorrow", "Notify Sarah about the schedule change"] },
      { name: "send_team_message", description: "Message job team", examples: ["Message the Smith team: meeting at 8am", "Notify all workers on Jones job"] },
      { name: "email_worker", description: "Email an employee", examples: ["Email Mike about the training tomorrow", "Send email to Sarah: certificate expiring"] },
    ],
  },
  {
    category: "Phone",
    icon: Phone,
    colour: "bg-pink-500/20 text-pink-400",
    commands: [
      { name: "get_employee_phone", description: "Get employee phone", examples: ["What's Mike's phone number?", "Get Sarah's mobile"] },
      { name: "get_client_phone", description: "Get client phone", examples: ["Client phone for the Smith job", "What's Mr Jones's number?"] },
      { name: "initiate_call", description: "Start a phone call", examples: ["Call Mike", "Ring the client for the kitchen job", "Phone Dave"] },
    ],
  },
];

export function VoiceCommandCheatSheet() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredData = COMMAND_DATA.map((category) => ({
    ...category,
    commands: category.commands.filter(
      (cmd) =>
        cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cmd.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cmd.examples.some((ex) =>
          ex.toLowerCase().includes(searchQuery.toLowerCase())
        )
    ),
  })).filter((category) => category.commands.length > 0);

  const totalCommands = COMMAND_DATA.reduce(
    (acc, cat) => acc + cat.commands.length,
    0
  );

  return (
    <Card className="border-border/50 bg-elec-gray/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-elec-yellow/10">
            <Mic className="h-5 w-5 text-elec-yellow" />
          </div>
          <div>
            <CardTitle className="text-lg">Voice Command Reference</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {totalCommands} commands across {COMMAND_DATA.length} categories
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search commands or phrases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-background/50"
          />
        </div>

        {/* Categories */}
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-2">
            {filteredData.map((category) => {
              const Icon = category.icon;
              const isOpen = openCategories.includes(category.category);

              return (
                <Collapsible
                  key={category.category}
                  open={isOpen || searchQuery.length > 0}
                  onOpenChange={() => toggleCategory(category.category)}
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-md ${category.colour}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="font-medium text-sm">
                        {category.category}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {category.commands.length}
                      </Badge>
                    </div>
                    {isOpen || searchQuery.length > 0 ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </CollapsibleTrigger>

                  <CollapsibleContent className="pt-2 pl-4">
                    <div className="space-y-3 border-l-2 border-border/50 pl-4">
                      {category.commands.map((cmd) => (
                        <div
                          key={cmd.name}
                          className="space-y-1.5 py-2"
                        >
                          <div className="flex items-center gap-2">
                            <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded text-elec-yellow">
                              {cmd.name}
                            </code>
                            <span className="text-sm text-muted-foreground">
                              {cmd.description}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {cmd.examples.map((example, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-background border border-border/50 rounded-full px-2.5 py-1 text-foreground/80"
                              >
                                "{example}"
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}

            {filteredData.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No commands match "{searchQuery}"</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
