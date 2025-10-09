import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator } from "lucide-react";

interface LoanResult {
  monthlyEMI: number;
  totalAmount: number;
  totalInterest: number;
}

interface LoanConfig {
  defaultAmount: number;
  maxAmount: number;
  defaultRate: number;
  defaultTenure: number;
  maxTenure: number;
  label: string;
}

const loanConfigs: Record<string, LoanConfig> = {
  home: {
    label: "Home Loan",
    defaultAmount: 5000000,
    maxAmount: 50000000,
    defaultRate: 8.5,
    defaultTenure: 20,
    maxTenure: 30,
  },
  personal: {
    label: "Personal Loan",
    defaultAmount: 500000,
    maxAmount: 5000000,
    defaultRate: 11.5,
    defaultTenure: 5,
    maxTenure: 10,
  },
  gold: {
    label: "Gold Loan",
    defaultAmount: 200000,
    maxAmount: 2000000,
    defaultRate: 9.5,
    defaultTenure: 2,
    maxTenure: 5,
  },
  vehicle: {
    label: "Vehicle Loan",
    defaultAmount: 800000,
    maxAmount: 10000000,
    defaultRate: 9.0,
    defaultTenure: 7,
    maxTenure: 10,
  },
};

const calculateEMI = (principal: number, rate: number, tenure: number): LoanResult => {
  const monthlyRate = rate / 12 / 100;
  const months = tenure * 12;
  
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
              (Math.pow(1 + monthlyRate, months) - 1);
  
  const totalAmount = emi * months;
  const totalInterest = totalAmount - principal;
  
  return {
    monthlyEMI: Math.round(emi),
    totalAmount: Math.round(totalAmount),
    totalInterest: Math.round(totalInterest),
  };
};

export const LoanCalculatorSection = () => {
  const [loanType, setLoanType] = useState<string>("home");
  const [amount, setAmount] = useState(loanConfigs.home.defaultAmount);
  const [rate, setRate] = useState(loanConfigs.home.defaultRate);
  const [tenure, setTenure] = useState(loanConfigs.home.defaultTenure);
  const [result, setResult] = useState<LoanResult | null>(null);

  const currentConfig = loanConfigs[loanType];

  const handleLoanTypeChange = (newType: string) => {
    setLoanType(newType);
    const config = loanConfigs[newType];
    setAmount(config.defaultAmount);
    setRate(config.defaultRate);
    setTenure(config.defaultTenure);
    setResult(null);
  };

  const handleCalculate = () => {
    const calculatedResult = calculateEMI(amount, rate, tenure);
    setResult(calculatedResult);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Calculate Your Loan EMI</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Use our easy loan calculator to estimate your monthly EMI payments for different types of loans
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <Label htmlFor="loan-type" className="text-base font-semibold mb-2 block">
              Select Loan Type
            </Label>
            <Select value={loanType} onValueChange={handleLoanTypeChange}>
              <SelectTrigger id="loan-type" className="w-full bg-background">
                <SelectValue placeholder="Select loan type" />
              </SelectTrigger>
              <SelectContent className="bg-background z-50">
                {Object.entries(loanConfigs).map(([key, config]) => (
                  <SelectItem key={key} value={key}>
                    {config.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-4">
              <Label htmlFor="amount" className="text-base font-semibold">
                Loan Amount (₹)
              </Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="mb-2"
              />
              <Slider
                value={[amount]}
                onValueChange={([value]) => setAmount(value)}
                min={10000}
                max={currentConfig.maxAmount}
                step={10000}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">
                Range: ₹10,000 - {formatCurrency(currentConfig.maxAmount)}
              </p>
            </div>

            <div className="space-y-4">
              <Label htmlFor="rate" className="text-base font-semibold">
                Interest Rate (% p.a.)
              </Label>
              <Input
                id="rate"
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                step="0.1"
                className="mb-2"
              />
              <Slider
                value={[rate]}
                onValueChange={([value]) => setRate(value)}
                min={5}
                max={20}
                step={0.1}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">Range: 5% - 20%</p>
            </div>

            <div className="space-y-4">
              <Label htmlFor="tenure" className="text-base font-semibold">
                Loan Tenure (Years)
              </Label>
              <Input
                id="tenure"
                type="number"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="mb-2"
              />
              <Slider
                value={[tenure]}
                onValueChange={([value]) => setTenure(value)}
                min={1}
                max={currentConfig.maxTenure}
                step={1}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">
                Range: 1 - {currentConfig.maxTenure} years
              </p>
            </div>
          </div>

          <Button onClick={handleCalculate} className="w-full md:w-auto mb-8" size="lg">
            <Calculator className="mr-2 h-5 w-5" />
            Calculate EMI
          </Button>

          {result && (
            <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
              <h3 className="text-xl font-bold mb-6 text-center">Loan Summary</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <p className="text-sm text-muted-foreground mb-2">Monthly EMI</p>
                  <p className="text-2xl font-bold text-primary">
                    {formatCurrency(result.monthlyEMI)}
                  </p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <p className="text-sm text-muted-foreground mb-2">Total Interest</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {formatCurrency(result.totalInterest)}
                  </p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <p className="text-sm text-muted-foreground mb-2">Total Amount</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(result.totalAmount)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
