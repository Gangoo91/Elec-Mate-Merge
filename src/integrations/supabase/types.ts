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
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      agent_conversations: {
        Row: {
          consultation_mode: string | null
          consulted_agents: string[] | null
          created_at: string | null
          id: string
          messages: Json[] | null
          plan_data: Json | null
          session_id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          consultation_mode?: string | null
          consulted_agents?: string[] | null
          created_at?: string | null
          id?: string
          messages?: Json[] | null
          plan_data?: Json | null
          session_id: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          consultation_mode?: string | null
          consulted_agents?: string[] | null
          created_at?: string | null
          id?: string
          messages?: Json[] | null
          plan_data?: Json | null
          session_id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      ai_interaction_feedback: {
        Row: {
          agent_name: string
          ai_response: string
          conversation_id: string | null
          created_at: string | null
          feedback_type: string | null
          id: string
          question: string
          structured_data: Json | null
          user_correction: string | null
          user_edit: Json | null
          user_id: string
          user_rating: number | null
        }
        Insert: {
          agent_name: string
          ai_response: string
          conversation_id?: string | null
          created_at?: string | null
          feedback_type?: string | null
          id?: string
          question: string
          structured_data?: Json | null
          user_correction?: string | null
          user_edit?: Json | null
          user_id: string
          user_rating?: number | null
        }
        Update: {
          agent_name?: string
          ai_response?: string
          conversation_id?: string | null
          created_at?: string | null
          feedback_type?: string | null
          id?: string
          question?: string
          structured_data?: Json | null
          user_correction?: string | null
          user_edit?: Json | null
          user_id?: string
          user_rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_interaction_feedback_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversation_memory"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_response_cache: {
        Row: {
          cache_key: string
          citations: Json | null
          confidence: number | null
          created_at: string
          hits: number | null
          id: string
          query: string
          response: string
          timestamp: string
        }
        Insert: {
          cache_key: string
          citations?: Json | null
          confidence?: number | null
          created_at?: string
          hits?: number | null
          id?: string
          query: string
          response: string
          timestamp?: string
        }
        Update: {
          cache_key?: string
          citations?: Json | null
          confidence?: number | null
          created_at?: string
          hits?: number | null
          id?: string
          query?: string
          response?: string
          timestamp?: string
        }
        Relationships: []
      }
      assessment_tracking: {
        Row: {
          assessment_type: string
          attempts: number | null
          completion_date: string | null
          created_at: string
          due_date: string | null
          feedback: string | null
          grade: string | null
          id: string
          status: string | null
          unit_code: string
          unit_title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assessment_type: string
          attempts?: number | null
          completion_date?: string | null
          created_at?: string
          due_date?: string | null
          feedback?: string | null
          grade?: string | null
          id?: string
          status?: string | null
          unit_code: string
          unit_title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assessment_type?: string
          attempts?: number | null
          completion_date?: string | null
          created_at?: string
          due_date?: string | null
          feedback?: string | null
          grade?: string | null
          id?: string
          status?: string | null
          unit_code?: string
          unit_title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      batch_jobs: {
        Row: {
          completed_at: string | null
          completed_batches: number
          created_at: string
          current_batch: number
          error_message: string | null
          failed_batches: number
          id: string
          job_type: string
          metadata: Json | null
          progress_percentage: number
          started_at: string | null
          status: string
          total_batches: number
          updated_at: string
        }
        Insert: {
          completed_at?: string | null
          completed_batches?: number
          created_at?: string
          current_batch?: number
          error_message?: string | null
          failed_batches?: number
          id?: string
          job_type: string
          metadata?: Json | null
          progress_percentage?: number
          started_at?: string | null
          status?: string
          total_batches?: number
          updated_at?: string
        }
        Update: {
          completed_at?: string | null
          completed_batches?: number
          created_at?: string
          current_batch?: number
          error_message?: string | null
          failed_batches?: number
          id?: string
          job_type?: string
          metadata?: Json | null
          progress_percentage?: number
          started_at?: string | null
          status?: string
          total_batches?: number
          updated_at?: string
        }
        Relationships: []
      }
      batch_progress: {
        Row: {
          batch_number: number
          completed_at: string | null
          created_at: string
          data: Json | null
          error_message: string | null
          id: string
          items_processed: number
          job_id: string
          started_at: string | null
          status: string
          total_items: number
        }
        Insert: {
          batch_number: number
          completed_at?: string | null
          created_at?: string
          data?: Json | null
          error_message?: string | null
          id?: string
          items_processed?: number
          job_id: string
          started_at?: string | null
          status?: string
          total_items?: number
        }
        Update: {
          batch_number?: number
          completed_at?: string | null
          created_at?: string
          data?: Json | null
          error_message?: string | null
          id?: string
          items_processed?: number
          job_id?: string
          started_at?: string | null
          status?: string
          total_items?: number
        }
        Relationships: [
          {
            foreignKeyName: "batch_progress_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "batch_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      bs7671_embeddings: {
        Row: {
          amendment: string | null
          content: string
          created_at: string | null
          embedding: string | null
          id: string
          metadata: Json | null
          regulation_number: string
          section: string
        }
        Insert: {
          amendment?: string | null
          content: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          regulation_number: string
          section: string
        }
        Update: {
          amendment?: string | null
          content?: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          regulation_number?: string
          section?: string
        }
        Relationships: []
      }
      cables_materials_cache: {
        Row: {
          category: string
          created_at: string
          expires_at: string
          id: string
          product_data: Json
          supplier: string
        }
        Insert: {
          category?: string
          created_at?: string
          expires_at?: string
          id?: string
          product_data?: Json
          supplier: string
        }
        Update: {
          category?: string
          created_at?: string
          expires_at?: string
          id?: string
          product_data?: Json
          supplier?: string
        }
        Relationships: []
      }
      career_bookmarks: {
        Row: {
          career_path_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          career_path_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          career_path_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      career_progress: {
        Row: {
          career_path_id: string
          created_at: string
          id: string
          milestones_completed: string[] | null
          progress_percentage: number
          target_completion_date: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          career_path_id: string
          created_at?: string
          id?: string
          milestones_completed?: string[] | null
          progress_percentage?: number
          target_completion_date?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          career_path_id?: string
          created_at?: string
          id?: string
          milestones_completed?: string[] | null
          progress_percentage?: number
          target_completion_date?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      commodity_prices: {
        Row: {
          created_at: string
          currency: string
          daily_change_percent: number | null
          data_source: string
          id: string
          last_updated: string
          metal_type: string
          price_per_kg: number
        }
        Insert: {
          created_at?: string
          currency?: string
          daily_change_percent?: number | null
          data_source?: string
          id?: string
          last_updated?: string
          metal_type: string
          price_per_kg: number
        }
        Update: {
          created_at?: string
          currency?: string
          daily_change_percent?: number | null
          data_source?: string
          id?: string
          last_updated?: string
          metal_type?: string
          price_per_kg?: number
        }
        Relationships: []
      }
      community_pricing_submissions: {
        Row: {
          actual_price: number
          completion_date: string
          complexity_notes: string | null
          created_at: string
          id: string
          ip_address: unknown | null
          job_description: string | null
          job_type: string
          labour_hours: number | null
          materials_cost: number | null
          postcode_district: string
          user_agent: string | null
          user_id: string | null
          verification_status: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          actual_price: number
          completion_date: string
          complexity_notes?: string | null
          created_at?: string
          id?: string
          ip_address?: unknown | null
          job_description?: string | null
          job_type: string
          labour_hours?: number | null
          materials_cost?: number | null
          postcode_district: string
          user_agent?: string | null
          user_id?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          actual_price?: number
          completion_date?: string
          complexity_notes?: string | null
          created_at?: string
          id?: string
          ip_address?: unknown | null
          job_description?: string | null
          job_type?: string
          labour_hours?: number | null
          materials_cost?: number | null
          postcode_district?: string
          user_agent?: string | null
          user_id?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: []
      }
      community_stats: {
        Row: {
          active_users: number | null
          id: string
          lessons_completed_today: number | null
          longest_streak: number | null
          updated_at: string | null
        }
        Insert: {
          active_users?: number | null
          id?: string
          lessons_completed_today?: number | null
          longest_streak?: number | null
          updated_at?: string | null
        }
        Update: {
          active_users?: number | null
          id?: string
          lessons_completed_today?: number | null
          longest_streak?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      company_profiles: {
        Row: {
          bank_details: Json | null
          company_address: string | null
          company_email: string | null
          company_name: string
          company_phone: string | null
          company_postcode: string | null
          company_registration: string | null
          company_website: string | null
          created_at: string
          currency: string | null
          id: string
          locale: string | null
          logo_data_url: string | null
          logo_url: string | null
          payment_terms: string | null
          primary_color: string | null
          secondary_color: string | null
          updated_at: string
          user_id: string
          vat_number: string | null
        }
        Insert: {
          bank_details?: Json | null
          company_address?: string | null
          company_email?: string | null
          company_name: string
          company_phone?: string | null
          company_postcode?: string | null
          company_registration?: string | null
          company_website?: string | null
          created_at?: string
          currency?: string | null
          id?: string
          locale?: string | null
          logo_data_url?: string | null
          logo_url?: string | null
          payment_terms?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          updated_at?: string
          user_id: string
          vat_number?: string | null
        }
        Update: {
          bank_details?: Json | null
          company_address?: string | null
          company_email?: string | null
          company_name?: string
          company_phone?: string | null
          company_postcode?: string | null
          company_registration?: string | null
          company_website?: string | null
          created_at?: string
          currency?: string | null
          id?: string
          locale?: string | null
          logo_data_url?: string | null
          logo_url?: string | null
          payment_terms?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          updated_at?: string
          user_id?: string
          vat_number?: string | null
        }
        Relationships: []
      }
      completed_resources: {
        Row: {
          course_slug: string
          id: string
          is_completed: boolean | null
          last_updated: string | null
          resource_id: string
          user_id: string
        }
        Insert: {
          course_slug: string
          id?: string
          is_completed?: boolean | null
          last_updated?: string | null
          resource_id: string
          user_id: string
        }
        Update: {
          course_slug?: string
          id?: string
          is_completed?: boolean | null
          last_updated?: string | null
          resource_id?: string
          user_id?: string
        }
        Relationships: []
      }
      compliance_goals: {
        Row: {
          compliance_percentage: number | null
          created_at: string
          current_entries: number | null
          current_hours: number | null
          deadline: string | null
          goal_type: string
          id: string
          status: string | null
          target_entries: number | null
          target_hours: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          compliance_percentage?: number | null
          created_at?: string
          current_entries?: number | null
          current_hours?: number | null
          deadline?: string | null
          goal_type: string
          id?: string
          status?: string | null
          target_entries?: number | null
          target_hours?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          compliance_percentage?: number | null
          created_at?: string
          current_entries?: number | null
          current_hours?: number | null
          deadline?: string | null
          goal_type?: string
          id?: string
          status?: string | null
          target_entries?: number | null
          target_hours?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      compliance_tracking: {
        Row: {
          completed_hours: number | null
          created_at: string
          deadline: string | null
          id: string
          notes: string | null
          requirement_name: string
          requirement_type: string
          status: string | null
          target_hours: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_hours?: number | null
          created_at?: string
          deadline?: string | null
          id?: string
          notes?: string | null
          requirement_name: string
          requirement_type: string
          status?: string | null
          target_hours?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_hours?: number | null
          created_at?: string
          deadline?: string | null
          id?: string
          notes?: string | null
          requirement_name?: string
          requirement_type?: string
          status?: string | null
          target_hours?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      consultation_results: {
        Row: {
          agent_type: string
          completed_at: string
          conversation_id: string
          created_at: string
          id: string
          output_data: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          agent_type: string
          completed_at?: string
          conversation_id: string
          created_at?: string
          id?: string
          output_data?: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          agent_type?: string
          completed_at?: string
          conversation_id?: string
          created_at?: string
          id?: string
          output_data?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      conversation_memory: {
        Row: {
          active_agents: string[] | null
          conversation_data: Json
          created_at: string
          id: string
          last_agent: string | null
          message_count: number | null
          plan_data: Json
          project_name: string | null
          result_id: string | null
          resumed_at: string | null
          session_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          active_agents?: string[] | null
          conversation_data?: Json
          created_at?: string
          id?: string
          last_agent?: string | null
          message_count?: number | null
          plan_data?: Json
          project_name?: string | null
          result_id?: string | null
          resumed_at?: string | null
          session_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          active_agents?: string[] | null
          conversation_data?: Json
          created_at?: string
          id?: string
          last_agent?: string | null
          message_count?: number | null
          plan_data?: Json
          project_name?: string | null
          result_id?: string | null
          resumed_at?: string | null
          session_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_memory_result_id_fkey"
            columns: ["result_id"]
            isOneToOne: false
            referencedRelation: "install_planner_results"
            referencedColumns: ["id"]
          },
        ]
      }
      course_dates_cache: {
        Row: {
          course_id: string
          created_at: string
          expires_at: string
          extracted_dates: Json
          id: string
          provider: string
          source_url: string | null
        }
        Insert: {
          course_id: string
          created_at?: string
          expires_at?: string
          extracted_dates: Json
          id?: string
          provider: string
          source_url?: string | null
        }
        Update: {
          course_id?: string
          created_at?: string
          expires_at?: string
          extracted_dates?: Json
          id?: string
          provider?: string
          source_url?: string | null
        }
        Relationships: []
      }
      course_enquiries: {
        Row: {
          course_id: string
          course_provider: string
          course_title: string
          created_at: string
          enquirer_email: string
          enquirer_name: string
          enquirer_phone: string | null
          id: string
          message: string | null
          preferred_start_date: string | null
          provider_response: string | null
          response_received_at: string | null
          status: string
          user_id: string | null
        }
        Insert: {
          course_id: string
          course_provider: string
          course_title: string
          created_at?: string
          enquirer_email: string
          enquirer_name: string
          enquirer_phone?: string | null
          id?: string
          message?: string | null
          preferred_start_date?: string | null
          provider_response?: string | null
          response_received_at?: string | null
          status?: string
          user_id?: string | null
        }
        Update: {
          course_id?: string
          course_provider?: string
          course_title?: string
          created_at?: string
          enquirer_email?: string
          enquirer_name?: string
          enquirer_phone?: string | null
          id?: string
          message?: string | null
          preferred_start_date?: string | null
          provider_response?: string | null
          response_received_at?: string | null
          status?: string
          user_id?: string | null
        }
        Relationships: []
      }
      cpd_entries: {
        Row: {
          activity_type: string
          category: string
          created_at: string
          date_completed: string
          description: string | null
          evidence_files: Json | null
          hours: number
          id: string
          is_verified: boolean | null
          learning_outcomes: string[] | null
          professional_body_id: string | null
          title: string
          updated_at: string
          user_id: string
          verification_status: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          activity_type: string
          category: string
          created_at?: string
          date_completed: string
          description?: string | null
          evidence_files?: Json | null
          hours: number
          id?: string
          is_verified?: boolean | null
          learning_outcomes?: string[] | null
          professional_body_id?: string | null
          title: string
          updated_at?: string
          user_id: string
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          activity_type?: string
          category?: string
          created_at?: string
          date_completed?: string
          description?: string | null
          evidence_files?: Json | null
          hours?: number
          id?: string
          is_verified?: boolean | null
          learning_outcomes?: string[] | null
          professional_body_id?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cpd_entries_professional_body_id_fkey"
            columns: ["professional_body_id"]
            isOneToOne: false
            referencedRelation: "professional_bodies"
            referencedColumns: ["id"]
          },
        ]
      }
      cpd_evidence_files: {
        Row: {
          cpd_entry_id: string
          file_name: string
          file_size: number | null
          file_type: string
          file_url: string
          id: string
          ocr_text: string | null
          uploaded_at: string
          user_id: string
          verification_status: string | null
        }
        Insert: {
          cpd_entry_id: string
          file_name: string
          file_size?: number | null
          file_type: string
          file_url: string
          id?: string
          ocr_text?: string | null
          uploaded_at?: string
          user_id: string
          verification_status?: string | null
        }
        Update: {
          cpd_entry_id?: string
          file_name?: string
          file_size?: number | null
          file_type?: string
          file_url?: string
          id?: string
          ocr_text?: string | null
          uploaded_at?: string
          user_id?: string
          verification_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cpd_evidence_files_cpd_entry_id_fkey"
            columns: ["cpd_entry_id"]
            isOneToOne: false
            referencedRelation: "cpd_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      cpd_portfolios: {
        Row: {
          compliance_percentage: number
          generated_at: string
          id: string
          pdf_url: string | null
          period_end: string
          period_start: string
          professional_body_id: string
          status: string | null
          title: string
          total_hours: number
          user_id: string
        }
        Insert: {
          compliance_percentage: number
          generated_at?: string
          id?: string
          pdf_url?: string | null
          period_end: string
          period_start: string
          professional_body_id: string
          status?: string | null
          title: string
          total_hours: number
          user_id: string
        }
        Update: {
          compliance_percentage?: number
          generated_at?: string
          id?: string
          pdf_url?: string | null
          period_end?: string
          period_start?: string
          professional_body_id?: string
          status?: string | null
          title?: string
          total_hours?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cpd_portfolios_professional_body_id_fkey"
            columns: ["professional_body_id"]
            isOneToOne: false
            referencedRelation: "professional_bodies"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_hazards: {
        Row: {
          category: string
          created_at: string
          default_controls: string[] | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          risk_level: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          default_controls?: string[] | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          risk_level?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          default_controls?: string[] | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          risk_level?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      design_knowledge: {
        Row: {
          content: string
          created_at: string | null
          embedding: string | null
          id: string
          metadata: Json | null
          source: string
          topic: string
        }
        Insert: {
          content: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          source: string
          topic: string
        }
        Update: {
          content?: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          source?: string
          topic?: string
        }
        Relationships: []
      }
      design_patterns: {
        Row: {
          avg_response_time: number | null
          cable_length: number | null
          circuit_type: string
          confidence_score: number | null
          created_at: string
          design_solution: Json
          id: string
          last_used: string
          pattern_hash: string
          power_rating: number
          regulations_cited: string[]
          success_count: number | null
          updated_at: string
          voltage: number
        }
        Insert: {
          avg_response_time?: number | null
          cable_length?: number | null
          circuit_type: string
          confidence_score?: number | null
          created_at?: string
          design_solution: Json
          id?: string
          last_used?: string
          pattern_hash: string
          power_rating: number
          regulations_cited?: string[]
          success_count?: number | null
          updated_at?: string
          voltage: number
        }
        Update: {
          avg_response_time?: number | null
          cable_length?: number | null
          circuit_type?: string
          confidence_score?: number | null
          created_at?: string
          design_solution?: Json
          id?: string
          last_used?: string
          pattern_hash?: string
          power_rating?: number
          regulations_cited?: string[]
          success_count?: number | null
          updated_at?: string
          voltage?: number
        }
        Relationships: []
      }
      document_field_schemas: {
        Row: {
          created_at: string | null
          description: string | null
          document_type: Database["public"]["Enums"]["document_type"]
          example_data: Json
          field_schema: Json
          id: string
          schema_version: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          document_type: Database["public"]["Enums"]["document_type"]
          example_data: Json
          field_schema: Json
          id?: string
          schema_version?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          document_type?: Database["public"]["Enums"]["document_type"]
          example_data?: Json
          field_schema?: Json
          id?: string
          schema_version?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      document_relationships: {
        Row: {
          created_at: string
          id: string
          relationship_type: string
          source_id: string
          source_type: string
          target_id: string
          target_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          relationship_type: string
          source_id: string
          source_type: string
          target_id: string
          target_type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          relationship_type?: string
          source_id?: string
          source_type?: string
          target_id?: string
          target_type?: string
          user_id?: string
        }
        Relationships: []
      }
      education_market_stats: {
        Row: {
          expires_at: string
          id: string
          last_updated: string
          metadata: Json | null
          source_url: string | null
          stat_type: string
          value: string
        }
        Insert: {
          expires_at?: string
          id?: string
          last_updated?: string
          metadata?: Json | null
          source_url?: string | null
          stat_type: string
          value: string
        }
        Update: {
          expires_at?: string
          id?: string
          last_updated?: string
          metadata?: Json | null
          source_url?: string | null
          stat_type?: string
          value?: string
        }
        Relationships: []
      }
      eic_schedules: {
        Row: {
          created_at: string
          design_date: string
          designer_name: string
          id: string
          installation_address: string
          installation_id: string
          schedule_data: Json
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          design_date: string
          designer_name: string
          id?: string
          installation_address: string
          installation_id: string
          schedule_data?: Json
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          design_date?: string
          designer_name?: string
          id?: string
          installation_address?: string
          installation_id?: string
          schedule_data?: Json
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      enhanced_hazards: {
        Row: {
          category: string
          created_at: string
          custom_controls: string[] | null
          frequency: number | null
          hazard_id: string
          hazard_name: string
          id: string
          is_custom: boolean | null
          last_used: string | null
          linked_method_statements: string[] | null
          linked_risks: string[] | null
          linked_tasks: string[] | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          category: string
          created_at?: string
          custom_controls?: string[] | null
          frequency?: number | null
          hazard_id: string
          hazard_name: string
          id?: string
          is_custom?: boolean | null
          last_used?: string | null
          linked_method_statements?: string[] | null
          linked_risks?: string[] | null
          linked_tasks?: string[] | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          custom_controls?: string[] | null
          frequency?: number | null
          hazard_id?: string
          hazard_name?: string
          id?: string
          is_custom?: boolean | null
          last_used?: string | null
          linked_method_statements?: string[] | null
          linked_risks?: string[] | null
          linked_tasks?: string[] | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      enhanced_regional_pricing: {
        Row: {
          avg_price: number
          complexity_level: string
          confidence_score: number | null
          created_at: string
          currency: string
          data_source_id: string | null
          expires_at: string | null
          id: string
          job_category: string
          job_type: string
          last_verified_at: string | null
          market_factors: Json | null
          max_price: number
          median_price: number | null
          min_price: number
          postcode_district: string
          raw_data: Json | null
          sample_size: number | null
          seasonal_adjustment: number | null
          unit: string
          updated_at: string
        }
        Insert: {
          avg_price: number
          complexity_level?: string
          confidence_score?: number | null
          created_at?: string
          currency?: string
          data_source_id?: string | null
          expires_at?: string | null
          id?: string
          job_category: string
          job_type: string
          last_verified_at?: string | null
          market_factors?: Json | null
          max_price: number
          median_price?: number | null
          min_price: number
          postcode_district: string
          raw_data?: Json | null
          sample_size?: number | null
          seasonal_adjustment?: number | null
          unit?: string
          updated_at?: string
        }
        Update: {
          avg_price?: number
          complexity_level?: string
          confidence_score?: number | null
          created_at?: string
          currency?: string
          data_source_id?: string | null
          expires_at?: string | null
          id?: string
          job_category?: string
          job_type?: string
          last_verified_at?: string | null
          market_factors?: Json | null
          max_price?: number
          median_price?: number | null
          min_price?: number
          postcode_district?: string
          raw_data?: Json | null
          sample_size?: number | null
          seasonal_adjustment?: number | null
          unit?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "enhanced_regional_pricing_data_source_id_fkey"
            columns: ["data_source_id"]
            isOneToOne: false
            referencedRelation: "pricing_data_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      evidence_uploads: {
        Row: {
          created_at: string
          date_achieved: string
          description: string | null
          evidence_type: string
          file_name: string
          file_size: number | null
          file_url: string
          id: string
          learning_outcome: string | null
          title: string
          unit_reference: string | null
          updated_at: string
          user_id: string
          verification_status: string | null
          witness_name: string | null
          witness_signature_url: string | null
        }
        Insert: {
          created_at?: string
          date_achieved: string
          description?: string | null
          evidence_type: string
          file_name: string
          file_size?: number | null
          file_url: string
          id?: string
          learning_outcome?: string | null
          title: string
          unit_reference?: string | null
          updated_at?: string
          user_id: string
          verification_status?: string | null
          witness_name?: string | null
          witness_signature_url?: string | null
        }
        Update: {
          created_at?: string
          date_achieved?: string
          description?: string | null
          evidence_type?: string
          file_name?: string
          file_size?: number | null
          file_url?: string
          id?: string
          learning_outcome?: string | null
          title?: string
          unit_reference?: string | null
          updated_at?: string
          user_id?: string
          verification_status?: string | null
          witness_name?: string | null
          witness_signature_url?: string | null
        }
        Relationships: []
      }
      global_chat_comments: {
        Row: {
          author_avatar: string | null
          author_id: string
          author_name: string
          content: string
          created_at: string
          id: string
          parent_id: string
        }
        Insert: {
          author_avatar?: string | null
          author_id: string
          author_name: string
          content: string
          created_at?: string
          id?: string
          parent_id: string
        }
        Update: {
          author_avatar?: string | null
          author_id?: string
          author_name?: string
          content?: string
          created_at?: string
          id?: string
          parent_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "global_chat_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "global_chat_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      global_chat_messages: {
        Row: {
          author_avatar: string | null
          author_id: string
          author_name: string
          category: string
          content: string
          created_at: string
          id: string
          updated_at: string | null
          upvotes: number | null
        }
        Insert: {
          author_avatar?: string | null
          author_id: string
          author_name: string
          category: string
          content: string
          created_at?: string
          id?: string
          updated_at?: string | null
          upvotes?: number | null
        }
        Update: {
          author_avatar?: string | null
          author_id?: string
          author_name?: string
          category?: string
          content?: string
          created_at?: string
          id?: string
          updated_at?: string | null
          upvotes?: number | null
        }
        Relationships: []
      }
      global_chat_upvotes: {
        Row: {
          created_at: string
          id: string
          message_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "global_chat_upvotes_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "global_chat_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      gs38_guidance: {
        Row: {
          applies_to: string[] | null
          content: string
          created_at: string | null
          equipment_type: string | null
          id: string
          key_points: string[] | null
          safety_category: string | null
          section_number: string
          section_title: string
          updated_at: string | null
        }
        Insert: {
          applies_to?: string[] | null
          content: string
          created_at?: string | null
          equipment_type?: string | null
          id?: string
          key_points?: string[] | null
          safety_category?: string | null
          section_number: string
          section_title: string
          updated_at?: string | null
        }
        Update: {
          applies_to?: string[] | null
          content?: string
          created_at?: string | null
          equipment_type?: string | null
          id?: string
          key_points?: string[] | null
          safety_category?: string | null
          section_number?: string
          section_title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      health_safety_knowledge: {
        Row: {
          content: string
          created_at: string | null
          embedding: string | null
          id: string
          metadata: Json | null
          source: string
          topic: string
        }
        Insert: {
          content: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          source: string
          topic: string
        }
        Update: {
          content?: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          source?: string
          topic?: string
        }
        Relationships: []
      }
      historical_prices: {
        Row: {
          category: string | null
          created_at: string
          currency: string
          date_scraped: string
          id: string
          price: number
          product_name: string
          product_url: string | null
          source_url: string | null
          supplier: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          currency?: string
          date_scraped?: string
          id?: string
          price: number
          product_name: string
          product_url?: string | null
          source_url?: string | null
          supplier: string
        }
        Update: {
          category?: string | null
          created_at?: string
          currency?: string
          date_scraped?: string
          id?: string
          price?: number
          product_name?: string
          product_url?: string | null
          source_url?: string | null
          supplier?: string
        }
        Relationships: []
      }
      incident_photos: {
        Row: {
          description: string | null
          id: string
          incident_id: string
          photo_url: string
          uploaded_at: string
        }
        Insert: {
          description?: string | null
          id?: string
          incident_id: string
          photo_url: string
          uploaded_at?: string
        }
        Update: {
          description?: string | null
          id?: string
          incident_id?: string
          photo_url?: string
          uploaded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "incident_photos_incident_id_fkey"
            columns: ["incident_id"]
            isOneToOne: false
            referencedRelation: "incidents"
            referencedColumns: ["id"]
          },
        ]
      }
      incidents: {
        Row: {
          created_at: string
          date_occurred: string
          description: string
          equipment_involved: string | null
          first_aid_given: boolean | null
          follow_up_notes: string | null
          follow_up_required: boolean | null
          id: string
          immediate_action_taken: string | null
          incident_type: Database["public"]["Enums"]["incident_type"]
          injuries_sustained: string | null
          location: string
          photos_attached: boolean | null
          potential_consequences: string | null
          resolved_at: string | null
          severity: Database["public"]["Enums"]["severity_level"]
          status: Database["public"]["Enums"]["incident_status"]
          submitted_at: string | null
          supervisor_name: string | null
          supervisor_notified: boolean | null
          title: string
          updated_at: string
          user_id: string
          witnesses: string | null
        }
        Insert: {
          created_at?: string
          date_occurred: string
          description: string
          equipment_involved?: string | null
          first_aid_given?: boolean | null
          follow_up_notes?: string | null
          follow_up_required?: boolean | null
          id?: string
          immediate_action_taken?: string | null
          incident_type: Database["public"]["Enums"]["incident_type"]
          injuries_sustained?: string | null
          location: string
          photos_attached?: boolean | null
          potential_consequences?: string | null
          resolved_at?: string | null
          severity?: Database["public"]["Enums"]["severity_level"]
          status?: Database["public"]["Enums"]["incident_status"]
          submitted_at?: string | null
          supervisor_name?: string | null
          supervisor_notified?: boolean | null
          title: string
          updated_at?: string
          user_id: string
          witnesses?: string | null
        }
        Update: {
          created_at?: string
          date_occurred?: string
          description?: string
          equipment_involved?: string | null
          first_aid_given?: boolean | null
          follow_up_notes?: string | null
          follow_up_required?: boolean | null
          id?: string
          immediate_action_taken?: string | null
          incident_type?: Database["public"]["Enums"]["incident_type"]
          injuries_sustained?: string | null
          location?: string
          photos_attached?: boolean | null
          potential_consequences?: string | null
          resolved_at?: string | null
          severity?: Database["public"]["Enums"]["severity_level"]
          status?: Database["public"]["Enums"]["incident_status"]
          submitted_at?: string | null
          supervisor_name?: string | null
          supervisor_notified?: boolean | null
          title?: string
          updated_at?: string
          user_id?: string
          witnesses?: string | null
        }
        Relationships: []
      }
      industry_news: {
        Row: {
          author: string | null
          average_rating: number | null
          canonical_url: string | null
          category: string
          content: string
          content_hash: string | null
          content_quality: number | null
          created_at: string
          date_published: string
          external_id: string | null
          external_url: string | null
          id: string
          image_url: string | null
          is_active: boolean
          keywords: string[] | null
          published_date: string | null
          quality_score: number | null
          regulatory_body: string
          relevance_score: number | null
          source_name: string | null
          source_url: string | null
          summary: string
          title: string
          updated_at: string
          view_count: number | null
        }
        Insert: {
          author?: string | null
          average_rating?: number | null
          canonical_url?: string | null
          category: string
          content: string
          content_hash?: string | null
          content_quality?: number | null
          created_at?: string
          date_published?: string
          external_id?: string | null
          external_url?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          keywords?: string[] | null
          published_date?: string | null
          quality_score?: number | null
          regulatory_body: string
          relevance_score?: number | null
          source_name?: string | null
          source_url?: string | null
          summary: string
          title: string
          updated_at?: string
          view_count?: number | null
        }
        Update: {
          author?: string | null
          average_rating?: number | null
          canonical_url?: string | null
          category?: string
          content?: string
          content_hash?: string | null
          content_quality?: number | null
          created_at?: string
          date_published?: string
          external_id?: string | null
          external_url?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          keywords?: string[] | null
          published_date?: string | null
          quality_score?: number | null
          regulatory_body?: string
          relevance_score?: number | null
          source_name?: string | null
          source_url?: string | null
          summary?: string
          title?: string
          updated_at?: string
          view_count?: number | null
        }
        Relationships: []
      }
      inspection_testing_knowledge: {
        Row: {
          content: string
          created_at: string | null
          embedding: string | null
          id: string
          metadata: Json | null
          source: string
          topic: string
        }
        Insert: {
          content: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          source: string
          topic: string
        }
        Update: {
          content?: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          source?: string
          topic?: string
        }
        Relationships: []
      }
      install_planner_results: {
        Row: {
          agent_outputs: Json
          circuits: Json
          compliance: Json
          conversation_id: string | null
          created_at: string
          export_history: Json | null
          id: string
          installation_type: string
          photos: Json | null
          project_name: string
          share_enabled: boolean | null
          share_expires_at: string | null
          share_token: string | null
          total_cost: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          agent_outputs?: Json
          circuits?: Json
          compliance?: Json
          conversation_id?: string | null
          created_at?: string
          export_history?: Json | null
          id?: string
          installation_type: string
          photos?: Json | null
          project_name: string
          share_enabled?: boolean | null
          share_expires_at?: string | null
          share_token?: string | null
          total_cost?: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          agent_outputs?: Json
          circuits?: Json
          compliance?: Json
          conversation_id?: string | null
          created_at?: string
          export_history?: Json | null
          id?: string
          installation_type?: string
          photos?: Json | null
          project_name?: string
          share_enabled?: boolean | null
          share_expires_at?: string | null
          share_token?: string | null
          total_cost?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      installation_knowledge: {
        Row: {
          content: string
          created_at: string | null
          embedding: string | null
          id: string
          metadata: Json | null
          source: string
          topic: string
        }
        Insert: {
          content: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          source: string
          topic: string
        }
        Update: {
          content?: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          source?: string
          topic?: string
        }
        Relationships: []
      }
      installation_methods: {
        Row: {
          bs7671_reference: string | null
          created_at: string | null
          derating_factor: number | null
          description: string
          id: string
          method_reference: string
          onsite_guide_reference: string | null
          restrictions: string | null
          suitable_for: string[] | null
          updated_at: string | null
        }
        Insert: {
          bs7671_reference?: string | null
          created_at?: string | null
          derating_factor?: number | null
          description: string
          id?: string
          method_reference: string
          onsite_guide_reference?: string | null
          restrictions?: string | null
          suitable_for?: string[] | null
          updated_at?: string | null
        }
        Update: {
          bs7671_reference?: string | null
          created_at?: string | null
          derating_factor?: number | null
          description?: string
          id?: string
          method_reference?: string
          onsite_guide_reference?: string | null
          restrictions?: string | null
          suitable_for?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      job_listings: {
        Row: {
          company: string
          created_at: string
          description: string
          external_url: string
          id: string
          image_url: string | null
          location: string
          posted_date: string
          salary: string | null
          source: string | null
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          company: string
          created_at?: string
          description: string
          external_url: string
          id?: string
          image_url?: string | null
          location: string
          posted_date?: string
          salary?: string | null
          source?: string | null
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          company?: string
          created_at?: string
          description?: string
          external_url?: string
          id?: string
          image_url?: string | null
          location?: string
          posted_date?: string
          salary?: string | null
          source?: string | null
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      job_pricing_baseline: {
        Row: {
          base_price: number
          complexity_level: string
          created_at: string
          currency: string
          estimated_hours: number | null
          id: string
          job_category: string
          job_type: string
          last_updated: string
          unit: string
        }
        Insert: {
          base_price: number
          complexity_level?: string
          created_at?: string
          currency?: string
          estimated_hours?: number | null
          id?: string
          job_category: string
          job_type: string
          last_updated?: string
          unit?: string
        }
        Update: {
          base_price?: number
          complexity_level?: string
          created_at?: string
          currency?: string
          estimated_hours?: number | null
          id?: string
          job_category?: string
          job_type?: string
          last_updated?: string
          unit?: string
        }
        Relationships: []
      }
      knowledge_base_changelog: {
        Row: {
          action: string
          change_reason: string | null
          changed_by: string | null
          created_at: string | null
          id: string
          new_content: string | null
          previous_content: string | null
          record_id: string | null
          source_feedback_id: string | null
          table_name: string
        }
        Insert: {
          action: string
          change_reason?: string | null
          changed_by?: string | null
          created_at?: string | null
          id?: string
          new_content?: string | null
          previous_content?: string | null
          record_id?: string | null
          source_feedback_id?: string | null
          table_name: string
        }
        Update: {
          action?: string
          change_reason?: string | null
          changed_by?: string | null
          created_at?: string | null
          id?: string
          new_content?: string | null
          previous_content?: string | null
          record_id?: string | null
          source_feedback_id?: string | null
          table_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "knowledge_base_changelog_source_feedback_id_fkey"
            columns: ["source_feedback_id"]
            isOneToOne: false
            referencedRelation: "ai_interaction_feedback"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_review_queue: {
        Row: {
          agent_name: string
          ai_answer: string
          created_at: string | null
          feedback_id: string | null
          id: string
          issue_type: string
          pattern_frequency: number | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
          suggested_knowledge_update: Json | null
          suggested_prompt_change: string | null
          user_correction: string | null
        }
        Insert: {
          agent_name: string
          ai_answer: string
          created_at?: string | null
          feedback_id?: string | null
          id?: string
          issue_type: string
          pattern_frequency?: number | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          suggested_knowledge_update?: Json | null
          suggested_prompt_change?: string | null
          user_correction?: string | null
        }
        Update: {
          agent_name?: string
          ai_answer?: string
          created_at?: string | null
          feedback_id?: string | null
          id?: string
          issue_type?: string
          pattern_frequency?: number | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          suggested_knowledge_update?: Json | null
          suggested_prompt_change?: string | null
          user_correction?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "learning_review_queue_feedback_id_fkey"
            columns: ["feedback_id"]
            isOneToOne: false
            referencedRelation: "ai_interaction_feedback"
            referencedColumns: ["id"]
          },
        ]
      }
      lfe_reports: {
        Row: {
          average_rating: number | null
          content: string
          created_at: string
          date_published: string
          id: string
          incident_type: string
          is_active: boolean
          key_takeaways: string[] | null
          summary: string
          title: string
          updated_at: string
          view_count: number | null
        }
        Insert: {
          average_rating?: number | null
          content: string
          created_at?: string
          date_published?: string
          id?: string
          incident_type: string
          is_active?: boolean
          key_takeaways?: string[] | null
          summary: string
          title: string
          updated_at?: string
          view_count?: number | null
        }
        Update: {
          average_rating?: number | null
          content?: string
          created_at?: string
          date_published?: string
          id?: string
          incident_type?: string
          is_active?: boolean
          key_takeaways?: string[] | null
          summary?: string
          title?: string
          updated_at?: string
          view_count?: number | null
        }
        Relationships: []
      }
      live_course_cache: {
        Row: {
          course_data: Json
          created_at: string
          expires_at: string
          id: string
          search_query: string
          source: string
        }
        Insert: {
          course_data: Json
          created_at?: string
          expires_at?: string
          id?: string
          search_query: string
          source: string
        }
        Update: {
          course_data?: Json
          created_at?: string
          expires_at?: string
          id?: string
          search_query?: string
          source?: string
        }
        Relationships: []
      }
      live_education_cache: {
        Row: {
          analytics_data: Json
          cache_version: number | null
          category: string
          created_at: string
          education_data: Json
          expires_at: string
          id: string
          last_refreshed: string | null
          next_refresh_date: string | null
          refresh_status: string | null
          search_query: string
        }
        Insert: {
          analytics_data?: Json
          cache_version?: number | null
          category: string
          created_at?: string
          education_data?: Json
          expires_at?: string
          id?: string
          last_refreshed?: string | null
          next_refresh_date?: string | null
          refresh_status?: string | null
          search_query: string
        }
        Update: {
          analytics_data?: Json
          cache_version?: number | null
          category?: string
          created_at?: string
          education_data?: Json
          expires_at?: string
          id?: string
          last_refreshed?: string | null
          next_refresh_date?: string | null
          refresh_status?: string | null
          search_query?: string
        }
        Relationships: []
      }
      major_projects: {
        Row: {
          average_rating: number | null
          awarded_to: string
          category: string | null
          content: string
          created_at: string
          date_awarded: string
          electrical_scope: string | null
          external_project_url: string | null
          id: string
          is_active: boolean
          location: string
          project_value: string
          source_url: string | null
          status: string
          summary: string
          technologies: string[] | null
          tender_deadline: string | null
          title: string
          updated_at: string
          view_count: number | null
        }
        Insert: {
          average_rating?: number | null
          awarded_to: string
          category?: string | null
          content: string
          created_at?: string
          date_awarded?: string
          electrical_scope?: string | null
          external_project_url?: string | null
          id?: string
          is_active?: boolean
          location: string
          project_value: string
          source_url?: string | null
          status?: string
          summary: string
          technologies?: string[] | null
          tender_deadline?: string | null
          title: string
          updated_at?: string
          view_count?: number | null
        }
        Update: {
          average_rating?: number | null
          awarded_to?: string
          category?: string | null
          content?: string
          created_at?: string
          date_awarded?: string
          electrical_scope?: string | null
          external_project_url?: string | null
          id?: string
          is_active?: boolean
          location?: string
          project_value?: string
          source_url?: string | null
          status?: string
          summary?: string
          technologies?: string[] | null
          tender_deadline?: string | null
          title?: string
          updated_at?: string
          view_count?: number | null
        }
        Relationships: []
      }
      market_insights_cache: {
        Row: {
          created_at: string
          data: Json
          data_source: string
          expires_at: string
          id: string
          keywords: string
          last_updated: string
          location: string
          postcode_district: string | null
        }
        Insert: {
          created_at?: string
          data: Json
          data_source?: string
          expires_at?: string
          id?: string
          keywords: string
          last_updated?: string
          location: string
          postcode_district?: string | null
        }
        Update: {
          created_at?: string
          data?: Json
          data_source?: string
          expires_at?: string
          id?: string
          keywords?: string
          last_updated?: string
          location?: string
          postcode_district?: string | null
        }
        Relationships: []
      }
      materials_weekly_cache: {
        Row: {
          cache_key: string
          categories: string[]
          category: string | null
          created_at: string
          expires_at: string
          id: string
          last_updated: string
          materials_data: Json | null
          scraper_response: Json
          source: string
          suppliers: string[]
          total_materials: number
          total_products: number | null
          update_status: string | null
        }
        Insert: {
          cache_key?: string
          categories?: string[]
          category?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          last_updated?: string
          materials_data?: Json | null
          scraper_response?: Json
          source: string
          suppliers?: string[]
          total_materials?: number
          total_products?: number | null
          update_status?: string | null
        }
        Update: {
          cache_key?: string
          categories?: string[]
          category?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          last_updated?: string
          materials_data?: Json | null
          scraper_response?: Json
          source?: string
          suppliers?: string[]
          total_materials?: number
          total_products?: number | null
          update_status?: string | null
        }
        Relationships: []
      }
      mentor_connections: {
        Row: {
          apprentice_id: string
          created_at: string
          id: string
          mentor_id: string
          status: string
          updated_at: string
        }
        Insert: {
          apprentice_id: string
          created_at?: string
          id?: string
          mentor_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          apprentice_id?: string
          created_at?: string
          id?: string
          mentor_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "mentor_connections_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "mentors"
            referencedColumns: ["id"]
          },
        ]
      }
      mentor_messages: {
        Row: {
          connection_id: string
          content: string
          created_at: string
          id: string
          is_read: boolean
          sender_id: string
          sender_type: string
        }
        Insert: {
          connection_id: string
          content: string
          created_at?: string
          id?: string
          is_read?: boolean
          sender_id: string
          sender_type: string
        }
        Update: {
          connection_id?: string
          content?: string
          created_at?: string
          id?: string
          is_read?: boolean
          sender_id?: string
          sender_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "mentor_messages_connection_id_fkey"
            columns: ["connection_id"]
            isOneToOne: false
            referencedRelation: "mentor_connections"
            referencedColumns: ["id"]
          },
        ]
      }
      mentors: {
        Row: {
          availability: string
          avatar: string | null
          created_at: string
          experience: string
          id: string
          is_active: boolean
          name: string
          specialty: string
          updated_at: string
        }
        Insert: {
          availability: string
          avatar?: string | null
          created_at?: string
          experience: string
          id?: string
          is_active?: boolean
          name: string
          specialty: string
          updated_at?: string
        }
        Update: {
          availability?: string
          avatar?: string | null
          created_at?: string
          experience?: string
          id?: string
          is_active?: boolean
          name?: string
          specialty?: string
          updated_at?: string
        }
        Relationships: []
      }
      method_statements: {
        Row: {
          approved_by: string | null
          contractor: string
          created_at: string
          description: string | null
          duration: string | null
          id: string
          job_scale: string | null
          job_title: string
          location: string
          overall_risk_level: string
          rams_document_id: string | null
          review_date: string | null
          status: string
          steps: Json
          supervisor: string
          team_size: string | null
          updated_at: string
          user_id: string
          work_type: string
        }
        Insert: {
          approved_by?: string | null
          contractor: string
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: string
          job_scale?: string | null
          job_title: string
          location: string
          overall_risk_level?: string
          rams_document_id?: string | null
          review_date?: string | null
          status?: string
          steps?: Json
          supervisor: string
          team_size?: string | null
          updated_at?: string
          user_id: string
          work_type: string
        }
        Update: {
          approved_by?: string | null
          contractor?: string
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: string
          job_scale?: string | null
          job_title?: string
          location?: string
          overall_risk_level?: string
          rams_document_id?: string | null
          review_date?: string | null
          status?: string
          steps?: Json
          supervisor?: string
          team_size?: string | null
          updated_at?: string
          user_id?: string
          work_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "method_statements_rams_document_id_fkey"
            columns: ["rams_document_id"]
            isOneToOne: false
            referencedRelation: "rams_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      near_miss_reports: {
        Row: {
          assigned_to: string | null
          briefed_to_team: boolean | null
          briefing_created_at: string | null
          briefing_id: string | null
          category: string
          completed_date: string | null
          created_at: string
          description: string
          due_date: string | null
          follow_up_required: boolean
          id: string
          immediate_actions: string | null
          incident_date: string
          incident_time: string
          location: string
          photos_attached: string[] | null
          potential_consequences: string | null
          preventive_measures: string | null
          reporter_name: string
          severity: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_to?: string | null
          briefed_to_team?: boolean | null
          briefing_created_at?: string | null
          briefing_id?: string | null
          category: string
          completed_date?: string | null
          created_at?: string
          description: string
          due_date?: string | null
          follow_up_required?: boolean
          id?: string
          immediate_actions?: string | null
          incident_date: string
          incident_time: string
          location: string
          photos_attached?: string[] | null
          potential_consequences?: string | null
          preventive_measures?: string | null
          reporter_name: string
          severity: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_to?: string | null
          briefed_to_team?: boolean | null
          briefing_created_at?: string | null
          briefing_id?: string | null
          category?: string
          completed_date?: string | null
          created_at?: string
          description?: string
          due_date?: string | null
          follow_up_required?: boolean
          id?: string
          immediate_actions?: string | null
          incident_date?: string
          incident_time?: string
          location?: string
          photos_attached?: string[] | null
          potential_consequences?: string | null
          preventive_measures?: string | null
          reporter_name?: string
          severity?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "near_miss_reports_briefing_id_fkey"
            columns: ["briefing_id"]
            isOneToOne: false
            referencedRelation: "team_briefings"
            referencedColumns: ["id"]
          },
        ]
      }
      ojt_assessments: {
        Row: {
          created_at: string
          due_date: string
          feedback: string | null
          grade: string | null
          id: string
          status: string | null
          title: string
          tutor_notes: string | null
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          due_date: string
          feedback?: string | null
          grade?: string | null
          id?: string
          status?: string | null
          title: string
          tutor_notes?: string | null
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          due_date?: string
          feedback?: string | null
          grade?: string | null
          id?: string
          status?: string | null
          title?: string
          tutor_notes?: string | null
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ojt_goals: {
        Row: {
          category: string
          created_at: string
          current_value: number | null
          deadline: string | null
          description: string | null
          id: string
          priority: string
          status: string | null
          target_value: number
          title: string
          unit: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          current_value?: number | null
          deadline?: string | null
          description?: string | null
          id?: string
          priority: string
          status?: string | null
          target_value: number
          title: string
          unit: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          current_value?: number | null
          deadline?: string | null
          description?: string | null
          id?: string
          priority?: string
          status?: string | null
          target_value?: number
          title?: string
          unit?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ojt_notifications: {
        Row: {
          created_at: string
          data: Json | null
          id: string
          is_read: boolean | null
          message: string
          priority: string | null
          scheduled_for: string | null
          sent_at: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id?: string
          is_read?: boolean | null
          message: string
          priority?: string | null
          scheduled_for?: string | null
          sent_at?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: string
          is_read?: boolean | null
          message?: string
          priority?: string | null
          scheduled_for?: string | null
          sent_at?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      ojt_reports: {
        Row: {
          data: Json
          export_format: string | null
          exported_at: string | null
          generated_at: string
          id: string
          report_type: string
          title: string
          user_id: string
        }
        Insert: {
          data: Json
          export_format?: string | null
          exported_at?: string | null
          generated_at?: string
          id?: string
          report_type: string
          title: string
          user_id: string
        }
        Update: {
          data?: Json
          export_format?: string | null
          exported_at?: string | null
          generated_at?: string
          id?: string
          report_type?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      onsite_guide_tables: {
        Row: {
          applies_to: string[] | null
          created_at: string | null
          id: string
          json_data: Json
          notes: string | null
          section: string
          table_number: string
          table_title: string
          updated_at: string | null
        }
        Insert: {
          applies_to?: string[] | null
          created_at?: string | null
          id?: string
          json_data?: Json
          notes?: string | null
          section: string
          table_number: string
          table_title: string
          updated_at?: string | null
        }
        Update: {
          applies_to?: string[] | null
          created_at?: string | null
          id?: string
          json_data?: Json
          notes?: string | null
          section?: string
          table_number?: string
          table_title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      pdf_templates: {
        Row: {
          created_at: string | null
          field_mapping: Json | null
          file_url: string | null
          id: string
          is_active: boolean | null
          name: string
          pdf_monkey_template_id: string | null
          type: Database["public"]["Enums"]["document_type"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          field_mapping?: Json | null
          file_url?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          pdf_monkey_template_id?: string | null
          type: Database["public"]["Enums"]["document_type"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          field_mapping?: Json | null
          file_url?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          pdf_monkey_template_id?: string | null
          type?: Database["public"]["Enums"]["document_type"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      portfolio_items: {
        Row: {
          assessment_criteria_met: string[] | null
          category: string
          created_at: string
          description: string | null
          file_type: string | null
          file_url: string | null
          grade: string | null
          id: string
          learning_outcomes_met: string[] | null
          qualification_category_id: string | null
          reflection_notes: string | null
          skills_demonstrated: string[] | null
          supervisor_feedback: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assessment_criteria_met?: string[] | null
          category: string
          created_at?: string
          description?: string | null
          file_type?: string | null
          file_url?: string | null
          grade?: string | null
          id?: string
          learning_outcomes_met?: string[] | null
          qualification_category_id?: string | null
          reflection_notes?: string | null
          skills_demonstrated?: string[] | null
          supervisor_feedback?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assessment_criteria_met?: string[] | null
          category?: string
          created_at?: string
          description?: string | null
          file_type?: string | null
          file_url?: string | null
          grade?: string | null
          id?: string
          learning_outcomes_met?: string[] | null
          qualification_category_id?: string | null
          reflection_notes?: string | null
          skills_demonstrated?: string[] | null
          supervisor_feedback?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_items_qualification_category_id_fkey"
            columns: ["qualification_category_id"]
            isOneToOne: false
            referencedRelation: "qualification_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      price_history: {
        Row: {
          id: string
          item_name: string
          price: number
          recorded_at: string | null
          wholesaler: string
        }
        Insert: {
          id?: string
          item_name: string
          price: number
          recorded_at?: string | null
          wholesaler: string
        }
        Update: {
          id?: string
          item_name?: string
          price?: number
          recorded_at?: string | null
          wholesaler?: string
        }
        Relationships: []
      }
      price_reports: {
        Row: {
          attributes: Json
          complexity_level: string
          county: string | null
          created_at: string
          currency: string
          data_source: string
          id: string
          ip_address: string | null
          job_type: string
          lat: number | null
          lng: number | null
          notes: string | null
          postcode: string | null
          price: number
          region: string
          status: string
          unit: string
          updated_at: string
          user_agent: string | null
        }
        Insert: {
          attributes?: Json
          complexity_level?: string
          county?: string | null
          created_at?: string
          currency?: string
          data_source?: string
          id?: string
          ip_address?: string | null
          job_type: string
          lat?: number | null
          lng?: number | null
          notes?: string | null
          postcode?: string | null
          price: number
          region: string
          status?: string
          unit?: string
          updated_at?: string
          user_agent?: string | null
        }
        Update: {
          attributes?: Json
          complexity_level?: string
          county?: string | null
          created_at?: string
          currency?: string
          data_source?: string
          id?: string
          ip_address?: string | null
          job_type?: string
          lat?: number | null
          lng?: number | null
          notes?: string | null
          postcode?: string | null
          price?: number
          region?: string
          status?: string
          unit?: string
          updated_at?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      pricing_data_sources: {
        Row: {
          api_config: Json | null
          base_url: string | null
          created_at: string
          id: string
          is_active: boolean
          last_scraped_at: string | null
          reliability_score: number | null
          scrape_frequency_hours: number | null
          source_name: string
          source_type: string
          updated_at: string
        }
        Insert: {
          api_config?: Json | null
          base_url?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          last_scraped_at?: string | null
          reliability_score?: number | null
          scrape_frequency_hours?: number | null
          source_name: string
          source_type: string
          updated_at?: string
        }
        Update: {
          api_config?: Json | null
          base_url?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          last_scraped_at?: string | null
          reliability_score?: number | null
          scrape_frequency_hours?: number | null
          source_name?: string
          source_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      pricing_embeddings: {
        Row: {
          base_cost: number
          category: string
          content: string
          embedding: string | null
          id: string
          in_stock: boolean | null
          item_name: string
          last_scraped: string | null
          metadata: Json | null
          price_per_unit: string | null
          product_url: string | null
          wholesaler: string
        }
        Insert: {
          base_cost: number
          category: string
          content: string
          embedding?: string | null
          id?: string
          in_stock?: boolean | null
          item_name: string
          last_scraped?: string | null
          metadata?: Json | null
          price_per_unit?: string | null
          product_url?: string | null
          wholesaler: string
        }
        Update: {
          base_cost?: number
          category?: string
          content?: string
          embedding?: string | null
          id?: string
          in_stock?: boolean | null
          item_name?: string
          last_scraped?: string | null
          metadata?: Json | null
          price_per_unit?: string | null
          product_url?: string | null
          wholesaler?: string
        }
        Relationships: []
      }
      pricing_ingest_log: {
        Row: {
          completed_at: string | null
          created_at: string
          error_message: string | null
          id: string
          ingest_type: string
          notes: string | null
          records_processed: number
          status: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          ingest_type: string
          notes?: string | null
          records_processed?: number
          status?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          ingest_type?: string
          notes?: string | null
          records_processed?: number
          status?: string
        }
        Relationships: []
      }
      professional_bodies: {
        Row: {
          annual_cpd_hours: number
          assessment_cycle: string
          categories: Json
          code: string
          created_at: string
          description: string | null
          id: string
          name: string
          renewal_period_months: number
          requirements: Json
          updated_at: string
          website_url: string | null
        }
        Insert: {
          annual_cpd_hours: number
          assessment_cycle?: string
          categories?: Json
          code: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
          renewal_period_months?: number
          requirements?: Json
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          annual_cpd_hours?: number
          assessment_cycle?: string
          categories?: Json
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          renewal_period_months?: number
          requirements?: Json
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          subscribed: boolean | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          subscribed?: boolean | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          subscribed?: boolean | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      project_exports: {
        Row: {
          conversation_id: string
          created_at: string
          eic_schedule_id: string | null
          exported_at: string
          id: string
          method_statement_data: Json | null
          quote_id: string | null
          rams_data: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          conversation_id: string
          created_at?: string
          eic_schedule_id?: string | null
          exported_at?: string
          id?: string
          method_statement_data?: Json | null
          quote_id?: string | null
          rams_data?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          conversation_id?: string
          created_at?: string
          eic_schedule_id?: string | null
          exported_at?: string
          id?: string
          method_statement_data?: Json | null
          quote_id?: string | null
          rams_data?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_exports_eic_schedule_id_fkey"
            columns: ["eic_schedule_id"]
            isOneToOne: false
            referencedRelation: "eic_schedules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_exports_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      project_mgmt_knowledge: {
        Row: {
          content: string
          created_at: string | null
          embedding: string | null
          id: string
          metadata: Json | null
          source: string
          topic: string
        }
        Insert: {
          content: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          source: string
          topic: string
        }
        Update: {
          content?: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          source?: string
          topic?: string
        }
        Relationships: []
      }
      qualification_categories: {
        Row: {
          assessment_criteria: string[] | null
          color: string | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          learning_outcomes: string[] | null
          name: string
          qualification_id: string
          required_entries: number
        }
        Insert: {
          assessment_criteria?: string[] | null
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          learning_outcomes?: string[] | null
          name: string
          qualification_id: string
          required_entries?: number
        }
        Update: {
          assessment_criteria?: string[] | null
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          learning_outcomes?: string[] | null
          name?: string
          qualification_id?: string
          required_entries?: number
        }
        Relationships: [
          {
            foreignKeyName: "qualification_categories_qualification_id_fkey"
            columns: ["qualification_id"]
            isOneToOne: false
            referencedRelation: "qualifications"
            referencedColumns: ["id"]
          },
        ]
      }
      qualification_compliance: {
        Row: {
          category_id: string
          completed_entries: number | null
          compliance_percentage: number | null
          created_at: string
          id: string
          last_updated: string | null
          qualification_id: string
          required_entries: number
          user_id: string
        }
        Insert: {
          category_id: string
          completed_entries?: number | null
          compliance_percentage?: number | null
          created_at?: string
          id?: string
          last_updated?: string | null
          qualification_id: string
          required_entries: number
          user_id: string
        }
        Update: {
          category_id?: string
          completed_entries?: number | null
          compliance_percentage?: number | null
          created_at?: string
          id?: string
          last_updated?: string | null
          qualification_id?: string
          required_entries?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "qualification_compliance_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "qualification_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qualification_compliance_qualification_id_fkey"
            columns: ["qualification_id"]
            isOneToOne: false
            referencedRelation: "qualifications"
            referencedColumns: ["id"]
          },
        ]
      }
      qualification_templates: {
        Row: {
          created_at: string
          description: string | null
          evidence_requirements: string[] | null
          id: string
          qualification_category_id: string
          skills: string[] | null
          template_content: Json | null
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          evidence_requirements?: string[] | null
          id?: string
          qualification_category_id: string
          skills?: string[] | null
          template_content?: Json | null
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          evidence_requirements?: string[] | null
          id?: string
          qualification_category_id?: string
          skills?: string[] | null
          template_content?: Json | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "qualification_templates_qualification_category_id_fkey"
            columns: ["qualification_category_id"]
            isOneToOne: false
            referencedRelation: "qualification_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      qualifications: {
        Row: {
          awarding_body: string
          code: string
          created_at: string
          description: string | null
          id: string
          level: string
          requires_portfolio: boolean | null
          title: string
          updated_at: string
        }
        Insert: {
          awarding_body: string
          code: string
          created_at?: string
          description?: string | null
          id?: string
          level: string
          requires_portfolio?: boolean | null
          title: string
          updated_at?: string
        }
        Update: {
          awarding_body?: string
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          level?: string
          requires_portfolio?: boolean | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      quiz_attempts: {
        Row: {
          created_at: string | null
          id: string
          percentage: number
          score: number
          time_taken: number
          total_questions: number
          unit_code: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          percentage: number
          score: number
          time_taken: number
          total_questions: number
          unit_code: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          percentage?: number
          score?: number
          time_taken?: number
          total_questions?: number
          unit_code?: string
          user_id?: string
        }
        Relationships: []
      }
      quote_views: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          is_active: boolean
          last_viewed_at: string | null
          public_token: string
          quote_id: string
          view_count: number | null
        }
        Insert: {
          created_at?: string
          expires_at?: string
          id?: string
          is_active?: boolean
          last_viewed_at?: string | null
          public_token: string
          quote_id: string
          view_count?: number | null
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          is_active?: boolean
          last_viewed_at?: string | null
          public_token?: string
          quote_id?: string
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "quote_views_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      quotes: {
        Row: {
          acceptance_method: string | null
          acceptance_status: string | null
          accepted_at: string | null
          accepted_by_email: string | null
          accepted_by_name: string | null
          accepted_ip: string | null
          accepted_user_agent: string | null
          additional_invoice_items: Json | null
          client_data: Json
          created_at: string
          docusign_envelope_id: string | null
          docusign_status: string | null
          expiry_date: string
          id: string
          invoice_date: string | null
          invoice_due_date: string | null
          invoice_notes: string | null
          invoice_number: string | null
          invoice_raised: boolean | null
          invoice_status: string | null
          items: Json
          job_details: Json | null
          last_reminder_sent_at: string | null
          notes: string | null
          overhead: number
          profit: number
          public_token: string | null
          quote_number: string
          settings: Json
          signature_url: string | null
          status: string
          subtotal: number
          tags: string[] | null
          total: number
          updated_at: string
          user_id: string
          vat_amount: number
          work_completion_date: string | null
        }
        Insert: {
          acceptance_method?: string | null
          acceptance_status?: string | null
          accepted_at?: string | null
          accepted_by_email?: string | null
          accepted_by_name?: string | null
          accepted_ip?: string | null
          accepted_user_agent?: string | null
          additional_invoice_items?: Json | null
          client_data: Json
          created_at?: string
          docusign_envelope_id?: string | null
          docusign_status?: string | null
          expiry_date: string
          id?: string
          invoice_date?: string | null
          invoice_due_date?: string | null
          invoice_notes?: string | null
          invoice_number?: string | null
          invoice_raised?: boolean | null
          invoice_status?: string | null
          items?: Json
          job_details?: Json | null
          last_reminder_sent_at?: string | null
          notes?: string | null
          overhead?: number
          profit?: number
          public_token?: string | null
          quote_number: string
          settings: Json
          signature_url?: string | null
          status?: string
          subtotal?: number
          tags?: string[] | null
          total?: number
          updated_at?: string
          user_id: string
          vat_amount?: number
          work_completion_date?: string | null
        }
        Update: {
          acceptance_method?: string | null
          acceptance_status?: string | null
          accepted_at?: string | null
          accepted_by_email?: string | null
          accepted_by_name?: string | null
          accepted_ip?: string | null
          accepted_user_agent?: string | null
          additional_invoice_items?: Json | null
          client_data?: Json
          created_at?: string
          docusign_envelope_id?: string | null
          docusign_status?: string | null
          expiry_date?: string
          id?: string
          invoice_date?: string | null
          invoice_due_date?: string | null
          invoice_notes?: string | null
          invoice_number?: string | null
          invoice_raised?: boolean | null
          invoice_status?: string | null
          items?: Json
          job_details?: Json | null
          last_reminder_sent_at?: string | null
          notes?: string | null
          overhead?: number
          profit?: number
          public_token?: string | null
          quote_number?: string
          settings?: Json
          signature_url?: string | null
          status?: string
          subtotal?: number
          tags?: string[] | null
          total?: number
          updated_at?: string
          user_id?: string
          vat_amount?: number
          work_completion_date?: string | null
        }
        Relationships: []
      }
      rams_documents: {
        Row: {
          activities: string[] | null
          ai_generation_metadata: Json | null
          assessor: string
          contractor: string | null
          created_at: string
          date: string
          id: string
          job_scale: string | null
          last_autosave_at: string | null
          location: string
          pdf_url: string | null
          project_name: string
          risks: Json
          status: string
          supervisor: string | null
          updated_at: string
          user_id: string
          version: number
        }
        Insert: {
          activities?: string[] | null
          ai_generation_metadata?: Json | null
          assessor: string
          contractor?: string | null
          created_at?: string
          date: string
          id?: string
          job_scale?: string | null
          last_autosave_at?: string | null
          location: string
          pdf_url?: string | null
          project_name: string
          risks?: Json
          status?: string
          supervisor?: string | null
          updated_at?: string
          user_id: string
          version?: number
        }
        Update: {
          activities?: string[] | null
          ai_generation_metadata?: Json | null
          assessor?: string
          contractor?: string | null
          created_at?: string
          date?: string
          id?: string
          job_scale?: string | null
          last_autosave_at?: string | null
          location?: string
          pdf_url?: string | null
          project_name?: string
          risks?: Json
          status?: string
          supervisor?: string | null
          updated_at?: string
          user_id?: string
          version?: number
        }
        Relationships: []
      }
      rams_method_links: {
        Row: {
          created_at: string
          hazard_ids: string[] | null
          id: string
          link_type: string
          method_statement_id: string | null
          rams_id: string | null
          task_ids: string[] | null
          user_id: string
        }
        Insert: {
          created_at?: string
          hazard_ids?: string[] | null
          id?: string
          link_type?: string
          method_statement_id?: string | null
          rams_id?: string | null
          task_ids?: string[] | null
          user_id: string
        }
        Update: {
          created_at?: string
          hazard_ids?: string[] | null
          id?: string
          link_type?: string
          method_statement_id?: string | null
          rams_id?: string | null
          task_ids?: string[] | null
          user_id?: string
        }
        Relationships: []
      }
      regional_job_pricing: {
        Row: {
          average_price: number
          complexity_level: string
          confidence_score: number | null
          county: string | null
          created_at: string
          currency: string
          data_source: string | null
          id: string
          is_active: boolean
          job_category: string
          job_type: string
          last_updated: string
          max_price: number
          min_price: number
          region: string
          unit: string
          updated_at: string
        }
        Insert: {
          average_price: number
          complexity_level?: string
          confidence_score?: number | null
          county?: string | null
          created_at?: string
          currency?: string
          data_source?: string | null
          id?: string
          is_active?: boolean
          job_category: string
          job_type: string
          last_updated?: string
          max_price: number
          min_price: number
          region: string
          unit?: string
          updated_at?: string
        }
        Update: {
          average_price?: number
          complexity_level?: string
          confidence_score?: number | null
          county?: string | null
          created_at?: string
          currency?: string
          data_source?: string | null
          id?: string
          is_active?: boolean
          job_category?: string
          job_type?: string
          last_updated?: string
          max_price?: number
          min_price?: number
          region?: string
          unit?: string
          updated_at?: string
        }
        Relationships: []
      }
      regional_multipliers: {
        Row: {
          cost_of_living_index: number | null
          county: string | null
          created_at: string
          id: string
          last_updated: string
          multiplier: number
          region: string
        }
        Insert: {
          cost_of_living_index?: number | null
          county?: string | null
          created_at?: string
          id?: string
          last_updated?: string
          multiplier?: number
          region: string
        }
        Update: {
          cost_of_living_index?: number | null
          county?: string | null
          created_at?: string
          id?: string
          last_updated?: string
          multiplier?: number
          region?: string
        }
        Relationships: []
      }
      regulation_index: {
        Row: {
          bs7671_section: string | null
          category: string
          circuit_types: string[]
          created_at: string
          id: string
          natural_language_terms: string[]
          power_range_max: number | null
          power_range_min: number | null
          priority_score: number | null
          regulation_number: string
          semantic_tags: string[]
          updated_at: string
        }
        Insert: {
          bs7671_section?: string | null
          category: string
          circuit_types?: string[]
          created_at?: string
          id?: string
          natural_language_terms?: string[]
          power_range_max?: number | null
          power_range_min?: number | null
          priority_score?: number | null
          regulation_number: string
          semantic_tags?: string[]
          updated_at?: string
        }
        Update: {
          bs7671_section?: string | null
          category?: string
          circuit_types?: string[]
          created_at?: string
          id?: string
          natural_language_terms?: string[]
          power_range_max?: number | null
          power_range_min?: number | null
          priority_score?: number | null
          regulation_number?: string
          semantic_tags?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      safety_alerts: {
        Row: {
          average_rating: number | null
          category: string
          content: string
          created_at: string
          date_published: string
          id: string
          is_active: boolean
          severity: string
          summary: string
          title: string
          updated_at: string
          view_count: number | null
        }
        Insert: {
          average_rating?: number | null
          category: string
          content: string
          created_at?: string
          date_published?: string
          id?: string
          is_active?: boolean
          severity: string
          summary: string
          title: string
          updated_at?: string
          view_count?: number | null
        }
        Update: {
          average_rating?: number | null
          category?: string
          content?: string
          created_at?: string
          date_published?: string
          id?: string
          is_active?: boolean
          severity?: string
          summary?: string
          title?: string
          updated_at?: string
          view_count?: number | null
        }
        Relationships: []
      }
      safety_bookmarks: {
        Row: {
          content_id: string
          content_type: string
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          content_id: string
          content_type: string
          created_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          content_id?: string
          content_type?: string
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      safety_content_admin: {
        Row: {
          action_type: string
          approved_at: string | null
          approved_by: string | null
          content_id: string
          content_type: string
          created_at: string | null
          id: string
          new_data: Json | null
          old_data: Json | null
          status: string | null
          user_id: string
        }
        Insert: {
          action_type: string
          approved_at?: string | null
          approved_by?: string | null
          content_id: string
          content_type: string
          created_at?: string | null
          id?: string
          new_data?: Json | null
          old_data?: Json | null
          status?: string | null
          user_id: string
        }
        Update: {
          action_type?: string
          approved_at?: string | null
          approved_by?: string | null
          content_id?: string
          content_type?: string
          created_at?: string | null
          id?: string
          new_data?: Json | null
          old_data?: Json | null
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      safety_content_ratings: {
        Row: {
          content_id: string
          content_type: string
          created_at: string | null
          feedback: string | null
          id: string
          rating: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content_id: string
          content_type: string
          created_at?: string | null
          feedback?: string | null
          id?: string
          rating?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content_id?: string
          content_type?: string
          created_at?: string | null
          feedback?: string | null
          id?: string
          rating?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      safety_content_views: {
        Row: {
          content_id: string
          content_type: string
          created_at: string | null
          id: string
          ip_address: unknown | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          content_id: string
          content_type: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          content_id?: string
          content_type?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      safety_photos: {
        Row: {
          category: string
          created_at: string
          description: string
          file_size: number | null
          file_url: string
          filename: string
          folder_name: string | null
          gps_latitude: number | null
          gps_longitude: number | null
          id: string
          location: string | null
          mime_type: string | null
          project_reference: string | null
          tags: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          file_size?: number | null
          file_url: string
          filename: string
          folder_name?: string | null
          gps_latitude?: number | null
          gps_longitude?: number | null
          id?: string
          location?: string | null
          mime_type?: string | null
          project_reference?: string | null
          tags?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          file_size?: number | null
          file_url?: string
          filename?: string
          folder_name?: string | null
          gps_latitude?: number | null
          gps_longitude?: number | null
          id?: string
          location?: string | null
          mime_type?: string | null
          project_reference?: string | null
          tags?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      safety_resources: {
        Row: {
          average_rating: number | null
          category: string
          created_at: string
          date_published: string
          download_count: number | null
          file_bucket: string | null
          file_path: string | null
          file_size: string | null
          file_type: string
          file_url: string | null
          id: string
          is_active: boolean
          summary: string
          title: string
          updated_at: string
          view_count: number | null
        }
        Insert: {
          average_rating?: number | null
          category: string
          created_at?: string
          date_published?: string
          download_count?: number | null
          file_bucket?: string | null
          file_path?: string | null
          file_size?: string | null
          file_type: string
          file_url?: string | null
          id?: string
          is_active?: boolean
          summary: string
          title: string
          updated_at?: string
          view_count?: number | null
        }
        Update: {
          average_rating?: number | null
          category?: string
          created_at?: string
          date_published?: string
          download_count?: number | null
          file_bucket?: string | null
          file_path?: string | null
          file_size?: string | null
          file_type?: string
          file_url?: string | null
          id?: string
          is_active?: boolean
          summary?: string
          title?: string
          updated_at?: string
          view_count?: number | null
        }
        Relationships: []
      }
      safety_subscriptions: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          subscription_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          subscription_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          subscription_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      saved_designs: {
        Row: {
          circuits: Json
          client_email: string | null
          client_name: string | null
          cost_estimate: Json | null
          created_at: string | null
          design_calculations: Json | null
          exported_at: string | null
          h_and_s_data: Json | null
          id: string
          installation_address: string | null
          installation_postcode: string | null
          materials_list: Json | null
          project_name: string
          rams_data: Json | null
          status: string | null
          test_expectations: Json
          updated_at: string | null
          user_id: string
        }
        Insert: {
          circuits?: Json
          client_email?: string | null
          client_name?: string | null
          cost_estimate?: Json | null
          created_at?: string | null
          design_calculations?: Json | null
          exported_at?: string | null
          h_and_s_data?: Json | null
          id?: string
          installation_address?: string | null
          installation_postcode?: string | null
          materials_list?: Json | null
          project_name: string
          rams_data?: Json | null
          status?: string | null
          test_expectations?: Json
          updated_at?: string | null
          user_id: string
        }
        Update: {
          circuits?: Json
          client_email?: string | null
          client_name?: string | null
          cost_estimate?: Json | null
          created_at?: string | null
          design_calculations?: Json | null
          exported_at?: string | null
          h_and_s_data?: Json | null
          id?: string
          installation_address?: string | null
          installation_postcode?: string | null
          materials_list?: Json | null
          project_name?: string
          rams_data?: Json | null
          status?: string | null
          test_expectations?: Json
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      scraped_project_tracking: {
        Row: {
          created_at: string
          external_id: string
          id: string
          project_id: string | null
          source_name: string
        }
        Insert: {
          created_at?: string
          external_id: string
          id?: string
          project_id?: string | null
          source_name: string
        }
        Update: {
          created_at?: string
          external_id?: string
          id?: string
          project_id?: string | null
          source_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "scraped_project_tracking_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "major_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      scraping_logs: {
        Row: {
          created_at: string
          error_message: string | null
          execution_time_ms: number | null
          id: string
          projects_added: number | null
          projects_found: number | null
          source_id: string | null
          status: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          execution_time_ms?: number | null
          id?: string
          projects_added?: number | null
          projects_found?: number | null
          source_id?: string | null
          status: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          execution_time_ms?: number | null
          id?: string
          projects_added?: number | null
          projects_found?: number | null
          source_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "scraping_logs_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "scraping_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      scraping_sources: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          last_scraped_at: string | null
          name: string
          scrape_frequency_hours: number
          selector_config: Json
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          last_scraped_at?: string | null
          name: string
          scrape_frequency_hours?: number
          selector_config: Json
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          last_scraped_at?: string | null
          name?: string
          scrape_frequency_hours?: number
          selector_config?: Json
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      security_audit_log: {
        Row: {
          action: string
          created_at: string | null
          id: string
          ip_address: unknown | null
          record_id: string | null
          table_name: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      study_sessions: {
        Row: {
          activity: string
          course_slug: string
          created_at: string | null
          duration: number
          id: string
          notes: string | null
          resource_type: string | null
          user_id: string
        }
        Insert: {
          activity: string
          course_slug: string
          created_at?: string | null
          duration: number
          id?: string
          notes?: string | null
          resource_type?: string | null
          user_id: string
        }
        Update: {
          activity?: string
          course_slug?: string
          created_at?: string | null
          duration?: number
          id?: string
          notes?: string | null
          resource_type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      supplier_price_snapshots: {
        Row: {
          category: string
          created_at: string
          currency: string
          data_source: string
          id: string
          last_updated: string
          price: number
          product_name: string
          sku: string | null
          supplier_name: string
          unit: string
        }
        Insert: {
          category: string
          created_at?: string
          currency?: string
          data_source?: string
          id?: string
          last_updated?: string
          price: number
          product_name: string
          sku?: string | null
          supplier_name: string
          unit?: string
        }
        Update: {
          category?: string
          created_at?: string
          currency?: string
          data_source?: string
          id?: string
          last_updated?: string
          price?: number
          product_name?: string
          sku?: string | null
          supplier_name?: string
          unit?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          category: string
          created_at: string
          description: string | null
          estimated_duration: string | null
          id: string
          linked_hazards: string[] | null
          linked_method_steps: string[] | null
          prerequisites: string[] | null
          responsible_person: string | null
          risk_level: string
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          estimated_duration?: string | null
          id?: string
          linked_hazards?: string[] | null
          linked_method_steps?: string[] | null
          prerequisites?: string[] | null
          responsible_person?: string | null
          risk_level: string
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          estimated_duration?: string | null
          id?: string
          linked_hazards?: string[] | null
          linked_method_steps?: string[] | null
          prerequisites?: string[] | null
          responsible_person?: string | null
          risk_level?: string
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      team_briefings: {
        Row: {
          ai_generated: boolean | null
          ai_prompt_data: Json | null
          attendees: Json
          briefing_date: string
          briefing_description: string | null
          briefing_name: string
          briefing_time: string
          briefing_type: string | null
          cancelled_at: string | null
          cancelled_reason: string | null
          completed: boolean
          conductor_name: string | null
          contractor_company: string | null
          created_at: string
          created_by_name: string | null
          custom_hazards: string | null
          duration_minutes: number | null
          environment_type: string | null
          equipment_required: string[] | null
          hazards: string | null
          id: string
          identified_hazards: string[] | null
          job_name: string | null
          key_points: string[] | null
          linked_near_miss_id: string | null
          location: string
          notes: string | null
          pdf_document_id: string | null
          pdf_generated_at: string | null
          pdf_url: string | null
          photos: Json | null
          risk_level: string | null
          safety_points: string[] | null
          safety_warning: string | null
          special_considerations: string | null
          started_at: string | null
          status: string | null
          team_size: number | null
          template_id: string
          updated_at: string
          user_id: string
          work_scope: string | null
        }
        Insert: {
          ai_generated?: boolean | null
          ai_prompt_data?: Json | null
          attendees?: Json
          briefing_date: string
          briefing_description?: string | null
          briefing_name: string
          briefing_time: string
          briefing_type?: string | null
          cancelled_at?: string | null
          cancelled_reason?: string | null
          completed?: boolean
          conductor_name?: string | null
          contractor_company?: string | null
          created_at?: string
          created_by_name?: string | null
          custom_hazards?: string | null
          duration_minutes?: number | null
          environment_type?: string | null
          equipment_required?: string[] | null
          hazards?: string | null
          id?: string
          identified_hazards?: string[] | null
          job_name?: string | null
          key_points?: string[] | null
          linked_near_miss_id?: string | null
          location: string
          notes?: string | null
          pdf_document_id?: string | null
          pdf_generated_at?: string | null
          pdf_url?: string | null
          photos?: Json | null
          risk_level?: string | null
          safety_points?: string[] | null
          safety_warning?: string | null
          special_considerations?: string | null
          started_at?: string | null
          status?: string | null
          team_size?: number | null
          template_id: string
          updated_at?: string
          user_id: string
          work_scope?: string | null
        }
        Update: {
          ai_generated?: boolean | null
          ai_prompt_data?: Json | null
          attendees?: Json
          briefing_date?: string
          briefing_description?: string | null
          briefing_name?: string
          briefing_time?: string
          briefing_type?: string | null
          cancelled_at?: string | null
          cancelled_reason?: string | null
          completed?: boolean
          conductor_name?: string | null
          contractor_company?: string | null
          created_at?: string
          created_by_name?: string | null
          custom_hazards?: string | null
          duration_minutes?: number | null
          environment_type?: string | null
          equipment_required?: string[] | null
          hazards?: string | null
          id?: string
          identified_hazards?: string[] | null
          job_name?: string | null
          key_points?: string[] | null
          linked_near_miss_id?: string | null
          location?: string
          notes?: string | null
          pdf_document_id?: string | null
          pdf_generated_at?: string | null
          pdf_url?: string | null
          photos?: Json | null
          risk_level?: string | null
          safety_points?: string[] | null
          safety_warning?: string | null
          special_considerations?: string | null
          started_at?: string | null
          status?: string | null
          team_size?: number | null
          template_id?: string
          updated_at?: string
          user_id?: string
          work_scope?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_briefings_linked_near_miss_id_fkey"
            columns: ["linked_near_miss_id"]
            isOneToOne: false
            referencedRelation: "near_miss_reports"
            referencedColumns: ["id"]
          },
        ]
      }
      testing_limits: {
        Row: {
          circuit_type: string | null
          created_at: string | null
          gs38_reference: string | null
          id: string
          max_value: number | null
          min_value: number | null
          notes: string | null
          regulation_reference: string | null
          test_type: string
          unit: string
          updated_at: string | null
          voltage_level: string | null
        }
        Insert: {
          circuit_type?: string | null
          created_at?: string | null
          gs38_reference?: string | null
          id?: string
          max_value?: number | null
          min_value?: number | null
          notes?: string | null
          regulation_reference?: string | null
          test_type: string
          unit: string
          updated_at?: string | null
          voltage_level?: string | null
        }
        Update: {
          circuit_type?: string | null
          created_at?: string | null
          gs38_reference?: string | null
          id?: string
          max_value?: number | null
          min_value?: number | null
          notes?: string | null
          regulation_reference?: string | null
          test_type?: string
          unit?: string
          updated_at?: string | null
          voltage_level?: string | null
        }
        Relationships: []
      }
      time_entries: {
        Row: {
          activity: string
          compliance_category: string | null
          created_at: string | null
          date: string
          duration: number
          evidence_urls: string[] | null
          id: string
          is_automatic: boolean | null
          learning_outcomes: string[] | null
          notes: string | null
          portfolio_item_id: string | null
          session_id: string | null
          user_id: string
        }
        Insert: {
          activity: string
          compliance_category?: string | null
          created_at?: string | null
          date: string
          duration: number
          evidence_urls?: string[] | null
          id?: string
          is_automatic?: boolean | null
          learning_outcomes?: string[] | null
          notes?: string | null
          portfolio_item_id?: string | null
          session_id?: string | null
          user_id: string
        }
        Update: {
          activity?: string
          compliance_category?: string | null
          created_at?: string | null
          date?: string
          duration?: number
          evidence_urls?: string[] | null
          id?: string
          is_automatic?: boolean | null
          learning_outcomes?: string[] | null
          notes?: string | null
          portfolio_item_id?: string | null
          session_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      time_entry_approvals: {
        Row: {
          created_at: string
          id: string
          reviewed_at: string | null
          status: string | null
          submitted_at: string | null
          time_entry_id: string
          tutor_comments: string | null
          tutor_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          reviewed_at?: string | null
          status?: string | null
          submitted_at?: string | null
          time_entry_id: string
          tutor_comments?: string | null
          tutor_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          reviewed_at?: string | null
          status?: string | null
          submitted_at?: string | null
          time_entry_id?: string
          tutor_comments?: string | null
          tutor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "time_entry_approvals_time_entry_id_fkey"
            columns: ["time_entry_id"]
            isOneToOne: false
            referencedRelation: "time_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      time_tracking_sessions: {
        Row: {
          activity_type: string
          course_slug: string | null
          created_at: string
          duration: number | null
          end_time: string | null
          id: string
          is_active: boolean | null
          location: string | null
          notes: string | null
          start_time: string
          unit_code: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          activity_type: string
          course_slug?: string | null
          created_at?: string
          duration?: number | null
          end_time?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          notes?: string | null
          start_time?: string
          unit_code?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          activity_type?: string
          course_slug?: string | null
          created_at?: string
          duration?: number | null
          end_time?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          notes?: string | null
          start_time?: string
          unit_code?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      tool_guide_cache: {
        Row: {
          cache_version: number | null
          created_at: string
          expires_at: string
          guide_data: Json
          guide_type: string
          id: string
          last_refreshed: string | null
          refresh_scheduled_for: string | null
          refresh_status: string | null
          updated_at: string
        }
        Insert: {
          cache_version?: number | null
          created_at?: string
          expires_at?: string
          guide_data?: Json
          guide_type: string
          id?: string
          last_refreshed?: string | null
          refresh_scheduled_for?: string | null
          refresh_status?: string | null
          updated_at?: string
        }
        Update: {
          cache_version?: number | null
          created_at?: string
          expires_at?: string
          guide_data?: Json
          guide_type?: string
          id?: string
          last_refreshed?: string | null
          refresh_scheduled_for?: string | null
          refresh_status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      tool_guide_metadata: {
        Row: {
          created_at: string
          description: string | null
          development_status: string | null
          estimated_availability: string | null
          guide_type: string
          id: string
          priority: number | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          development_status?: string | null
          estimated_availability?: string | null
          guide_type: string
          id?: string
          priority?: number | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          development_status?: string | null
          estimated_availability?: string | null
          guide_type?: string
          id?: string
          priority?: number | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      tools_scrape_queue: {
        Row: {
          batch_number: number
          completed_at: string | null
          created_at: string
          error_message: string | null
          firecrawl_job_id: string | null
          firecrawl_job_url: string | null
          id: string
          started_at: string | null
          status: string
          tools_found: number | null
          urls: Json
        }
        Insert: {
          batch_number: number
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          firecrawl_job_id?: string | null
          firecrawl_job_url?: string | null
          id?: string
          started_at?: string | null
          status?: string
          tools_found?: number | null
          urls?: Json
        }
        Update: {
          batch_number?: number
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          firecrawl_job_id?: string | null
          firecrawl_job_url?: string | null
          id?: string
          started_at?: string | null
          status?: string
          tools_found?: number | null
          urls?: Json
        }
        Relationships: []
      }
      tools_weekly_cache: {
        Row: {
          category: string
          created_at: string
          expires_at: string
          id: string
          last_updated: string | null
          tools_data: Json
          total_products: number
          update_status: string | null
        }
        Insert: {
          category: string
          created_at?: string
          expires_at?: string
          id?: string
          last_updated?: string | null
          tools_data?: Json
          total_products?: number
          update_status?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          expires_at?: string
          id?: string
          last_updated?: string | null
          tools_data?: Json
          total_products?: number
          update_status?: string | null
        }
        Relationships: []
      }
      training_evidence: {
        Row: {
          assessment_criteria: string[] | null
          category: string | null
          created_at: string
          date_achieved: string
          description: string | null
          evidence_type: string
          file_name: string | null
          file_size: number | null
          file_url: string | null
          id: string
          learning_outcomes: string[] | null
          portfolio_linked: boolean | null
          tags: string[] | null
          time_spent: number | null
          title: string
          updated_at: string
          user_id: string
          verification_status: string | null
          witness_name: string | null
        }
        Insert: {
          assessment_criteria?: string[] | null
          category?: string | null
          created_at?: string
          date_achieved?: string
          description?: string | null
          evidence_type: string
          file_name?: string | null
          file_size?: number | null
          file_url?: string | null
          id?: string
          learning_outcomes?: string[] | null
          portfolio_linked?: boolean | null
          tags?: string[] | null
          time_spent?: number | null
          title: string
          updated_at?: string
          user_id: string
          verification_status?: string | null
          witness_name?: string | null
        }
        Update: {
          assessment_criteria?: string[] | null
          category?: string | null
          created_at?: string
          date_achieved?: string
          description?: string | null
          evidence_type?: string
          file_name?: string | null
          file_size?: number | null
          file_url?: string | null
          id?: string
          learning_outcomes?: string[] | null
          portfolio_linked?: boolean | null
          tags?: string[] | null
          time_spent?: number | null
          title?: string
          updated_at?: string
          user_id?: string
          verification_status?: string | null
          witness_name?: string | null
        }
        Relationships: []
      }
      uk_postcode_districts: {
        Row: {
          area_code: string
          avg_household_income: number | null
          contractor_density: number | null
          county: string | null
          created_at: string
          district_code: string
          id: string
          latitude: number
          local_authority: string | null
          longitude: number
          region: string
          transport_score: number | null
          updated_at: string
          urban_rural_classification: string | null
        }
        Insert: {
          area_code: string
          avg_household_income?: number | null
          contractor_density?: number | null
          county?: string | null
          created_at?: string
          district_code: string
          id?: string
          latitude: number
          local_authority?: string | null
          longitude: number
          region: string
          transport_score?: number | null
          updated_at?: string
          urban_rural_classification?: string | null
        }
        Update: {
          area_code?: string
          avg_household_income?: number | null
          contractor_density?: number | null
          county?: string | null
          created_at?: string
          district_code?: string
          id?: string
          latitude?: number
          local_authority?: string | null
          longitude?: number
          region?: string
          transport_score?: number | null
          updated_at?: string
          urban_rural_classification?: string | null
        }
        Relationships: []
      }
      uk_regions: {
        Row: {
          county: string | null
          created_at: string
          economic_factor: number | null
          id: string
          is_active: boolean
          population: number | null
          region_name: string
          region_type: string
        }
        Insert: {
          county?: string | null
          created_at?: string
          economic_factor?: number | null
          id?: string
          is_active?: boolean
          population?: number | null
          region_name: string
          region_type?: string
        }
        Update: {
          county?: string | null
          created_at?: string
          economic_factor?: number | null
          id?: string
          is_active?: boolean
          population?: number | null
          region_name?: string
          region_type?: string
        }
        Relationships: []
      }
      usage_analytics: {
        Row: {
          action_type: string
          context_data: Json | null
          created_at: string
          entity_id: string
          entity_type: string
          id: string
          user_id: string | null
        }
        Insert: {
          action_type: string
          context_data?: Json | null
          created_at?: string
          entity_id: string
          entity_type: string
          id?: string
          user_id?: string | null
        }
        Update: {
          action_type?: string
          context_data?: Json | null
          created_at?: string
          entity_id?: string
          entity_type?: string
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_activity: {
        Row: {
          badge: string | null
          created_at: string | null
          id: string
          last_active_date: string | null
          level: string | null
          points: number | null
          streak: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          badge?: string | null
          created_at?: string | null
          id?: string
          last_active_date?: string | null
          level?: string | null
          points?: number | null
          streak?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          badge?: string | null
          created_at?: string | null
          id?: string
          last_active_date?: string | null
          level?: string | null
          points?: number | null
          streak?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_professional_memberships: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          membership_number: string | null
          professional_body_id: string
          registration_date: string | null
          renewal_date: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          membership_number?: string | null
          professional_body_id: string
          registration_date?: string | null
          renewal_date?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          membership_number?: string | null
          professional_body_id?: string
          registration_date?: string | null
          renewal_date?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_professional_memberships_professional_body_id_fkey"
            columns: ["professional_body_id"]
            isOneToOne: false
            referencedRelation: "professional_bodies"
            referencedColumns: ["id"]
          },
        ]
      }
      user_qualification_selections: {
        Row: {
          id: string
          is_active: boolean
          progress_percentage: number | null
          qualification_id: string
          selected_at: string
          target_completion_date: string | null
          user_id: string
        }
        Insert: {
          id?: string
          is_active?: boolean
          progress_percentage?: number | null
          qualification_id: string
          selected_at?: string
          target_completion_date?: string | null
          user_id: string
        }
        Update: {
          id?: string
          is_active?: boolean
          progress_percentage?: number | null
          qualification_id?: string
          selected_at?: string
          target_completion_date?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_qualification_selections_qualification_id_fkey"
            columns: ["qualification_id"]
            isOneToOne: false
            referencedRelation: "qualifications"
            referencedColumns: ["id"]
          },
        ]
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
      current_prices: {
        Row: {
          category: string | null
          currency: string | null
          date_scraped: string | null
          price: number | null
          product_name: string | null
          product_url: string | null
          source_url: string | null
          supplier: string | null
        }
        Relationships: []
      }
      message_upvote_counts: {
        Row: {
          message_id: string | null
          upvote_count: number | null
        }
        Relationships: [
          {
            foreignKeyName: "global_chat_upvotes_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "global_chat_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      public_price_reports: {
        Row: {
          approximate_lat: number | null
          approximate_lng: number | null
          complexity_level: string | null
          county: string | null
          created_at: string | null
          currency: string | null
          data_source: string | null
          id: string | null
          job_type: string | null
          price: number | null
          region: string | null
          unit: string | null
        }
        Insert: {
          approximate_lat?: never
          approximate_lng?: never
          complexity_level?: string | null
          county?: string | null
          created_at?: string | null
          currency?: string | null
          data_source?: string | null
          id?: string | null
          job_type?: string | null
          price?: number | null
          region?: string | null
          unit?: string | null
        }
        Update: {
          approximate_lat?: never
          approximate_lng?: never
          complexity_level?: string | null
          county?: string | null
          created_at?: string | null
          currency?: string | null
          data_source?: string | null
          id?: string | null
          job_type?: string | null
          price?: number | null
          region?: string | null
          unit?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      can_access_quote_via_token: {
        Args: { q_id: string; token: string }
        Returns: boolean
      }
      cleanup_ai_cache: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_expired_cables_cache: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_expired_course_cache: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_expired_course_dates_cache: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_expired_education_cache: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_expired_guide_cache: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_expired_market_insights_cache: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_expired_materials_weekly_cache: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_expired_pricing_data: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_expired_tool_cache: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_expired_tools_cache: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      extract_postcode_district: {
        Args: { full_postcode: string }
        Returns: string
      }
      generate_content_hash: {
        Args: { content: string; source_url: string; title: string }
        Returns: string
      }
      get_chat_messages_with_upvote_status: {
        Args: { user_id: string }
        Returns: {
          author_avatar: string
          author_id: string
          author_name: string
          category: string
          content: string
          created_at: string
          has_user_upvoted: boolean
          id: string
          updated_at: string
          upvotes: number
        }[]
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_next_biweekly_refresh: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_next_sunday_education_refresh: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_next_sunday_market_refresh: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_next_sunday_refresh: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      is_owner_of_quote: {
        Args: { q_id: string }
        Returns: boolean
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      search_bs7671: {
        Args: {
          match_count?: number
          match_threshold?: number
          query_embedding: string
        }
        Returns: {
          amendment: string
          content: string
          id: string
          metadata: Json
          regulation_number: string
          section: string
          similarity: number
        }[]
      }
      search_design_knowledge: {
        Args:
          | {
              circuit_filter?: string
              match_count?: number
              match_threshold?: number
              query_embedding: string
              source_filter?: string
            }
          | {
              match_count?: number
              match_threshold?: number
              query_embedding: string
              source_filter?: string
            }
        Returns: {
          content: string
          id: string
          similarity: number
          source: string
          topic: string
        }[]
      }
      search_health_safety: {
        Args:
          | {
              match_count?: number
              match_threshold?: number
              query_embedding: string
              scale_filter?: string
              source_filter?: string
            }
          | {
              match_count?: number
              match_threshold?: number
              query_embedding: string
              source_filter?: string
            }
        Returns: {
          content: string
          id: string
          similarity: number
          source: string
          topic: string
        }[]
      }
      search_inspection_testing: {
        Args: {
          match_count?: number
          match_threshold?: number
          query_embedding: string
          source_filter?: string
        }
        Returns: {
          content: string
          id: string
          similarity: number
          source: string
          topic: string
        }[]
      }
      search_installation_knowledge: {
        Args:
          | {
              match_count?: number
              match_threshold?: number
              method_filter?: string
              query_embedding: string
              source_filter?: string
            }
          | {
              match_count?: number
              match_threshold?: number
              query_embedding: string
              source_filter?: string
            }
        Returns: {
          content: string
          id: string
          similarity: number
          source: string
          topic: string
        }[]
      }
      search_pricing: {
        Args: {
          category_filter?: string
          match_count?: number
          match_threshold?: number
          query_embedding: string
        }
        Returns: {
          base_cost: number
          category: string
          id: string
          in_stock: boolean
          item_name: string
          price_per_unit: string
          similarity: number
          wholesaler: string
        }[]
      }
      search_project_mgmt: {
        Args: {
          match_count?: number
          match_threshold?: number
          query_embedding: string
          source_filter?: string
        }
        Returns: {
          content: string
          id: string
          similarity: number
          source: string
          topic: string
        }[]
      }
      search_regulation_index: {
        Args: {
          search_circuit_type?: string
          search_power?: number
          search_terms?: string[]
        }
        Returns: {
          bs7671_section: string
          category: string
          match_score: number
          priority_score: number
          regulation_number: string
        }[]
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      trigger_materials_weekly_refresh: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      upsert_design_pattern: {
        Args: {
          p_cable_length: number
          p_circuit_type: string
          p_design_solution: Json
          p_pattern_hash: string
          p_power_rating: number
          p_regulations_cited: string[]
          p_response_time: number
          p_voltage: number
        }
        Returns: string
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      document_type:
        | "design_spec"
        | "quote"
        | "rams"
        | "checklist"
        | "test_schedule"
        | "eic"
      incident_status:
        | "draft"
        | "submitted"
        | "under_review"
        | "investigating"
        | "resolved"
        | "closed"
      incident_type:
        | "near_miss"
        | "unsafe_practice"
        | "faulty_equipment"
        | "injury"
        | "property_damage"
        | "environmental"
        | "security"
        | "other"
      severity_level: "low" | "medium" | "high" | "critical"
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
      app_role: ["admin", "moderator", "user"],
      document_type: [
        "design_spec",
        "quote",
        "rams",
        "checklist",
        "test_schedule",
        "eic",
      ],
      incident_status: [
        "draft",
        "submitted",
        "under_review",
        "investigating",
        "resolved",
        "closed",
      ],
      incident_type: [
        "near_miss",
        "unsafe_practice",
        "faulty_equipment",
        "injury",
        "property_damage",
        "environmental",
        "security",
        "other",
      ],
      severity_level: ["low", "medium", "high", "critical"],
    },
  },
} as const
