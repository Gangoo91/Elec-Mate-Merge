import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

export const BMSModule7Section2FAQ = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              What are function blocks in BMS programming?
            </AccordionTrigger>
            <AccordionContent className="text-foreground">
              Function blocks are graphical building blocks used to create control logic in BMS programming. They represent 
              specific functions like AND/OR gates, timers, comparators, and switching blocks that process inputs and 
              generate outputs, making complex control sequences easier to understand and maintain.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              What does Boolean logic use as its two states?
            </AccordionTrigger>
            <AccordionContent className="text-foreground">
              Boolean logic uses True (1) and False (0) as its two basic states. These binary conditions form the 
              foundation of all digital decision-making in BMS systems, allowing complex control sequences to be 
              broken down into simple logical operations.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              What are the three components of PID control?
            </AccordionTrigger>
            <AccordionContent className="text-foreground">
              The three components of PID control are: Proportional (P) - reacts to the size of the current error; 
              Integral (I) - reacts to how long the error has existed, correcting long-term drift; and Derivative (D) - 
              reacts to the rate of change, predicting future errors and improving stability.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              Which part of PID corrects long-term offset from setpoint?
            </AccordionTrigger>
            <AccordionContent className="text-foreground">
              The Integral (I) component corrects long-term offset from setpoint. It accumulates error over time and 
              gradually increases the control output to eliminate steady-state drift that the Proportional component 
              alone cannot correct, ensuring the system reaches and maintains the desired setpoint.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              Why is programming/testing done with electricians present?
            </AccordionTrigger>
            <AccordionContent className="text-foreground">
              Programming and testing is done with electricians present because they can verify that programmed logic 
              matches the physical installation, operate switches and equipment during testing, confirm that safety 
              interlocks work correctly, and identify any discrepancies between programmed behaviour and actual 
              physical responses of the system.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              What is the difference between sequential control and PID control?
            </AccordionTrigger>
            <AccordionContent className="text-foreground">
              Sequential control manages step-by-step processes and equipment startup/shutdown sequences with specific 
              timing and conditions between steps. PID control maintains continuous variables like temperature or pressure 
              at desired setpoints using proportional, integral, and derivative calculations. Sequential control is for 
              discrete operations; PID is for continuous regulation.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              How do safety interlocks differ from equipment protection interlocks?
            </AccordionTrigger>
            <AccordionContent className="text-foreground">
              Safety interlocks protect people and property with highest priority - they cannot be overridden and include 
              fire alarms, emergency stops, and gas detection. Equipment protection interlocks prevent damage to machinery 
              like minimum run times, flow proving, and thermal protection - these can typically be overridden by qualified 
              personnel when necessary for maintenance or troubleshooting.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              What causes PID loops to become unstable or oscillate?
            </AccordionTrigger>
            <AccordionContent className="text-foreground">
              PID instability is typically caused by incorrect tuning parameters: excessive proportional gain causes 
              overshoot and oscillation, too much integral action leads to windup and hunting, while excessive derivative 
              gain amplifies noise. Poor sensor calibration, valve stiction, deadtime in the process, or inadequate 
              system sizing can also cause control problems.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-9" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              How are alarms prioritised in BMS systems?
            </AccordionTrigger>
            <AccordionContent className="text-foreground">
              BMS alarms are typically prioritised into four levels: Critical (safety risk, immediate action required), 
              High (equipment damage potential, urgent response), Medium (performance impact, planned action), and Low 
              (information only, monitoring). Each level has different notification methods, escalation procedures, and 
              response time requirements.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-10" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              What is optimum start/stop control?
            </AccordionTrigger>
            <AccordionContent className="text-foreground">
              Optimum start/stop automatically calculates the best time to start heating/cooling systems before occupancy 
              to reach comfort conditions exactly when needed. It considers outside temperature, building thermal mass, 
              plant capacity, and desired indoor conditions. This saves energy by avoiding unnecessary early starts while 
              ensuring comfort is achieved on time.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};