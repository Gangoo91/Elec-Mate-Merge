
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Users, Calendar, BarChart4, CircleDollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const BusinessManagement = () => {
  // Remove the handleAction function that triggers toasts
  // Instead use a simple console.log for now
  const handleAction = (action: string) => {
    console.log(`${action} action triggered`);
    // Toast notification removed
  };

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Business Management</h1>
          <p className="text-muted-foreground">
            Track clients, invoices, expenses and financial data.
          </p>
        </div>
        <Link to="/electrician-tools/admin">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Admin Tools
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="invoices" className="border-elec-yellow/20 bg-elec-gray rounded-md mb-4">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-elec-yellow" />
                <span className="font-medium">Invoices</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="border-elec-yellow/20 bg-elec-dark">
                  <CardHeader>
                    <CardTitle>Create New Invoice</CardTitle>
                    <CardDescription>Generate a new invoice for a client.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full" 
                      onClick={() => handleAction("Create Invoice")}
                    >
                      Create Invoice
                    </Button>
                  </CardContent>
                </Card>
                <Card className="border-elec-yellow/20 bg-elec-dark">
                  <CardHeader>
                    <CardTitle>Recent Invoices</CardTitle>
                    <CardDescription>View and manage recent invoices.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full" 
                      onClick={() => handleAction("View Invoices")}
                    >
                      View Invoices
                    </Button>
                  </CardContent>
                </Card>
                <Card className="border-elec-yellow/20 bg-elec-dark">
                  <CardHeader>
                    <CardTitle>Invoice Templates</CardTitle>
                    <CardDescription>Customise your invoice templates.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full" 
                      onClick={() => handleAction("Customise Templates")}
                    >
                      Customise Templates
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="clients" className="border-elec-yellow/20 bg-elec-gray rounded-md mb-4">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-elec-yellow" />
                <span className="font-medium">Clients</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="border-elec-yellow/20 bg-elec-dark">
                  <CardHeader>
                    <CardTitle>Add New Client</CardTitle>
                    <CardDescription>Add a new client to your database.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full" 
                      onClick={() => handleAction("Add Client")}
                    >
                      Add Client
                    </Button>
                  </CardContent>
                </Card>
                <Card className="border-elec-yellow/20 bg-elec-dark">
                  <CardHeader>
                    <CardTitle>Client Directory</CardTitle>
                    <CardDescription>View and manage all your clients.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full" 
                      onClick={() => handleAction("View Clients")}
                    >
                      View Clients
                    </Button>
                  </CardContent>
                </Card>
                <Card className="border-elec-yellow/20 bg-elec-dark">
                  <CardHeader>
                    <CardTitle>Client Communications</CardTitle>
                    <CardDescription>Send updates and notifications to clients.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full" 
                      onClick={() => handleAction("Send Communications")}
                    >
                      Send Communications
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="appointments" className="border-elec-yellow/20 bg-elec-gray rounded-md mb-4">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-elec-yellow" />
                <span className="font-medium">Appointments</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="border-elec-yellow/20 bg-elec-dark">
                  <CardHeader>
                    <CardTitle>Schedule Appointment</CardTitle>
                    <CardDescription>Create a new appointment.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full" 
                      onClick={() => handleAction("Schedule Appointment")}
                    >
                      Schedule
                    </Button>
                  </CardContent>
                </Card>
                <Card className="border-elec-yellow/20 bg-elec-dark">
                  <CardHeader>
                    <CardTitle>Calendar View</CardTitle>
                    <CardDescription>View your schedule in a calendar format.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full" 
                      onClick={() => handleAction("View Calendar")}
                    >
                      Open Calendar
                    </Button>
                  </CardContent>
                </Card>
                <Card className="border-elec-yellow/20 bg-elec-dark">
                  <CardHeader>
                    <CardTitle>Appointment Settings</CardTitle>
                    <CardDescription>Configure appointment reminders and notifications.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full" 
                      onClick={() => handleAction("Configure Settings")}
                    >
                      Configure
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="finances" className="border-elec-yellow/20 bg-elec-gray rounded-md mb-4">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center gap-2">
                <CircleDollarSign className="h-5 w-5 text-elec-yellow" />
                <span className="font-medium">Finances</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="border-elec-yellow/20 bg-elec-dark">
                  <CardHeader>
                    <CardTitle>Expense Tracking</CardTitle>
                    <CardDescription>Record and categorise business expenses.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full" 
                      onClick={() => handleAction("Track Expenses")}
                    >
                      Track Expenses
                    </Button>
                  </CardContent>
                </Card>
                <Card className="border-elec-yellow/20 bg-elec-dark">
                  <CardHeader>
                    <CardTitle>Income Overview</CardTitle>
                    <CardDescription>View summaries of business income.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full" 
                      onClick={() => handleAction("View Income")}
                    >
                      View Income
                    </Button>
                  </CardContent>
                </Card>
                <Card className="border-elec-yellow/20 bg-elec-dark">
                  <CardHeader>
                    <CardTitle>Financial Reports</CardTitle>
                    <CardDescription>Generate detailed financial reports.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full" 
                      onClick={() => handleAction("Generate Reports")}
                    >
                      Generate Reports
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="reports" className="border-elec-yellow/20 bg-elec-gray rounded-md mb-4">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center gap-2">
                <BarChart4 className="h-5 w-5 text-elec-yellow" />
                <span className="font-medium">Reports</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="border-elec-yellow/20 bg-elec-dark">
                  <CardHeader>
                    <CardTitle>Business Performance</CardTitle>
                    <CardDescription>View overall business performance metrics.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full" 
                      onClick={() => handleAction("View Performance")}
                    >
                      View Metrics
                    </Button>
                  </CardContent>
                </Card>
                <Card className="border-elec-yellow/20 bg-elec-dark">
                  <CardHeader>
                    <CardTitle>Client Analysis</CardTitle>
                    <CardDescription>Analyse client data and relationships.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full" 
                      onClick={() => handleAction("Analyse Clients")}
                    >
                      Analyse
                    </Button>
                  </CardContent>
                </Card>
                <Card className="border-elec-yellow/20 bg-elec-dark">
                  <CardHeader>
                    <CardTitle>Export Data</CardTitle>
                    <CardDescription>Export business data for accounting purposes.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full" 
                      onClick={() => handleAction("Export Data")}
                    >
                      Export
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default BusinessManagement;
