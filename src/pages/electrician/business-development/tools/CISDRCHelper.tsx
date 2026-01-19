import { useState } from "react";
import { Helmet } from "react-helmet";
import {
  Hammer,
  Package,
  Percent,
  Receipt,
  PoundSterling,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Info,
  Lightbulb,
  ChevronDown,
  BookOpen,
  Building,
  FileText,
} from "lucide-react";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  CalculatorCard,
  CalculatorInput,
  CalculatorResult,
  CALCULATOR_CONFIG,
} from "@/components/calculators/shared";

const currency = (n: number) => `£${n.toFixed(2)}`;

type Role = "contractor" | "subcontractor";

const CISDRCHelper = () => {
  const config = CALCULATOR_CONFIG["business"];

  const [role, setRole] = useState<Role>("subcontractor");
  const [cisRate, setCisRate] = useState("20");
  const [labour, setLabour] = useState("1000");
  const [materials, setMaterials] = useState("300");
  const [vatRegistered, setVatRegistered] = useState(true);
  const [drcApplies, setDrcApplies] = useState(true);
  const [vatRate, setVatRate] = useState("20");

  const [showCISGuide, setShowCISGuide] = useState(false);
  const [showDRCGuide, setShowDRCGuide] = useState(false);
  const [showCombinedGuide, setShowCombinedGuide] = useState(false);
  const [showReference, setShowReference] = useState(false);

  // Parse values
  const labourVal = parseFloat(labour) || 0;
  const materialsVal = parseFloat(materials) || 0;
  const cisRateVal = parseFloat(cisRate) || 0;
  const vatRateVal = parseFloat(vatRate) || 0;

  // Invoice logic:
  const subTotal = labourVal + materialsVal;
  const vat = vatRegistered && !drcApplies ? subTotal * (vatRateVal / 100) : 0;
  const cisDeduction =
    role === "subcontractor" ? labourVal * (cisRateVal / 100) : 0;
  const totalDueFromCustomer = subTotal + vat;
  const cashReceived = totalDueFromCustomer - cisDeduction;

  const getConditionalWarnings = () => {
    const warnings = [];
    if (role === "contractor" && cisRateVal > 0) {
      warnings.push({
        type: "info",
        text: "As a contractor, you deduct CIS from subcontractor payments, not your own invoices.",
      });
    }
    if (drcApplies && vatRegistered) {
      warnings.push({
        type: "info",
        text: "DRC applies - don't charge VAT on invoice. Your contractor accounts for it.",
      });
    }
    if (!drcApplies && vatRegistered) {
      warnings.push({
        type: "info",
        text: "Standard VAT applies - charge VAT on invoice as normal.",
      });
    }
    if (cisRateVal === 30) {
      warnings.push({
        type: "warning",
        text: "30% CIS rate applies to unregistered subcontractors. Higher deduction!",
      });
    }
    if (materialsVal > labourVal * 2 && role === "subcontractor") {
      warnings.push({
        type: "info",
        text: "Materials exceed labour significantly. Remember: CIS deduction only applies to labour.",
      });
    }
    return warnings;
  };

  const warnings = getConditionalWarnings();

  return (
    <div className="bg-gradient-to-b from-background via-background to-background">
      <Helmet>
        <title>CIS & DRC Helper for UK Electricians</title>
        <meta
          name="description"
          content="Calculate CIS deductions and DRC VAT rules for UK construction invoices."
        />
        <link rel="canonical" href="/electrician/business-development/tools/cis-drc" />
      </Helmet>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="p-2.5 rounded-xl border"
              style={{
                background: `linear-gradient(135deg, ${config.gradientFrom}20, ${config.gradientTo}20)`,
                borderColor: `${config.gradientFrom}30`,
              }}
            >
              <Receipt className="h-6 w-6 sm:h-7 sm:w-7" style={{ color: config.gradientFrom }} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                CIS & DRC Helper
              </h1>
              <p className="text-sm text-white/70">Calculate CIS deductions & DRC VAT rules</p>
            </div>
          </div>
          <SmartBackButton />
        </header>

        {/* Educational Content */}
        <div className="space-y-2">
        <Collapsible open={showCISGuide} onOpenChange={setShowCISGuide}>
          <div
            className="calculator-card overflow-hidden"
            style={{ borderColor: "#60a5fa15" }}
          >
            <CollapsibleTrigger className="agent-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <Lightbulb className="h-4 w-4 text-blue-400" />
                <span className="text-sm sm:text-base font-medium text-blue-300">
                  What is CIS?
                </span>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-white/80 transition-transform duration-200",
                  showCISGuide && "rotate-180"
                )}
              />
            </CollapsibleTrigger>

            <CollapsibleContent className="p-4 pt-0">
              <p className="text-sm text-white/70 mb-2">
                HMRC scheme where contractors deduct money from subcontractor
                payments and pass it to HMRC as advance tax payment.
              </p>
              <ul className="space-y-1 text-sm text-blue-200/80">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  Contractors must register and verify subcontractors
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  Deductions: 20% (registered), 30% (not registered), 0% (gross)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  Deducted from labour costs only, not materials
                </li>
              </ul>
            </CollapsibleContent>
          </div>
        </Collapsible>

        <Collapsible open={showDRCGuide} onOpenChange={setShowDRCGuide}>
          <div
            className="calculator-card overflow-hidden"
            style={{ borderColor: "#60a5fa15" }}
          >
            <CollapsibleTrigger className="agent-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <Lightbulb className="h-4 w-4 text-blue-400" />
                <span className="text-sm sm:text-base font-medium text-blue-300">
                  What is DRC?
                </span>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-white/80 transition-transform duration-200",
                  showDRCGuide && "rotate-180"
                )}
              />
            </CollapsibleTrigger>

            <CollapsibleContent className="p-4 pt-0">
              <p className="text-sm text-white/70 mb-2">
                VAT rule where the customer (contractor) accounts for VAT, not
                the supplier (subcontractor).
              </p>
              <ul className="space-y-1 text-sm text-blue-200/80">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  Applies to specified CIS building/construction services
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  Started 1 March 2021
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  Subcontractor doesn't charge VAT on invoice
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  Prevents VAT fraud in construction supply chains
                </li>
              </ul>
            </CollapsibleContent>
          </div>
        </Collapsible>

        <Collapsible open={showCombinedGuide} onOpenChange={setShowCombinedGuide}>
          <div
            className="calculator-card overflow-hidden"
            style={{ borderColor: "#60a5fa15" }}
          >
            <CollapsibleTrigger className="agent-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <Lightbulb className="h-4 w-4 text-blue-400" />
                <span className="text-sm sm:text-base font-medium text-blue-300">
                  When do both apply?
                </span>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-white/80 transition-transform duration-200",
                  showCombinedGuide && "rotate-180"
                )}
              />
            </CollapsibleTrigger>

            <CollapsibleContent className="p-4 pt-0">
              <p className="text-sm text-white/70 mb-2">
                If you're a CIS subcontractor working for a CIS contractor: Both
                CIS and DRC apply.
              </p>
              <ul className="space-y-1 text-sm text-blue-200/80">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  Your invoice shows: Labour + Materials (no VAT)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  CIS deduction applies to labour only
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  Contractor accounts for the VAT separately
                </li>
              </ul>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </div>

      {/* Input Section */}
      <CalculatorCard
        category="business"
        title="CIS & DRC Helper"
        description="Calculate CIS deductions and DRC VAT rules for UK construction invoices"
        badge="Tax"
      >
        {/* Role Selection */}
        <div className="flex items-center gap-2 mb-3">
          <Building className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium text-white/80">Your Role</span>
        </div>

        <div className="w-full flex rounded-xl overflow-hidden border border-white/10 mb-4">
          <button
            className={cn(
              "h-14 flex-1 px-4 font-medium transition-colors flex items-center justify-center gap-2 touch-manipulation",
              role === "contractor"
                ? "text-black"
                : "text-white/90 hover:bg-white/5"
            )}
            style={
              role === "contractor"
                ? {
                    background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                  }
                : undefined
            }
            onClick={() => setRole("contractor")}
          >
            {role === "contractor" && <CheckCircle2 className="w-4 h-4" />}
            Contractor
          </button>
          <button
            className={cn(
              "h-14 flex-1 px-4 font-medium transition-colors flex items-center justify-center gap-2 touch-manipulation",
              role === "subcontractor"
                ? "text-black"
                : "text-white/90 hover:bg-white/5"
            )}
            style={
              role === "subcontractor"
                ? {
                    background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                  }
                : undefined
            }
            onClick={() => setRole("subcontractor")}
          >
            {role === "subcontractor" && <CheckCircle2 className="w-4 h-4" />}
            Subcontractor
          </button>
        </div>
        <p className="text-xs text-white mb-4 -mt-2">
          Contractor: You hire subcontractors. Subcontractor: You work for
          contractors.
        </p>

        {/* Job Costs */}
        <div className="flex items-center gap-2 mb-3">
          <Hammer className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium text-white/80">Job Costs</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <CalculatorInput
            label="Labour (ex VAT)"
            unit="£"
            type="text"
            inputMode="decimal"
            value={labour}
            onChange={setLabour}
            placeholder="e.g., 1000"
            hint="Day rate: £200-400"
          />

          <CalculatorInput
            label="Materials (ex VAT)"
            unit="£"
            type="text"
            inputMode="decimal"
            value={materials}
            onChange={setMaterials}
            placeholder="e.g., 300"
            hint="Cables, fittings"
          />
        </div>

        {/* Tax Settings */}
        <div className="flex items-center gap-2 mb-3 mt-4">
          <Percent className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium text-white/80">Tax Settings</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <CalculatorInput
            label="CIS Rate"
            unit="%"
            type="text"
            inputMode="decimal"
            value={cisRate}
            onChange={setCisRate}
            placeholder="e.g., 20"
            hint="20%/30%/0%"
          />

          <CalculatorInput
            label="VAT Rate"
            unit="%"
            type="text"
            inputMode="decimal"
            value={vatRate}
            onChange={setVatRate}
            placeholder="e.g., 20"
            hint="Standard: 20%"
          />
        </div>

        {/* VAT & DRC Status */}
        <div className="flex items-center gap-2 mb-3 mt-4">
          <Receipt className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium text-white/80">VAT & DRC Status</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <span className="text-xs font-medium text-white">
              VAT registered?
            </span>
            <div className="w-full flex rounded-xl overflow-hidden border border-white/10">
              <button
                className={cn(
                  "h-12 flex-1 px-3 font-medium transition-colors flex items-center justify-center gap-1 touch-manipulation text-sm",
                  vatRegistered
                    ? "text-black"
                    : "text-white/90 hover:bg-white/5"
                )}
                style={
                  vatRegistered
                    ? {
                        background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                      }
                    : undefined
                }
                onClick={() => setVatRegistered(true)}
              >
                {vatRegistered && <CheckCircle2 className="w-3 h-3" />}
                Yes
              </button>
              <button
                className={cn(
                  "h-12 flex-1 px-3 font-medium transition-colors flex items-center justify-center gap-1 touch-manipulation text-sm",
                  !vatRegistered
                    ? "text-black"
                    : "text-white/90 hover:bg-white/5"
                )}
                style={
                  !vatRegistered
                    ? {
                        background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                      }
                    : undefined
                }
                onClick={() => setVatRegistered(false)}
              >
                {!vatRegistered && <XCircle className="w-3 h-3" />}
                No
              </button>
            </div>
            <p className="text-xs text-white">Required if turnover &gt;£90k</p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-medium text-white">
              DRC applies?
            </span>
            <div className="w-full flex rounded-xl overflow-hidden border border-white/10">
              <button
                className={cn(
                  "h-12 flex-1 px-3 font-medium transition-colors flex items-center justify-center gap-1 touch-manipulation text-sm",
                  drcApplies ? "text-black" : "text-white/90 hover:bg-white/5"
                )}
                style={
                  drcApplies
                    ? {
                        background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                      }
                    : undefined
                }
                onClick={() => setDrcApplies(true)}
              >
                {drcApplies && <CheckCircle2 className="w-3 h-3" />}
                Yes
              </button>
              <button
                className={cn(
                  "h-12 flex-1 px-3 font-medium transition-colors flex items-center justify-center gap-1 touch-manipulation text-sm",
                  !drcApplies ? "text-black" : "text-white/90 hover:bg-white/5"
                )}
                style={
                  !drcApplies
                    ? {
                        background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                      }
                    : undefined
                }
                onClick={() => setDrcApplies(false)}
              >
                {!drcApplies && <XCircle className="w-3 h-3" />}
                No
              </button>
            </div>
            <p className="text-xs text-white">CIS construction since 2021</p>
          </div>
        </div>
      </CalculatorCard>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="space-y-2">
          {warnings.map((warning, idx) => (
            <div
              key={idx}
              className={cn(
                "flex items-start gap-3 p-3 rounded-xl border",
                warning.type === "warning"
                  ? "bg-orange-500/10 border-orange-500/30"
                  : "bg-blue-500/10 border-blue-500/30"
              )}
            >
              <AlertCircle
                className={cn(
                  "w-4 h-4 flex-shrink-0 mt-0.5",
                  warning.type === "warning" ? "text-orange-400" : "text-blue-400"
                )}
              />
              <p className="text-sm text-white/80">{warning.text}</p>
            </div>
          ))}
        </div>
      )}

      {/* Invoice Breakdown */}
      <CalculatorResult category="business">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium text-white/80">
            Invoice Breakdown
          </span>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-white/70">
              <Hammer className="w-4 h-4 text-blue-400/70" />
              Labour cost
            </span>
            <strong className="text-white">{currency(labourVal)}</strong>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-white/70">
              <Package className="w-4 h-4 text-blue-400/70" />
              Materials cost
            </span>
            <strong className="text-white">{currency(materialsVal)}</strong>
          </div>

          <div className="border-t border-white/10 pt-3">
            <div className="flex items-center justify-between py-2 bg-white/5 px-3 rounded-lg">
              <span className="font-semibold text-white">Sub-total (ex VAT)</span>
              <strong className="text-white text-lg">{currency(subTotal)}</strong>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-white/70">
              <Receipt className="w-4 h-4 text-blue-400/70" />
              VAT to charge
              {vat === 0 && drcApplies && (
                <Info className="w-3 h-3 text-blue-400" />
              )}
            </span>
            <strong className="text-white">{currency(vat)}</strong>
          </div>
          {vat === 0 && drcApplies && (
            <p className="text-xs text-blue-400 pl-6">
              £0 because DRC applies - contractor accounts for VAT
            </p>
          )}

          <div className="border-t border-white/10 pt-3">
            <div className="flex items-center justify-between py-2 bg-white/5 px-3 rounded-lg">
              <span className="font-semibold text-white">Invoice total</span>
              <strong className="text-white text-lg">
                {currency(totalDueFromCustomer)}
              </strong>
            </div>
          </div>

          {cisDeduction > 0 && (
            <>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-white/70">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  Less: CIS deduction ({cisRateVal}%)
                </span>
                <strong className="text-red-400">
                  -{currency(cisDeduction)}
                </strong>
              </div>
              <p className="text-xs text-white pl-6">
                Calculated on labour only: {currency(labourVal)} × {cisRateVal}%
              </p>
            </>
          )}

          <div className="border-t border-white/10 pt-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-3 bg-green-500/10 border border-green-500/30 px-4 rounded-xl">
              <span className="flex items-center gap-2 font-bold text-white">
                <PoundSterling className="w-5 h-5 text-green-400" />
                Cash you receive
              </span>
              <strong
                className="text-2xl"
                style={{
                  backgroundImage: `linear-gradient(135deg, #22c55e, #10b981)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {currency(cashReceived)}
              </strong>
            </div>
          </div>
        </div>
      </CalculatorResult>

      {/* What This Means */}
      {role === "subcontractor" && cisDeduction > 0 && (
        <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-500/10">
          <div className="flex items-center gap-2 mb-3">
            <Info className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">
              What This Means
            </span>
          </div>
          <ul className="space-y-2 text-sm text-blue-200/80">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              You invoice{" "}
              <strong className="text-white">
                {currency(totalDueFromCustomer)}
              </strong>{" "}
              but receive{" "}
              <strong className="text-green-400">{currency(cashReceived)}</strong>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              Contractor pays{" "}
              <strong className="text-white">{currency(cisDeduction)}</strong>{" "}
              directly to HMRC as your tax
            </li>
            {drcApplies && (
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                Contractor accounts for{" "}
                <strong className="text-white">
                  {currency(subTotal * (vatRateVal / 100))}
                </strong>{" "}
                VAT to HMRC (not on your invoice)
              </li>
            )}
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              Claim your{" "}
              <strong className="text-white">{currency(cisDeduction)}</strong>{" "}
              CIS deduction on your Self Assessment
            </li>
          </ul>
        </div>
      )}

      {/* Quick Reference */}
      <Collapsible open={showReference} onOpenChange={setShowReference}>
        <div
          className="calculator-card overflow-hidden"
          style={{ borderColor: "#fbbf2415" }}
        >
          <CollapsibleTrigger className="agent-collapsible-trigger w-full">
            <div className="flex items-center gap-3">
              <BookOpen className="h-4 w-4 text-amber-400" />
              <span className="text-sm sm:text-base font-medium text-amber-300">
                CIS & DRC Reference
              </span>
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-white/80 transition-transform duration-200",
                showReference && "rotate-180"
              )}
            />
          </CollapsibleTrigger>

          <CollapsibleContent className="p-4 pt-0">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">CIS Rates</p>
                <p className="text-amber-200/70">20% - Registered</p>
                <p className="text-amber-200/70">30% - Not registered</p>
                <p className="text-amber-200/70">0% - Gross status</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">VAT Thresholds</p>
                <p className="text-amber-200/70">Registration: £90,000</p>
                <p className="text-amber-200/70">Standard: 20%</p>
                <p className="text-amber-200/70">Reduced: 5%</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">DRC Rules</p>
                <p className="text-amber-200/70">Since: March 2021</p>
                <p className="text-amber-200/70">CIS services only</p>
                <p className="text-amber-200/70">B2B construction</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Key Points</p>
                <p className="text-amber-200/70">CIS on labour only</p>
                <p className="text-amber-200/70">Claim on Self Assessment</p>
                <p className="text-amber-200/70">Keep UTR number</p>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
      </main>
    </div>
  );
};

export default CISDRCHelper;
