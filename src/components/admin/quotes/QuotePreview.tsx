
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface QuotePreviewProps {
  quoteData: any;
}

const QuotePreview = ({ quoteData }: QuotePreviewProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-white text-black print:shadow-none">
        <CardContent className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold text-elec-dark">QUOTE</h1>
              <div className="mt-2 text-sm">
                <p className="font-medium">ElecMate Ltd</p>
                <p>123 Sparky Lane</p>
                <p>London, EC1A 1BB</p>
                <p>info@elecmate.co.uk</p>
                <p>07700 900000</p>
              </div>
            </div>
            <div className="text-right">
              <Badge className="bg-elec-yellow text-black mb-2">Quote #{quoteData.quoteNumber}</Badge>
              <div className="text-sm">
                <p><span className="font-medium">Issue Date:</span> {quoteData.issueDate}</p>
                <p><span className="font-medium">Valid Until:</span> {quoteData.validUntil}</p>
              </div>
            </div>
          </div>

          {/* Client Details */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2 text-elec-dark">Client Details</h2>
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-medium">{quoteData.clientInfo.name}</p>
              <p>{quoteData.clientInfo.address}</p>
            </div>
          </div>

          {/* Job Details */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2 text-elec-dark">Job Details</h2>
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-medium mb-2">
                {quoteData.jobDetails.type === "rewire" && "Full House Rewire"}
                {quoteData.jobDetails.type === "eicr" && "Electrical Installation Condition Report (EICR)"}
                {quoteData.jobDetails.type === "consumer_unit" && "Consumer Unit Replacement"}
                {quoteData.jobDetails.type === "ev_charger" && "EV Charger Installation"}
                {" - "}
                {quoteData.jobDetails.bedrooms} bedroom {quoteData.jobDetails.propertyType}
              </p>
              <p>{quoteData.jobDetails.scopeOfWork}</p>
              {quoteData.jobDetails.additionalRequirements && (
                <p className="mt-2"><span className="font-medium">Additional Requirements:</span> {quoteData.jobDetails.additionalRequirements}</p>
              )}
            </div>
          </div>

          {/* Materials */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2 text-elec-dark">Materials & Labour</h2>
            <table className="w-full">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="p-2 border-b">Description</th>
                  <th className="p-2 border-b text-center">Qty</th>
                  <th className="p-2 border-b text-right">Unit Price</th>
                  <th className="p-2 border-b text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {quoteData.materials.map((item: any, index: number) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{item.description}</td>
                    <td className="p-2 text-center">{item.quantity}</td>
                    <td className="p-2 text-right">{formatCurrency(item.unitPrice)}</td>
                    <td className="p-2 text-right">{formatCurrency(item.quantity * item.unitPrice)}</td>
                  </tr>
                ))}
                <tr className="border-b">
                  <td className="p-2">Labour ({quoteData.labour.days} days)</td>
                  <td className="p-2 text-center">{quoteData.labour.days}</td>
                  <td className="p-2 text-right">{formatCurrency(quoteData.labour.rate)}</td>
                  <td className="p-2 text-right">{formatCurrency(quoteData.labour.total)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="mb-8">
            <div className="flex justify-end">
              <div className="w-64">
                <div className="flex justify-between py-1">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(quoteData.financials.subtotal)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>VAT (20%):</span>
                  <span>{formatCurrency(quoteData.financials.vat)}</span>
                </div>
                <div className="flex justify-between py-1 font-bold text-lg">
                  <span>Total:</span>
                  <span>{formatCurrency(quoteData.financials.total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div>
            <h2 className="text-lg font-semibold mb-2 text-elec-dark">Terms & Conditions</h2>
            <div className="text-sm text-gray-700">
              <p>1. This quote is valid for 30 days from the issue date.</p>
              <p>2. A 25% deposit is required to secure the booking.</p>
              <p>3. Final payment is due upon completion of work.</p>
              <p>4. All electrical work is carried out in compliance with BS 7671 (IET Wiring Regulations).</p>
              <p>5. Any additional work not specified in this quote will be charged separately.</p>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Thank you for your business!</p>
            <p>ElecMate Ltd | Registration No: 12345678 | VAT No: GB123456789</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuotePreview;
