import { useState } from "react";
import { Button } from "@/components/ui/button";
import { uploadLogoToStorage } from "@/utils/uploadLogo";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

const SetupLogo = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const { toast } = useToast();

  const handleUpload = async () => {
    setIsUploading(true);
    try {
      const result = await uploadLogoToStorage();
      setIsUploaded(true);
      toast({
        title: "Success!",
        description: `Logo uploaded successfully. URL: ${result.url}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload logo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Logo Setup</h1>
          <p className="text-muted-foreground mb-8">
            Click the button below to upload the MaxDSA logo to public storage for use in emails.
          </p>
          
          {isUploaded ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <p className="text-green-800 font-medium">
                ✓ Logo uploaded successfully! Email templates will now display the logo.
              </p>
            </div>
          ) : (
            <Button 
              onClick={handleUpload} 
              disabled={isUploading}
              size="lg"
            >
              {isUploading ? "Uploading..." : "Upload Logo"}
            </Button>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SetupLogo;
