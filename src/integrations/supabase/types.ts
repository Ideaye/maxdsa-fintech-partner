export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      kirana_store_loans: {
        Row: {
          aadhar_number: string | null
          advisor_name: string | null
          bank_statement_url: string | null
          co_applicant_contact: string | null
          co_applicant_dob: string | null
          co_applicant_name: string | null
          contact_number: string
          created_at: string
          customer_name: string
          daily_turnover_range: string
          daily_walkins_range: string
          date_of_birth: string
          email: string | null
          existing_loans: Json | null
          geo_location: string | null
          id: string
          itr_documents_url: string | null
          nature_of_residence_ownership: string | null
          nature_of_retail_shop: string
          nature_of_shop_ownership: string
          pan_number: string | null
          residence_address: string | null
          retail_shop_address: string
          retail_shop_name: string
          shop_photo_url: string | null
          shop_size: string
          udyam_number: string | null
        }
        Insert: {
          aadhar_number?: string | null
          advisor_name?: string | null
          bank_statement_url?: string | null
          co_applicant_contact?: string | null
          co_applicant_dob?: string | null
          co_applicant_name?: string | null
          contact_number: string
          created_at?: string
          customer_name: string
          daily_turnover_range: string
          daily_walkins_range: string
          date_of_birth: string
          email?: string | null
          existing_loans?: Json | null
          geo_location?: string | null
          id?: string
          itr_documents_url?: string | null
          nature_of_residence_ownership?: string | null
          nature_of_retail_shop: string
          nature_of_shop_ownership: string
          pan_number?: string | null
          residence_address?: string | null
          retail_shop_address: string
          retail_shop_name: string
          shop_photo_url?: string | null
          shop_size: string
          udyam_number?: string | null
        }
        Update: {
          aadhar_number?: string | null
          advisor_name?: string | null
          bank_statement_url?: string | null
          co_applicant_contact?: string | null
          co_applicant_dob?: string | null
          co_applicant_name?: string | null
          contact_number?: string
          created_at?: string
          customer_name?: string
          daily_turnover_range?: string
          daily_walkins_range?: string
          date_of_birth?: string
          email?: string | null
          existing_loans?: Json | null
          geo_location?: string | null
          id?: string
          itr_documents_url?: string | null
          nature_of_residence_ownership?: string | null
          nature_of_retail_shop?: string
          nature_of_shop_ownership?: string
          pan_number?: string | null
          residence_address?: string | null
          retail_shop_address?: string
          retail_shop_name?: string
          shop_photo_url?: string | null
          shop_size?: string
          udyam_number?: string | null
        }
        Relationships: []
      }
      partner_applications: {
        Row: {
          aadhar_card_url: string
          aadhar_number: string | null
          additional_documents: Json | null
          agreed_to_terms: boolean
          bank_account_number: string
          bank_account_type: string | null
          bank_branch: string | null
          bank_document_type: string
          bank_document_url: string
          bank_ifsc_code: string
          bank_name: string
          bank_statement_url: string | null
          business_name: string | null
          city: string
          co_applicant_contact: string | null
          co_applicant_dob: string | null
          co_applicant_name: string | null
          company_document_type: string | null
          company_document_url: string | null
          company_gst_number: string | null
          company_name: string | null
          company_office_address: string | null
          company_pan_number: string | null
          correspondence_address: string
          created_at: string
          customer_dob: string | null
          daily_turnover_range: string | null
          daily_walkins_range: string | null
          date_of_birth: string | null
          director_details: Json | null
          email: string
          existing_loans: Json | null
          firm_gst_number: string | null
          firm_name: string | null
          firm_office_address: string | null
          firm_pan_number: string | null
          full_name: string
          geo_location: string | null
          gst_registration_url: string | null
          id: string
          itr_documents_url: string | null
          nature_of_residence_ownership: string | null
          nature_of_retail_shop: string | null
          nature_of_shop_ownership: string | null
          pan_card_url: string
          pan_number: string | null
          partner_details: Json | null
          partner_type: string
          passport_photo_url: string | null
          phone: string
          pincode: string
          proprietor_name: string | null
          proprietor_pan_number: string | null
          reference_2_name: string
          reference_2_phone: string
          reference_name: string | null
          reference_phone: string | null
          residence_address: string | null
          retail_shop_address: string | null
          retail_shop_name: string | null
          retail_shop_photo_url: string | null
          shop_size: string | null
          state: string
          trust_gst_number: string | null
          trust_name: string | null
          trust_office_address: string | null
          trust_pan_number: string | null
          trustee_details: Json | null
          udyam_number: string | null
          user_id: string | null
        }
        Insert: {
          aadhar_card_url?: string
          aadhar_number?: string | null
          additional_documents?: Json | null
          agreed_to_terms?: boolean
          bank_account_number: string
          bank_account_type?: string | null
          bank_branch?: string | null
          bank_document_type: string
          bank_document_url: string
          bank_ifsc_code: string
          bank_name: string
          bank_statement_url?: string | null
          business_name?: string | null
          city?: string
          co_applicant_contact?: string | null
          co_applicant_dob?: string | null
          co_applicant_name?: string | null
          company_document_type?: string | null
          company_document_url?: string | null
          company_gst_number?: string | null
          company_name?: string | null
          company_office_address?: string | null
          company_pan_number?: string | null
          correspondence_address?: string
          created_at?: string
          customer_dob?: string | null
          daily_turnover_range?: string | null
          daily_walkins_range?: string | null
          date_of_birth?: string | null
          director_details?: Json | null
          email: string
          existing_loans?: Json | null
          firm_gst_number?: string | null
          firm_name?: string | null
          firm_office_address?: string | null
          firm_pan_number?: string | null
          full_name: string
          geo_location?: string | null
          gst_registration_url?: string | null
          id?: string
          itr_documents_url?: string | null
          nature_of_residence_ownership?: string | null
          nature_of_retail_shop?: string | null
          nature_of_shop_ownership?: string | null
          pan_card_url?: string
          pan_number?: string | null
          partner_details?: Json | null
          partner_type?: string
          passport_photo_url?: string | null
          phone: string
          pincode?: string
          proprietor_name?: string | null
          proprietor_pan_number?: string | null
          reference_2_name?: string
          reference_2_phone?: string
          reference_name?: string | null
          reference_phone?: string | null
          residence_address?: string | null
          retail_shop_address?: string | null
          retail_shop_name?: string | null
          retail_shop_photo_url?: string | null
          shop_size?: string | null
          state?: string
          trust_gst_number?: string | null
          trust_name?: string | null
          trust_office_address?: string | null
          trust_pan_number?: string | null
          trustee_details?: Json | null
          udyam_number?: string | null
          user_id?: string | null
        }
        Update: {
          aadhar_card_url?: string
          aadhar_number?: string | null
          additional_documents?: Json | null
          agreed_to_terms?: boolean
          bank_account_number?: string
          bank_account_type?: string | null
          bank_branch?: string | null
          bank_document_type?: string
          bank_document_url?: string
          bank_ifsc_code?: string
          bank_name?: string
          bank_statement_url?: string | null
          business_name?: string | null
          city?: string
          co_applicant_contact?: string | null
          co_applicant_dob?: string | null
          co_applicant_name?: string | null
          company_document_type?: string | null
          company_document_url?: string | null
          company_gst_number?: string | null
          company_name?: string | null
          company_office_address?: string | null
          company_pan_number?: string | null
          correspondence_address?: string
          created_at?: string
          customer_dob?: string | null
          daily_turnover_range?: string | null
          daily_walkins_range?: string | null
          date_of_birth?: string | null
          director_details?: Json | null
          email?: string
          existing_loans?: Json | null
          firm_gst_number?: string | null
          firm_name?: string | null
          firm_office_address?: string | null
          firm_pan_number?: string | null
          full_name?: string
          geo_location?: string | null
          gst_registration_url?: string | null
          id?: string
          itr_documents_url?: string | null
          nature_of_residence_ownership?: string | null
          nature_of_retail_shop?: string | null
          nature_of_shop_ownership?: string | null
          pan_card_url?: string
          pan_number?: string | null
          partner_details?: Json | null
          partner_type?: string
          passport_photo_url?: string | null
          phone?: string
          pincode?: string
          proprietor_name?: string | null
          proprietor_pan_number?: string | null
          reference_2_name?: string
          reference_2_phone?: string
          reference_name?: string | null
          reference_phone?: string | null
          residence_address?: string | null
          retail_shop_address?: string | null
          retail_shop_name?: string | null
          retail_shop_photo_url?: string | null
          shop_size?: string | null
          state?: string
          trust_gst_number?: string | null
          trust_name?: string | null
          trust_office_address?: string | null
          trust_pan_number?: string | null
          trustee_details?: Json | null
          udyam_number?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
