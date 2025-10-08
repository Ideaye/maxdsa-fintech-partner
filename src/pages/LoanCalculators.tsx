import { useState } from "react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

interface LoanResult {
  monthlyEMI: number;
  totalAmount: number;
  totalInterest: number;
}

const LoanCalculators = () => {
  const calculateEMI = (principal: number, rate: number, tenure: number): LoanResult => {
    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;
    
    if (monthlyRate === 0) {
      return {
        monthlyEMI: principal / months,
        totalAmount: principal,
        totalInterest: 0
      };
    }
    
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    const totalAmount = emi * months;
    const totalInterest = totalAmount - principal;
    
    return {
      monthlyEMI: emi,
      totalAmount,
      totalInterest
    };
  };

  const LoanCalculator = ({ 
    title, 
    description,
    defaultAmount,
    defaultRate,
    defaultTenure,
    maxAmount,
    maxTenure
  }: {
    title: string;
    description: string;
    defaultAmount: number;
    defaultRate: number;
    defaultTenure: number;
    maxAmount: number;
    maxTenure: number;
  }) => {
    const [amount, setAmount] = useState(defaultAmount);
    const [rate, setRate] = useState(defaultRate);
    const [tenure, setTenure] = useState(defaultTenure);
    const [result, setResult] = useState<LoanResult | null>(null);

    const handleCalculate = () => {
      const calculatedResult = calculateEMI(amount, rate, tenure);
      setResult(calculatedResult);
    };

    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`amount-${title}`}>Loan Amount (₹)</Label>
              <Input
                id={`amount-${title}`}
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="Enter loan amount"
              />
              <Slider
                value={[amount]}
                onValueChange={(value) => setAmount(value[0])}
                max={maxAmount}
                min={10000}
                step={10000}
                className="mt-2"
              />
              <p className="text-sm text-muted-foreground">₹{amount.toLocaleString('en-IN')}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`rate-${title}`}>Interest Rate (% per annum)</Label>
              <Input
                id={`rate-${title}`}
                type="number"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                placeholder="Enter interest rate"
              />
              <Slider
                value={[rate]}
                onValueChange={(value) => setRate(value[0])}
                max={20}
                min={1}
                step={0.1}
                className="mt-2"
              />
              <p className="text-sm text-muted-foreground">{rate}%</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`tenure-${title}`}>Loan Tenure (Years)</Label>
              <Input
                id={`tenure-${title}`}
                type="number"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                placeholder="Enter tenure in years"
              />
              <Slider
                value={[tenure]}
                onValueChange={(value) => setTenure(value[0])}
                max={maxTenure}
                min={1}
                step={1}
                className="mt-2"
              />
              <p className="text-sm text-muted-foreground">{tenure} years</p>
            </div>

            <Button onClick={handleCalculate} className="w-full" variant="corporate">
              Calculate EMI
            </Button>
          </div>

          {result && (
            <div className="mt-6 p-6 bg-secondary rounded-lg space-y-3">
              <h3 className="font-semibold text-lg mb-4">Calculation Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-background rounded-md">
                  <p className="text-sm text-muted-foreground mb-1">Monthly EMI</p>
                  <p className="text-2xl font-bold text-primary">
                    ₹{result.monthlyEMI.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="text-center p-4 bg-background rounded-md">
                  <p className="text-sm text-muted-foreground mb-1">Total Interest</p>
                  <p className="text-2xl font-bold text-primary">
                    ₹{result.totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="text-center p-4 bg-background rounded-md">
                  <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                  <p className="text-2xl font-bold text-primary">
                    ₹{result.totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow">
        <section className="py-12 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Loan Calculators</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Calculate your EMI instantly for various types of loans
              </p>
            </div>

            <Tabs defaultValue="home" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                <TabsTrigger value="home">Home Loan</TabsTrigger>
                <TabsTrigger value="personal">Personal Loan</TabsTrigger>
                <TabsTrigger value="gold">Gold Loan</TabsTrigger>
                <TabsTrigger value="vehicle">Vehicle Loan</TabsTrigger>
              </TabsList>

              <TabsContent value="home">
                <LoanCalculator
                  title="Home Loan Calculator"
                  description="Calculate EMI for your dream home"
                  defaultAmount={5000000}
                  defaultRate={8.5}
                  defaultTenure={20}
                  maxAmount={50000000}
                  maxTenure={30}
                />
              </TabsContent>

              <TabsContent value="personal">
                <LoanCalculator
                  title="Personal Loan Calculator"
                  description="Calculate EMI for your personal needs"
                  defaultAmount={500000}
                  defaultRate={11.5}
                  defaultTenure={5}
                  maxAmount={5000000}
                  maxTenure={10}
                />
              </TabsContent>

              <TabsContent value="gold">
                <LoanCalculator
                  title="Gold Loan Calculator"
                  description="Calculate EMI against your gold"
                  defaultAmount={200000}
                  defaultRate={9.5}
                  defaultTenure={2}
                  maxAmount={2000000}
                  maxTenure={5}
                />
              </TabsContent>

              <TabsContent value="vehicle">
                <LoanCalculator
                  title="Vehicle Loan Calculator"
                  description="Calculate EMI for your vehicle purchase"
                  defaultAmount={800000}
                  defaultRate={9.0}
                  defaultTenure={7}
                  maxAmount={10000000}
                  maxTenure={10}
                />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LoanCalculators;
