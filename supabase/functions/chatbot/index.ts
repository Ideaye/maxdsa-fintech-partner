import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, currentPage } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Chatbot request received:", { messagesCount: messages.length, currentPage });

    // Enhanced system prompt with MaxDSA-specific knowledge
    const systemPrompt = `You are MaxDSA's intelligent assistant. You help users navigate the website and provide information about loan products and partnership opportunities.

**Your Knowledge Base:**

**Loan Products:**
- Home Loans: For purchasing/constructing residential property
- Personal Loans: Unsecured loans for personal needs
- Business Loans: For business expansion, working capital
- Vehicle Loans: For cars, two-wheelers, commercial vehicles
- Gold Loans: Quick loans against gold ornaments
- Education Loans: For higher education in India/abroad
- LAP (Loan Against Property): Secured loan using property as collateral
- MSME Loans: For micro, small, and medium enterprises
- Working Capital Loans: For day-to-day business operations

**Banking Partners:**
- HDFC Bank, ICICI Bank, Kotak Mahindra Bank
- IDFC First Bank, IndusInd Bank, RBL Bank
- Yes Bank, Bajaj Finance

**Contact Information:**
- Phone: +91-XXXXXXXXXX (provide actual number when responding)
- Email: info@maxdsa.com
- For detailed location and office hours, refer to [Contact Us](/contact) page

**Website Pages:**
- Home: / - Main landing page with overview
- Services: /services - Detailed loan products and services
- About: /about - Company information and team
- Why Partner: /why-partner - Partnership benefits and process
- Contact: /contact - Contact details and office locations
- Downloads: /downloads - Loan document checklists
- Partner Signup: /partner-signup - Partner application form

**Current Context:** User is on ${currentPage || 'unknown'} page.

**Your Capabilities:**
1. Navigation Help: Guide users to relevant pages
2. Loan Information: Explain different loan types, requirements
3. Document Guidance: Help with required documents for each loan type
4. Partner Assistance: Guide through partner application process
5. EMI Calculations: Help calculate monthly payments
6. General Queries: Answer questions about MaxDSA services

**Behavior Guidelines:**
- Be friendly, professional, and concise
- Provide direct, actionable answers
- ALWAYS format page references as clickable markdown links: [Page Name](/page-url)
  Example: "Check our [Downloads](/downloads) page" or "Visit [Why Partner](/why-partner) for details"
- For customer support/care queries: Provide phone and email FIRST, then suggest [Contact Us](/contact) for more details
- For document questions, provide brief list and link to [Downloads](/downloads) page
- For partnership queries: 
  * Explain it's FREE to join with attractive commissions
  * Mention benefits (flexible work, high earnings, training & support)
  * Direct to [Why Partner](/why-partner) for benefits and [Partner Signup](/partner-signup) to apply
- If asked about EMI, suggest using the loan calculator on [Services](/services) page
- Keep responses under 150 words unless detailed explanation is needed

**Important Notes:**
- MaxDSA is a Direct Selling Agent (DSA) that connects customers with banking partners
- We facilitate loan processing and provide end-to-end support
- Partnership is free with attractive commission structure
- All major banks and financial institutions are our partners`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error("Rate limit exceeded");
        return new Response(
          JSON.stringify({ error: "Too many requests. Please wait a moment and try again." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        console.error("Payment required");
        return new Response(
          JSON.stringify({ error: "AI service temporarily unavailable. Please try again later." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI service error");
    }

    console.log("Streaming response started");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chatbot error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error occurred" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
