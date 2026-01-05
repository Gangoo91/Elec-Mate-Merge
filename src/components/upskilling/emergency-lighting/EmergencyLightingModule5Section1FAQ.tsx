import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

export const EmergencyLightingModule5Section1FAQ = () => {
  const faqs = [
    {
      question: "Can initial inspection be skipped if the installation looks correct?",
      answer: "No — initial inspection is a mandatory requirement under BS 5266-1 and BS 7671 before any emergency lighting system can be energised or commissioned. Visual appearance alone cannot verify electrical safety, correct cable types, circuit protection adequacy, or compliance with design specifications. Hidden defects such as incorrect polarity, inadequate insulation resistance, wrong cable types in fire compartments, or circuit segregation failures can only be detected through systematic inspection and testing. Skipping initial inspection exposes the building to serious safety risks and makes the installer legally liable for any consequences of undetected defects."
    },
    {
      question: "What happens if defects are found during initial inspection?",
      answer: "All defects must be documented with severity classification (Critical, Major, or Minor). Critical defects (safety hazards, BS 7671 non-compliances) must be rectified immediately before the system can be energised. Major defects (design non-compliances, wrong components) must be corrected before certification can be issued. Minor defects (cosmetic issues, incomplete labelling) should be rectified but may not prevent energisation if they don't compromise safety or functionality. After rectification, affected areas must be re-inspected and re-tested to verify corrections before proceeding to commissioning. The verification electrician documents all defects, rectification actions, and re-inspection results for the certification records."
    },
    {
      question: "Who can carry out initial inspection and verification?",
      answer: "Initial inspection must be carried out by a competent person — a qualified electrician with specific knowledge of BS 5266-1, BS 7671, and emergency lighting system requirements. For larger or more complex installations, many clients specify that inspection must be conducted by an independent third-party verifier (not involved in the installation work) to ensure impartiality. The inspector must have access to calibrated test equipment, understand photometric requirements, and be able to interpret design drawings and specifications. Competence includes practical experience with emergency lighting systems, up-to-date knowledge of current standards, and the ability to identify non-compliances and safety hazards. Professional indemnity insurance is strongly recommended for all verification work."
    }
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <h4 className="font-semibold text-elec-yellow mb-2">{faq.question}</h4>
            <p className="text-foreground text-sm leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};