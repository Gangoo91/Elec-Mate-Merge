import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

export const SmartHomeModule6Section2FAQ = () => {
  return (
    <Card className="bg-elec-gray border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
          <HelpCircle className="h-7 w-7 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="compatibility" className="bg-elec-dark/50 border border-gray-600/30 rounded-lg px-4">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              How do I check if a device is compatible with a specific voice assistant?
            </AccordionTrigger>
            <AccordionContent className="text-foreground text-sm">
              <p className="mb-3">Check the device packaging or specifications for compatibility logos:</p>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Alexa:</strong> Look for "Works with Alexa" certification</li>
                <li>• <strong>Google:</strong> Look for "Works with Google Assistant" or "Made for Google" badges</li>
                <li>• <strong>HomeKit:</strong> Look for "Works with Apple HomeKit" certification</li>
              </ul>
              <p className="mt-3">You can also check compatibility lists on each platform's official website or app before purchase.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="multiple-assistants" className="bg-elec-dark/50 border border-gray-600/30 rounded-lg px-4">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              Can I use multiple voice assistants in the same home?
            </AccordionTrigger>
            <AccordionContent className="text-foreground text-sm">
              <p className="mb-3">Yes, many devices support multiple assistants simultaneously:</p>
              <ul className="space-y-1 ml-4">
                <li>• Many smart speakers now include both Alexa and Google Assistant</li>
                <li>• Some smart displays can switch between assistants</li>
                <li>• However, avoid confusion by designating primary assistants for specific rooms</li>
                <li>• Be aware that routines and scenes won't transfer between platforms</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="offline-functionality" className="bg-elec-dark/50 border border-gray-600/30 rounded-lg px-4">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              What happens to voice control during internet outages?
            </AccordionTrigger>
            <AccordionContent className="text-foreground text-sm">
              <p className="mb-3">Functionality varies by platform:</p>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Alexa & Google:</strong> Most features stop working without internet</li>
                <li>• <strong>HomeKit:</strong> Local commands continue working via Apple TV/HomePod hubs</li>
                <li>• <strong>Some hubs:</strong> SmartThings and Home Assistant can maintain local automation</li>
                <li>• <strong>Always inform clients</strong> about internet dependencies during setup</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="privacy-concerns" className="bg-elec-dark/50 border border-gray-600/30 rounded-lg px-4">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              How should I address client privacy concerns about voice assistants?
            </AccordionTrigger>
            <AccordionContent className="text-foreground text-sm">
              <div className="space-y-3">
                <p><strong>Be transparent about data collection:</strong></p>
                <ul className="space-y-1 ml-4">
                  <li>• Voice assistants record and store command history</li>
                  <li>• Data is used to improve voice recognition and suggest features</li>
                  <li>• Users can delete recordings and limit data sharing</li>
                </ul>
                <p><strong>Highlight privacy controls:</strong></p>
                <ul className="space-y-1 ml-4">
                  <li>• Show clients how to mute microphones when not needed</li>
                  <li>• Demonstrate voice recording deletion in assistant apps</li>
                  <li>• Explain local processing options (HomeKit) if privacy is crucial</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="setup-issues" className="bg-elec-dark/50 border border-gray-600/30 rounded-lg px-4">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              What are the most common setup problems and solutions?
            </AccordionTrigger>
            <AccordionContent className="text-foreground text-sm">
              <div className="space-y-3">
                <div>
                  <p className="font-medium mb-2">Device Discovery Issues:</p>
                  <ul className="space-y-1 ml-4 text-sm">
                    <li>• Ensure all devices are on same Wi-Fi network</li>
                    <li>• Check that device is in pairing/discovery mode</li>
                    <li>• Try restarting hub and rediscovering devices</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Voice Recognition Problems:</p>
                  <ul className="space-y-1 ml-4 text-sm">
                    <li>• Use simple, distinct names for devices and rooms</li>
                    <li>• Avoid similar-sounding device names</li>
                    <li>• Train voice recognition with multiple family members</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="device-names" className="bg-elec-dark/50 border border-gray-600/30 rounded-lg px-4">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              What are best practices for naming smart home devices?
            </AccordionTrigger>
            <AccordionContent className="text-foreground text-sm">
              <div className="space-y-3">
                <p><strong>Follow these naming conventions:</strong></p>
                <ul className="space-y-1 ml-4">
                  <li>• Use simple, easy-to-pronounce names</li>
                  <li>• Include room name: "Kitchen Lights", "Bedroom Fan"</li>
                  <li>• Avoid numbers: "Main Light" not "Light 1"</li>
                  <li>• Keep names short: "Hall Light" not "Hallway Ceiling Light Fixture"</li>
                  <li>• Use consistent room names throughout the system</li>
                </ul>
                <p className="mt-3"><strong>Group devices by room</strong> in assistant apps for easier "turn off bedroom" commands.</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};