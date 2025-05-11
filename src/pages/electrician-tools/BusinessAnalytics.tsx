
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BarChart4, LineChart, ChartPie, Download, CircleDollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const BusinessAnalytics = () => {
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
          <h1 className="text-3xl font-bold tracking-tight">Business Analytics</h1>
          <p className="text-muted-foreground">
            View performance metrics and reports for your business.
          </p>
        </div>
        <Link to="/electrician-tools/admin">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Admin Tools
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        <Accordion type="single" collapsible className="w-full" defaultValue="overview">
          <AccordionItem value="overview" className="border-elec-yellow/20 bg-elec-gray rounded-md mb-4">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center gap-2">
                <BarChart4 className="h-5 w-5 text-elec-yellow" />
                <span className="font-medium">Overview</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="border-elec-yellow/20 bg-elec-dark">
                  <CardHeader>
                    <CardTitle>Business Dashboard</CardTitle>
                    <CardDescription>View key performance indicators.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full" 
                      onClick={() => handleAction("View Dashboard")}
                    >
                      View Dashboard
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border-elec-yellow/20 bg-elec-dark">
                  <CardHeader>
                    <CardTitle>Growth Trends</CardTitle>
                    <CardDescription>Analyse business growth over time.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full" 
                      onClick={() => handleAction("View Growth Trends")}
                    >
                      View Trends
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border-elec-yellow/20 bg-elec-dark">
                  <CardHeader>
                    <CardTitle>Custom Analytics</CardTitle>
                    <CardDescription>Create custom business analytics reports.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full" 
                      onClick={() => handleAction("Create Custom Analytics")}
                    >
                      Create Report
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="financial" className="border-elec-yellow/20 bg-elec-gray rounded-md mb-4">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center gap-2">
                <CircleDollarSign className="h-5 w-5 text-elec-yellow" />
                <span className="font-medium">Financial</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <Card className="border-elec-yellow/20 bg-elec-dark">
                <CardHeader>
                  <CardTitle>Financial Overview</CardTitle>
                  <CardDescription>View revenue, expenses, and profit margins</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button 
                      className="w-full" 
                      onClick={() => handleAction("View Financial Overview")}
                    >
                      View Financial Data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="performance" className="border-elec-yellow/20 bg-elec-gray rounded-md mb-4">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-elec-yellow" />
                <span className="font-medium">Performance</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <Card className="border-elec-yellow/20 bg-elec-dark">
                <CardHeader>
                  <CardTitle>Job Performance</CardTitle>
                  <CardDescription>Analyse job completion time, customer satisfaction, and efficiency</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button 
                      className="w-full" 
                      onClick={() => handleAction("View Performance Metrics")}
                    >
                      View Metrics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="clients" className="border-elec-yellow/20 bg-elec-gray rounded-md mb-4">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center gap-2">
                <ChartPie className="h-5 w-5 text-elec-yellow" />
                <span className="font-medium">Client Analysis</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <Card className="border-elec-yellow/20 bg-elec-dark">
                <CardHeader>
                  <CardTitle>Client Analysis</CardTitle>
                  <CardDescription>Analyse client retention, acquisition, and lifetime value</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button 
                      className="w-full" 
                      onClick={() => handleAction("View Client Analysis")}
                    >
                      View Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="reports" className="border-elec-yellow/20 bg-elec-gray rounded-md mb-4">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center gap-2">
                <Download className="h-5 w-5 text-elec-yellow" />
                <span className="font-medium">Reports</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <Card className="border-elec-yellow/20 bg-elec-dark">
                <CardHeader>
                  <CardTitle>Generate Reports</CardTitle>
                  <CardDescription>Create and export business reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button 
                      className="w-full" 
                      onClick={() => handleAction("Generate Reports")}
                    >
                      Generate Reports
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default BusinessAnalytics;
