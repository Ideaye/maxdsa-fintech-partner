import { supabase } from "@/integrations/supabase/client";
import maxdsaLogo from "@/assets/maxdsa-logo.png";

export const uploadLogoToStorage = async () => {
  try {
    // Fetch the logo as blob
    const response = await fetch(maxdsaLogo);
    const blob = await response.blob();

    // Convert to base64
    const reader = new FileReader();
    const base64Promise = new Promise<string>((resolve) => {
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });

    const logoData = await base64Promise;

    // Call edge function to upload
    const { data, error } = await supabase.functions.invoke('setup-logo', {
      body: {
        logoData,
        fileName: 'maxdsa-logo.png'
      }
    });

    if (error) throw error;

    console.log('Logo uploaded successfully:', data);
    return data;
  } catch (error) {
    console.error('Error uploading logo:', error);
    throw error;
  }
};
