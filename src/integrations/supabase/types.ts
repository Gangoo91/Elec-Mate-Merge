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
      agent_metrics: {
        Row: {
          cache_hit: boolean | null
          calculation_time: number | null
          created_at: string | null
          error_type: string | null
          function_name: string
          gpt5_time: number | null
          id: string
          parse_time: number | null
          query_type: string | null
          rag_time: number | null
          regulation_count: number | null
          request_id: string
          success: boolean | null
          timestamp: string | null
          total_time: number
        }
        Insert: {
          cache_hit?: boolean | null
          calculation_time?: number | null
          created_at?: string | null
          error_type?: string | null
          function_name: string
          gpt5_time?: number | null
          id?: string
          parse_time?: number | null
          query_type?: string | null
          rag_time?: number | null
          regulation_count?: number | null
          request_id: string
          success?: boolean | null
          timestamp?: string | null
          total_time: number
        }
        Update: {
          cache_hit?: boolean | null
          calculation_time?: number | null
          created_at?: string | null
          error_type?: string | null
          function_name?: string
          gpt5_time?: number | null
          id?: string
          parse_time?: number | null
          query_type?: string | null
          rag_time?: number | null
          regulation_count?: number | null
          request_id?: string
          success?: boolean | null
          timestamp?: string | null
          total_time?: number
        }
        Relationships: []
      }
      agent_performance_metrics: {
        Row: {
          agent_name: string
          ai_duration_ms: number | null
          citation_confidence: number | null
          created_at: string | null
          entities_extracted: number | null
          error_type: string | null
          id: string
          query_complexity: string | null
          query_type: string | null
          rag_avg_score: number | null
          rag_cache_hit: boolean | null
          rag_duration_ms: number | null
          rag_result_count: number | null
          request_id: string
          success: boolean
          total_duration_ms: number | null
        }
        Insert: {
          agent_name: string
          ai_duration_ms?: number | null
          citation_confidence?: number | null
          created_at?: string | null
          entities_extracted?: number | null
          error_type?: string | null
          id?: string
          query_complexity?: string | null
          query_type?: string | null
          rag_avg_score?: number | null
          rag_cache_hit?: boolean | null
          rag_duration_ms?: number | null
          rag_result_count?: number | null
          request_id: string
          success: boolean
          total_duration_ms?: number | null
        }
        Update: {
          agent_name?: string
          ai_duration_ms?: number | null
          citation_confidence?: number | null
          created_at?: string | null
          entities_extracted?: number | null
          error_type?: string | null
          id?: string
          query_complexity?: string | null
          query_type?: string | null
          rag_avg_score?: number | null
          rag_cache_hit?: boolean | null
          rag_duration_ms?: number | null
          rag_result_count?: number | null
          request_id?: string
          success?: boolean
          total_duration_ms?: number | null
        }
        Relationships: []
      }
      agent_task_queue: {
        Row: {
          completed_at: string | null
          context_data: Json
          created_at: string
          id: string
          priority: number | null
          result: Json | null
          source_agent: string
          status: string
          target_agent: string
          updated_at: string
          user_id: string
          user_instruction: string | null
        }
        Insert: {
          completed_at?: string | null
          context_data: Json
          created_at?: string
          id?: string
          priority?: number | null
          result?: Json | null
          source_agent: string
          status?: string
          target_agent: string
          updated_at?: string
          user_id: string
          user_instruction?: string | null
        }
        Update: {
          completed_at?: string | null
          context_data?: Json
          created_at?: string
          id?: string
          priority?: number | null
          result?: Json | null
          source_agent?: string
          status?: string
          target_agent?: string
          updated_at?: string
          user_id?: string
          user_instruction?: string | null
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
        Relationships: []
      }
      app_settings: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          key: string
          updated_at: string | null
          value: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          key: string
          updated_at?: string | null
          value?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          key?: string
          updated_at?: string | null
          value?: string | null
        }
        Relationships: []
      }
      apprenticeship_ksbs: {
        Row: {
          assessment_methods: string[] | null
          created_at: string | null
          description: string | null
          id: string
          is_mandatory: boolean | null
          ksb_code: string
          ksb_type: string
          qualification_id: string | null
          sort_order: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assessment_methods?: string[] | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_mandatory?: boolean | null
          ksb_code: string
          ksb_type: string
          qualification_id?: string | null
          sort_order?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assessment_methods?: string[] | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_mandatory?: boolean | null
          ksb_code?: string
          ksb_type?: string
          qualification_id?: string | null
          sort_order?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "apprenticeship_ksbs_qualification_id_fkey"
            columns: ["qualification_id"]
            isOneToOne: false
            referencedRelation: "qualifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "apprenticeship_ksbs_qualification_id_fkey"
            columns: ["qualification_id"]
            isOneToOne: false
            referencedRelation: "v_iqa_sampling_status"
            referencedColumns: ["qualification_id"]
          },
        ]
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
      assessor_observations: {
        Row: {
          action_points: string[] | null
          activity_description: string
          activity_title: string
          assessor_id: string
          assessor_signed: boolean | null
          assessor_signed_at: string | null
          category_id: string | null
          created_at: string | null
          criteria_met: string[] | null
          criteria_not_met: string[] | null
          duration_minutes: number | null
          feedback_areas_for_development: string | null
          feedback_strengths: string | null
          follow_up_date: string | null
          follow_up_required: boolean | null
          id: string
          ksbs_observed: string[] | null
          location: string
          location_type: string | null
          observation_date: string
          observation_time: string | null
          outcome: string
          portfolio_item_id: string | null
          qualification_id: string | null
          student_acknowledged: boolean | null
          student_acknowledged_at: string | null
          updated_at: string | null
          user_id: string
          work_context: string | null
        }
        Insert: {
          action_points?: string[] | null
          activity_description: string
          activity_title: string
          assessor_id: string
          assessor_signed?: boolean | null
          assessor_signed_at?: string | null
          category_id?: string | null
          created_at?: string | null
          criteria_met?: string[] | null
          criteria_not_met?: string[] | null
          duration_minutes?: number | null
          feedback_areas_for_development?: string | null
          feedback_strengths?: string | null
          follow_up_date?: string | null
          follow_up_required?: boolean | null
          id?: string
          ksbs_observed?: string[] | null
          location: string
          location_type?: string | null
          observation_date: string
          observation_time?: string | null
          outcome: string
          portfolio_item_id?: string | null
          qualification_id?: string | null
          student_acknowledged?: boolean | null
          student_acknowledged_at?: string | null
          updated_at?: string | null
          user_id: string
          work_context?: string | null
        }
        Update: {
          action_points?: string[] | null
          activity_description?: string
          activity_title?: string
          assessor_id?: string
          assessor_signed?: boolean | null
          assessor_signed_at?: string | null
          category_id?: string | null
          created_at?: string | null
          criteria_met?: string[] | null
          criteria_not_met?: string[] | null
          duration_minutes?: number | null
          feedback_areas_for_development?: string | null
          feedback_strengths?: string | null
          follow_up_date?: string | null
          follow_up_required?: boolean | null
          id?: string
          ksbs_observed?: string[] | null
          location?: string
          location_type?: string | null
          observation_date?: string
          observation_time?: string | null
          outcome?: string
          portfolio_item_id?: string | null
          qualification_id?: string | null
          student_acknowledged?: boolean | null
          student_acknowledged_at?: string | null
          updated_at?: string | null
          user_id?: string
          work_context?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assessor_observations_assessor_id_fkey"
            columns: ["assessor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessor_observations_assessor_id_fkey"
            columns: ["assessor_id"]
            isOneToOne: false
            referencedRelation: "v_assessor_workload"
            referencedColumns: ["assessor_id"]
          },
          {
            foreignKeyName: "assessor_observations_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "qualification_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessor_observations_portfolio_item_id_fkey"
            columns: ["portfolio_item_id"]
            isOneToOne: false
            referencedRelation: "portfolio_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessor_observations_qualification_id_fkey"
            columns: ["qualification_id"]
            isOneToOne: false
            referencedRelation: "qualifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessor_observations_qualification_id_fkey"
            columns: ["qualification_id"]
            isOneToOne: false
            referencedRelation: "v_iqa_sampling_status"
            referencedColumns: ["qualification_id"]
          },
          {
            foreignKeyName: "assessor_observations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessor_observations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_assessor_workload"
            referencedColumns: ["assessor_id"]
          },
        ]
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
          last_checkpoint: Json | null
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
          last_checkpoint?: Json | null
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
          last_checkpoint?: Json | null
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
      briefing_status_history: {
        Row: {
          briefing_id: string | null
          changed_by: string | null
          created_at: string | null
          id: string
          new_status: string | null
          old_status: string | null
          reason: string | null
        }
        Insert: {
          briefing_id?: string | null
          changed_by?: string | null
          created_at?: string | null
          id?: string
          new_status?: string | null
          old_status?: string | null
          reason?: string | null
        }
        Update: {
          briefing_id?: string | null
          changed_by?: string | null
          created_at?: string | null
          id?: string
          new_status?: string | null
          old_status?: string | null
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "briefing_status_history_briefing_id_fkey"
            columns: ["briefing_id"]
            isOneToOne: false
            referencedRelation: "team_briefings"
            referencedColumns: ["id"]
          },
        ]
      }
      briefing_templates: {
        Row: {
          ai_prompt_template: string | null
          created_at: string | null
          description: string | null
          id: string
          is_default: boolean | null
          is_public: boolean | null
          name: string
          pdf_layout_config: Json | null
          template_schema: Json
          template_type: string
          updated_at: string | null
          usage_count: number | null
          user_id: string | null
        }
        Insert: {
          ai_prompt_template?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_default?: boolean | null
          is_public?: boolean | null
          name: string
          pdf_layout_config?: Json | null
          template_schema: Json
          template_type: string
          updated_at?: string | null
          usage_count?: number | null
          user_id?: string | null
        }
        Update: {
          ai_prompt_template?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_default?: boolean | null
          is_public?: boolean | null
          name?: string
          pdf_layout_config?: Json | null
          template_schema?: Json
          template_type?: string
          updated_at?: string | null
          usage_count?: number | null
          user_id?: string | null
        }
        Relationships: []
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
      circuit_design_cache: {
        Row: {
          cache_hash: string
          circuits: Json
          created_at: string | null
          design: Json
          hit_count: number | null
          id: string
          last_hit_at: string | null
          supply: Json
        }
        Insert: {
          cache_hash: string
          circuits: Json
          created_at?: string | null
          design: Json
          hit_count?: number | null
          id?: string
          last_hit_at?: string | null
          supply: Json
        }
        Update: {
          cache_hash?: string
          circuits?: Json
          created_at?: string | null
          design?: Json
          hit_count?: number | null
          id?: string
          last_hit_at?: string | null
          supply?: Json
        }
        Relationships: []
      }
      circuit_design_cache_v3: {
        Row: {
          cache_key: string
          created_at: string | null
          design: Json
          hit_count: number | null
          id: string
          last_hit_at: string | null
        }
        Insert: {
          cache_key: string
          created_at?: string | null
          design: Json
          hit_count?: number | null
          id?: string
          last_hit_at?: string | null
        }
        Update: {
          cache_key?: string
          created_at?: string | null
          design?: Json
          hit_count?: number | null
          id?: string
          last_hit_at?: string | null
        }
        Relationships: []
      }
      circuit_design_cache_v4: {
        Row: {
          cache_key: string
          created_at: string | null
          design: Json
          expires_at: string
          hit_count: number | null
          id: string
          job_inputs: Json
          last_used_at: string | null
        }
        Insert: {
          cache_key: string
          created_at?: string | null
          design: Json
          expires_at: string
          hit_count?: number | null
          id?: string
          job_inputs: Json
          last_used_at?: string | null
        }
        Update: {
          cache_key?: string
          created_at?: string | null
          design?: Json
          expires_at?: string
          hit_count?: number | null
          id?: string
          job_inputs?: Json
          last_used_at?: string | null
        }
        Relationships: []
      }
      circuit_design_calculations: {
        Row: {
          calculation_name: string
          circuit_type: string
          created_at: string | null
          formula: string
          id: string
          notes: string | null
          regulation_reference: string | null
          table_data: Json | null
          topic: string | null
          worked_example: Json | null
        }
        Insert: {
          calculation_name: string
          circuit_type: string
          created_at?: string | null
          formula: string
          id?: string
          notes?: string | null
          regulation_reference?: string | null
          table_data?: Json | null
          topic?: string | null
          worked_example?: Json | null
        }
        Update: {
          calculation_name?: string
          circuit_type?: string
          created_at?: string | null
          formula?: string
          id?: string
          notes?: string | null
          regulation_reference?: string | null
          table_data?: Json | null
          topic?: string | null
          worked_example?: Json | null
        }
        Relationships: []
      }
      circuit_design_jobs: {
        Row: {
          completed_at: string | null
          created_at: string
          current_step: string | null
          design_data: Json | null
          designer_progress: number | null
          designer_status: string | null
          error_message: string | null
          id: string
          installation_agent_progress: number | null
          installation_agent_status: string | null
          installation_data: Json | null
          installation_guidance: Json | null
          installation_job_id: string | null
          installer_progress: number | null
          installer_status: string | null
          job_inputs: Json
          progress: number
          raw_response: Json | null
          retry_count: number | null
          started_at: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          current_step?: string | null
          design_data?: Json | null
          designer_progress?: number | null
          designer_status?: string | null
          error_message?: string | null
          id?: string
          installation_agent_progress?: number | null
          installation_agent_status?: string | null
          installation_data?: Json | null
          installation_guidance?: Json | null
          installation_job_id?: string | null
          installer_progress?: number | null
          installer_status?: string | null
          job_inputs: Json
          progress?: number
          raw_response?: Json | null
          retry_count?: number | null
          started_at?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          current_step?: string | null
          design_data?: Json | null
          designer_progress?: number | null
          designer_status?: string | null
          error_message?: string | null
          id?: string
          installation_agent_progress?: number | null
          installation_agent_status?: string | null
          installation_data?: Json | null
          installation_guidance?: Json | null
          installation_job_id?: string | null
          installer_progress?: number | null
          installer_status?: string | null
          job_inputs?: Json
          progress?: number
          raw_response?: Json | null
          retry_count?: number | null
          started_at?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "circuit_design_jobs_installation_job_id_fkey"
            columns: ["installation_job_id"]
            isOneToOne: false
            referencedRelation: "installation_method_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      circuit_level_cache: {
        Row: {
          cable_length: number
          circuit_hash: string
          circuit_type: string
          created_at: string | null
          design: Json
          hit_count: number | null
          id: string
          last_hit_at: string | null
          load_power: number
          voltage: number
        }
        Insert: {
          cable_length: number
          circuit_hash: string
          circuit_type: string
          created_at?: string | null
          design: Json
          hit_count?: number | null
          id?: string
          last_hit_at?: string | null
          load_power: number
          voltage: number
        }
        Update: {
          cable_length?: number
          circuit_hash?: string
          circuit_type?: string
          created_at?: string | null
          design?: Json
          hit_count?: number | null
          id?: string
          last_hit_at?: string | null
          load_power?: number
          voltage?: number
        }
        Relationships: []
      }
      circuit_partial_cache: {
        Row: {
          agent_output: Json
          agent_type: string
          cache_key: string
          created_at: string | null
          expires_at: string
          hit_count: number | null
          id: string
          job_inputs: Json
          last_used_at: string | null
        }
        Insert: {
          agent_output: Json
          agent_type: string
          cache_key: string
          created_at?: string | null
          expires_at: string
          hit_count?: number | null
          id?: string
          job_inputs: Json
          last_used_at?: string | null
        }
        Update: {
          agent_output?: Json
          agent_type?: string
          cache_key?: string
          created_at?: string | null
          expires_at?: string
          hit_count?: number | null
          id?: string
          job_inputs?: Json
          last_used_at?: string | null
        }
        Relationships: []
      }
      circuit_rag_cache: {
        Row: {
          cache_key: string
          created_at: string | null
          expires_at: string
          hit_count: number | null
          id: string
          knowledge_base_type: string
          last_used_at: string | null
          query_text: string
          rag_results: Json
        }
        Insert: {
          cache_key: string
          created_at?: string | null
          expires_at: string
          hit_count?: number | null
          id?: string
          knowledge_base_type: string
          last_used_at?: string | null
          query_text: string
          rag_results: Json
        }
        Update: {
          cache_key?: string
          created_at?: string | null
          expires_at?: string
          hit_count?: number | null
          id?: string
          knowledge_base_type?: string
          last_used_at?: string | null
          query_text?: string
          rag_results?: Json
        }
        Relationships: []
      }
      circuit_template_cache: {
        Row: {
          circuit_type: string
          created_at: string | null
          id: string
          last_used_at: string | null
          length_range_max: number | null
          power_range_max: number | null
          power_range_min: number | null
          template_design: Json
          template_key: string
          usage_count: number | null
        }
        Insert: {
          circuit_type: string
          created_at?: string | null
          id?: string
          last_used_at?: string | null
          length_range_max?: number | null
          power_range_max?: number | null
          power_range_min?: number | null
          template_design: Json
          template_key: string
          usage_count?: number | null
        }
        Update: {
          circuit_type?: string
          created_at?: string | null
          id?: string
          last_used_at?: string | null
          length_range_max?: number | null
          power_range_max?: number | null
          power_range_min?: number | null
          template_design?: Json
          template_key?: string
          usage_count?: number | null
        }
        Relationships: []
      }
      college_student_assignments: {
        Row: {
          academic_year: string | null
          actual_end_date: string | null
          assessor_id: string | null
          cohort_id: string | null
          cohort_name: string | null
          college_id: string | null
          college_name: string
          created_at: string | null
          current_progress_percentage: number | null
          employer_contact: string | null
          employer_id: string | null
          employer_name: string | null
          expected_end_date: string | null
          id: string
          iqa_id: string | null
          last_review_date: string | null
          next_review_date: string | null
          notes: string | null
          qualification_id: string
          start_date: string | null
          status: string | null
          student_id: string
          support_requirements: string | null
          tutor_id: string | null
          updated_at: string | null
        }
        Insert: {
          academic_year?: string | null
          actual_end_date?: string | null
          assessor_id?: string | null
          cohort_id?: string | null
          cohort_name?: string | null
          college_id?: string | null
          college_name: string
          created_at?: string | null
          current_progress_percentage?: number | null
          employer_contact?: string | null
          employer_id?: string | null
          employer_name?: string | null
          expected_end_date?: string | null
          id?: string
          iqa_id?: string | null
          last_review_date?: string | null
          next_review_date?: string | null
          notes?: string | null
          qualification_id: string
          start_date?: string | null
          status?: string | null
          student_id: string
          support_requirements?: string | null
          tutor_id?: string | null
          updated_at?: string | null
        }
        Update: {
          academic_year?: string | null
          actual_end_date?: string | null
          assessor_id?: string | null
          cohort_id?: string | null
          cohort_name?: string | null
          college_id?: string | null
          college_name?: string
          created_at?: string | null
          current_progress_percentage?: number | null
          employer_contact?: string | null
          employer_id?: string | null
          employer_name?: string | null
          expected_end_date?: string | null
          id?: string
          iqa_id?: string | null
          last_review_date?: string | null
          next_review_date?: string | null
          notes?: string | null
          qualification_id?: string
          start_date?: string | null
          status?: string | null
          student_id?: string
          support_requirements?: string | null
          tutor_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "college_student_assignments_assessor_id_fkey"
            columns: ["assessor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "college_student_assignments_assessor_id_fkey"
            columns: ["assessor_id"]
            isOneToOne: false
            referencedRelation: "v_assessor_workload"
            referencedColumns: ["assessor_id"]
          },
          {
            foreignKeyName: "college_student_assignments_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "college_student_assignments_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "v_assessor_workload"
            referencedColumns: ["assessor_id"]
          },
          {
            foreignKeyName: "college_student_assignments_iqa_id_fkey"
            columns: ["iqa_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "college_student_assignments_iqa_id_fkey"
            columns: ["iqa_id"]
            isOneToOne: false
            referencedRelation: "v_assessor_workload"
            referencedColumns: ["assessor_id"]
          },
          {
            foreignKeyName: "college_student_assignments_qualification_id_fkey"
            columns: ["qualification_id"]
            isOneToOne: false
            referencedRelation: "qualifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "college_student_assignments_qualification_id_fkey"
            columns: ["qualification_id"]
            isOneToOne: false
            referencedRelation: "v_iqa_sampling_status"
            referencedColumns: ["qualification_id"]
          },
          {
            foreignKeyName: "college_student_assignments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "college_student_assignments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "v_assessor_workload"
            referencedColumns: ["assessor_id"]
          },
          {
            foreignKeyName: "college_student_assignments_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "college_student_assignments_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "v_assessor_workload"
            referencedColumns: ["assessor_id"]
          },
        ]
      }
      colleges: {
        Row: {
          address: string | null
          awarding_bodies: string[] | null
          city: string | null
          code: string | null
          country: string | null
          created_at: string | null
          email: string | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          lti_enabled: boolean | null
          name: string
          ofsted_rating: string | null
          phone: string | null
          postcode: string | null
          settings: Json | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          awarding_bodies?: string[] | null
          city?: string | null
          code?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          lti_enabled?: boolean | null
          name: string
          ofsted_rating?: string | null
          phone?: string | null
          postcode?: string | null
          settings?: Json | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          awarding_bodies?: string[] | null
          city?: string | null
          code?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          lti_enabled?: boolean | null
          name?: string
          ofsted_rating?: string | null
          phone?: string | null
          postcode?: string | null
          settings?: Json | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      commissioning_jobs: {
        Row: {
          completed_at: string | null
          created_at: string
          current_step: string | null
          error_message: string | null
          id: string
          job_inputs: Json
          progress: number
          result_data: Json | null
          started_at: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          current_step?: string | null
          error_message?: string | null
          id?: string
          job_inputs: Json
          progress?: number
          result_data?: Json | null
          started_at?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          current_step?: string | null
          error_message?: string | null
          id?: string
          job_inputs?: Json
          progress?: number
          result_data?: Json | null
          started_at?: string | null
          status?: string
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
          ip_address: unknown
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
          ip_address?: unknown
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
          ip_address?: unknown
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
      conversations: {
        Row: {
          archived_at: string | null
          context_envelope: Json
          created_at: string | null
          id: string
          last_agent: string | null
          message_count: number | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          archived_at?: string | null
          context_envelope?: Json
          created_at?: string | null
          id?: string
          last_agent?: string | null
          message_count?: number | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          archived_at?: string | null
          context_envelope?: Json
          created_at?: string | null
          id?: string
          last_agent?: string | null
          message_count?: number | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      cost_engineer_jobs: {
        Row: {
          business_settings: Json | null
          completed_at: string | null
          created_at: string
          current_step: string | null
          error_message: string | null
          id: string
          output_data: Json | null
          progress: number
          project_context: Json | null
          query: string
          raw_response: Json | null
          region: string | null
          started_at: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          business_settings?: Json | null
          completed_at?: string | null
          created_at?: string
          current_step?: string | null
          error_message?: string | null
          id?: string
          output_data?: Json | null
          progress?: number
          project_context?: Json | null
          query: string
          raw_response?: Json | null
          region?: string | null
          started_at?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          business_settings?: Json | null
          completed_at?: string | null
          created_at?: string
          current_step?: string | null
          error_message?: string | null
          id?: string
          output_data?: Json | null
          progress?: number
          project_context?: Json | null
          query?: string
          raw_response?: Json | null
          region?: string | null
          started_at?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      cost_query_cache: {
        Row: {
          created_at: string | null
          expires_at: string | null
          hit_count: number | null
          job_type: string | null
          query: string
          query_hash: string
          results: Json
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          hit_count?: number | null
          job_type?: string | null
          query: string
          query_hash: string
          results: Json
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          hit_count?: number | null
          job_type?: string | null
          query?: string
          query_hash?: string
          results?: Json
        }
        Relationships: []
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
      design_exports: {
        Row: {
          circuits_count: number
          client_name: string | null
          created_at: string | null
          design_data: Json
          design_id: string
          electrician_name: string | null
          expires_at: string | null
          export_type: string
          id: string
          installation_address: string | null
          phases: string
          project_name: string
          status: string
          updated_at: string | null
          user_id: string
          voltage: number
        }
        Insert: {
          circuits_count: number
          client_name?: string | null
          created_at?: string | null
          design_data: Json
          design_id: string
          electrician_name?: string | null
          expires_at?: string | null
          export_type?: string
          id?: string
          installation_address?: string | null
          phases: string
          project_name: string
          status?: string
          updated_at?: string | null
          user_id: string
          voltage: number
        }
        Update: {
          circuits_count?: number
          client_name?: string | null
          created_at?: string | null
          design_data?: Json
          design_id?: string
          electrician_name?: string | null
          expires_at?: string | null
          export_type?: string
          id?: string
          installation_address?: string | null
          phases?: string
          project_name?: string
          status?: string
          updated_at?: string | null
          user_id?: string
          voltage?: number
        }
        Relationships: []
      }
      design_knowledge: {
        Row: {
          content: string
          created_at: string | null
          deleted_at: string | null
          embedding: string | null
          id: string
          is_active: boolean
          last_modified_by: string | null
          metadata: Json | null
          source: string
          topic: string
        }
        Insert: {
          content: string
          created_at?: string | null
          deleted_at?: string | null
          embedding?: string | null
          id?: string
          is_active?: boolean
          last_modified_by?: string | null
          metadata?: Json | null
          source: string
          topic: string
        }
        Update: {
          content?: string
          created_at?: string | null
          deleted_at?: string | null
          embedding?: string | null
          id?: string
          is_active?: boolean
          last_modified_by?: string | null
          metadata?: Json | null
          source?: string
          topic?: string
        }
        Relationships: []
      }
      design_knowledge_intelligence: {
        Row: {
          acceptance_criteria: Json | null
          applies_to: string[]
          archived_at: string | null
          archived_by: string | null
          bs7671_regulations: string[] | null
          cable_sizes: string[] | null
          calculation_steps: string[] | null
          common_mistakes: string[] | null
          confidence_score: number | null
          content: string
          created_at: string | null
          design_category: string
          design_constraints: Json | null
          design_knowledge_id: string | null
          design_subcategory: string | null
          enrichment_version: string | null
          facet_hash: string | null
          facet_type: string
          formulas: string[] | null
          guidance_note_refs: string[] | null
          id: string
          is_archived: boolean | null
          keywords: string[]
          load_types: string[] | null
          location_types: string[] | null
          other_standards: string[] | null
          power_ratings: string[] | null
          primary_topic: string
          quality_score: number | null
          related_topics: string[] | null
          required_parameters: string[] | null
          source: string | null
          table_refs: string[] | null
          test_procedures: string[] | null
          typical_values: Json | null
          updated_at: string | null
          voltage_levels: string[] | null
          worked_examples: Json[] | null
        }
        Insert: {
          acceptance_criteria?: Json | null
          applies_to?: string[]
          archived_at?: string | null
          archived_by?: string | null
          bs7671_regulations?: string[] | null
          cable_sizes?: string[] | null
          calculation_steps?: string[] | null
          common_mistakes?: string[] | null
          confidence_score?: number | null
          content: string
          created_at?: string | null
          design_category: string
          design_constraints?: Json | null
          design_knowledge_id?: string | null
          design_subcategory?: string | null
          enrichment_version?: string | null
          facet_hash?: string | null
          facet_type: string
          formulas?: string[] | null
          guidance_note_refs?: string[] | null
          id?: string
          is_archived?: boolean | null
          keywords: string[]
          load_types?: string[] | null
          location_types?: string[] | null
          other_standards?: string[] | null
          power_ratings?: string[] | null
          primary_topic: string
          quality_score?: number | null
          related_topics?: string[] | null
          required_parameters?: string[] | null
          source?: string | null
          table_refs?: string[] | null
          test_procedures?: string[] | null
          typical_values?: Json | null
          updated_at?: string | null
          voltage_levels?: string[] | null
          worked_examples?: Json[] | null
        }
        Update: {
          acceptance_criteria?: Json | null
          applies_to?: string[]
          archived_at?: string | null
          archived_by?: string | null
          bs7671_regulations?: string[] | null
          cable_sizes?: string[] | null
          calculation_steps?: string[] | null
          common_mistakes?: string[] | null
          confidence_score?: number | null
          content?: string
          created_at?: string | null
          design_category?: string
          design_constraints?: Json | null
          design_knowledge_id?: string | null
          design_subcategory?: string | null
          enrichment_version?: string | null
          facet_hash?: string | null
          facet_type?: string
          formulas?: string[] | null
          guidance_note_refs?: string[] | null
          id?: string
          is_archived?: boolean | null
          keywords?: string[]
          load_types?: string[] | null
          location_types?: string[] | null
          other_standards?: string[] | null
          power_ratings?: string[] | null
          primary_topic?: string
          quality_score?: number | null
          related_topics?: string[] | null
          required_parameters?: string[] | null
          source?: string | null
          table_refs?: string[] | null
          test_procedures?: string[] | null
          typical_values?: Json | null
          updated_at?: string | null
          voltage_levels?: string[] | null
          worked_examples?: Json[] | null
        }
        Relationships: [
          {
            foreignKeyName: "design_knowledge_intelligence_design_knowledge_id_fkey"
            columns: ["design_knowledge_id"]
            isOneToOne: false
            referencedRelation: "design_knowledge"
            referencedColumns: ["id"]
          },
        ]
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
      design_patterns_structured: {
        Row: {
          calculation_formula: string | null
          confidence_score: number | null
          constraints: Json | null
          created_at: string | null
          description: string | null
          enrichment_version: string | null
          example_values: Json | null
          id: string
          input_parameters: Json | null
          pattern_type: string
          regulations_cited: string[] | null
          source_hash: string | null
          source_id: string | null
          title: string
          typical_applications: string[] | null
          updated_at: string | null
          usage_count: number | null
        }
        Insert: {
          calculation_formula?: string | null
          confidence_score?: number | null
          constraints?: Json | null
          created_at?: string | null
          description?: string | null
          enrichment_version?: string | null
          example_values?: Json | null
          id?: string
          input_parameters?: Json | null
          pattern_type: string
          regulations_cited?: string[] | null
          source_hash?: string | null
          source_id?: string | null
          title: string
          typical_applications?: string[] | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Update: {
          calculation_formula?: string | null
          confidence_score?: number | null
          constraints?: Json | null
          created_at?: string | null
          description?: string | null
          enrichment_version?: string | null
          example_values?: Json | null
          id?: string
          input_parameters?: Json | null
          pattern_type?: string
          regulations_cited?: string[] | null
          source_hash?: string | null
          source_id?: string | null
          title?: string
          typical_applications?: string[] | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "design_patterns_structured_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "design_knowledge"
            referencedColumns: ["id"]
          },
        ]
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
      elec_id_documents: {
        Row: {
          appeal_notes: string | null
          appeal_submitted_at: string | null
          corrections_applied_at: string | null
          created_at: string
          document_name: string
          document_number: string | null
          document_type: string
          expiry_date: string | null
          extracted_data: Json | null
          extraction_confidence: Json | null
          file_path: string | null
          file_url: string | null
          id: string
          issue_date: string | null
          issuing_body: string | null
          previous_attempt_id: string | null
          profile_id: string
          raw_ocr_text: string | null
          rejection_code: string | null
          rejection_details: Json | null
          rejection_reason: string | null
          updated_at: string
          upload_attempt_number: number | null
          user_corrections: Json | null
          verification_confidence: number | null
          verification_method: string | null
          verification_status: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          appeal_notes?: string | null
          appeal_submitted_at?: string | null
          corrections_applied_at?: string | null
          created_at?: string
          document_name: string
          document_number?: string | null
          document_type: string
          expiry_date?: string | null
          extracted_data?: Json | null
          extraction_confidence?: Json | null
          file_path?: string | null
          file_url?: string | null
          id?: string
          issue_date?: string | null
          issuing_body?: string | null
          previous_attempt_id?: string | null
          profile_id: string
          raw_ocr_text?: string | null
          rejection_code?: string | null
          rejection_details?: Json | null
          rejection_reason?: string | null
          updated_at?: string
          upload_attempt_number?: number | null
          user_corrections?: Json | null
          verification_confidence?: number | null
          verification_method?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          appeal_notes?: string | null
          appeal_submitted_at?: string | null
          corrections_applied_at?: string | null
          created_at?: string
          document_name?: string
          document_number?: string | null
          document_type?: string
          expiry_date?: string | null
          extracted_data?: Json | null
          extraction_confidence?: Json | null
          file_path?: string | null
          file_url?: string | null
          id?: string
          issue_date?: string | null
          issuing_body?: string | null
          previous_attempt_id?: string | null
          profile_id?: string
          raw_ocr_text?: string | null
          rejection_code?: string | null
          rejection_details?: Json | null
          rejection_reason?: string | null
          updated_at?: string
          upload_attempt_number?: number | null
          user_corrections?: Json | null
          verification_confidence?: number | null
          verification_method?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "elec_id_documents_previous_attempt_id_fkey"
            columns: ["previous_attempt_id"]
            isOneToOne: false
            referencedRelation: "elec_id_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "elec_id_documents_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "employer_elec_id_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      elec_id_hire_records: {
        Row: {
          created_at: string
          employer_id: string
          fee_amount: number | null
          fee_status: string | null
          hired_at: string
          id: string
          job_type: string | null
          worker_profile_id: string
        }
        Insert: {
          created_at?: string
          employer_id: string
          fee_amount?: number | null
          fee_status?: string | null
          hired_at?: string
          id?: string
          job_type?: string | null
          worker_profile_id: string
        }
        Update: {
          created_at?: string
          employer_id?: string
          fee_amount?: number | null
          fee_status?: string | null
          hired_at?: string
          id?: string
          job_type?: string | null
          worker_profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "elec_id_hire_records_worker_profile_id_fkey"
            columns: ["worker_profile_id"]
            isOneToOne: false
            referencedRelation: "employer_elec_id_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      elec_id_training_requests: {
        Row: {
          certificate_url: string | null
          completed_date: string | null
          employer_id: string
          id: string
          provider: string | null
          requested_at: string
          responded_at: string | null
          status: string | null
          training_name: string
          worker_profile_id: string
        }
        Insert: {
          certificate_url?: string | null
          completed_date?: string | null
          employer_id: string
          id?: string
          provider?: string | null
          requested_at?: string
          responded_at?: string | null
          status?: string | null
          training_name: string
          worker_profile_id: string
        }
        Update: {
          certificate_url?: string | null
          completed_date?: string | null
          employer_id?: string
          id?: string
          provider?: string | null
          requested_at?: string
          responded_at?: string | null
          status?: string | null
          training_name?: string
          worker_profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "elec_id_training_requests_worker_profile_id_fkey"
            columns: ["worker_profile_id"]
            isOneToOne: false
            referencedRelation: "employer_elec_id_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_app_settings: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          key: string
          updated_at: string | null
          value: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          key: string
          updated_at?: string | null
          value?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          key?: string
          updated_at?: string | null
          value?: string | null
        }
        Relationships: []
      }
      employer_automation_logs: {
        Row: {
          actions_taken: Json
          duration_ms: number | null
          error_message: string | null
          executed_at: string
          id: string
          records_processed: number
          rule_id: string
          status: string
          trigger_data: Json | null
        }
        Insert: {
          actions_taken?: Json
          duration_ms?: number | null
          error_message?: string | null
          executed_at?: string
          id?: string
          records_processed?: number
          rule_id: string
          status?: string
          trigger_data?: Json | null
        }
        Update: {
          actions_taken?: Json
          duration_ms?: number | null
          error_message?: string | null
          executed_at?: string
          id?: string
          records_processed?: number
          rule_id?: string
          status?: string
          trigger_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "employer_automation_logs_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "employer_automation_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_automation_rules: {
        Row: {
          actions: Json
          category: string
          conditions: Json
          created_at: string
          description: string | null
          failure_count: number
          id: string
          is_active: boolean
          is_system: boolean
          last_run_at: string | null
          name: string
          next_run_at: string | null
          run_count: number
          success_count: number
          trigger_config: Json
          trigger_type: string
          updated_at: string
        }
        Insert: {
          actions?: Json
          category?: string
          conditions?: Json
          created_at?: string
          description?: string | null
          failure_count?: number
          id?: string
          is_active?: boolean
          is_system?: boolean
          last_run_at?: string | null
          name: string
          next_run_at?: string | null
          run_count?: number
          success_count?: number
          trigger_config?: Json
          trigger_type?: string
          updated_at?: string
        }
        Update: {
          actions?: Json
          category?: string
          conditions?: Json
          created_at?: string
          description?: string | null
          failure_count?: number
          id?: string
          is_active?: boolean
          is_system?: boolean
          last_run_at?: string | null
          name?: string
          next_run_at?: string | null
          run_count?: number
          success_count?: number
          trigger_config?: Json
          trigger_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      employer_certifications: {
        Row: {
          certificate_number: string | null
          created_at: string
          document_url: string | null
          employee_id: string
          expiry_date: string | null
          id: string
          issue_date: string | null
          issuing_body: string | null
          name: string
          status: string
          updated_at: string
        }
        Insert: {
          certificate_number?: string | null
          created_at?: string
          document_url?: string | null
          employee_id: string
          expiry_date?: string | null
          id?: string
          issue_date?: string | null
          issuing_body?: string | null
          name: string
          status?: string
          updated_at?: string
        }
        Update: {
          certificate_number?: string | null
          created_at?: string
          document_url?: string | null
          employee_id?: string
          expiry_date?: string | null
          id?: string
          issue_date?: string | null
          issuing_body?: string | null
          name?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employer_certifications_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employer_employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_client_messages: {
        Row: {
          access_token: string
          created_at: string
          id: string
          job_id: string
          message: string
          read_at: string | null
          sender_type: string
        }
        Insert: {
          access_token: string
          created_at?: string
          id?: string
          job_id: string
          message: string
          read_at?: string | null
          sender_type: string
        }
        Update: {
          access_token?: string
          created_at?: string
          id?: string
          job_id?: string
          message?: string
          read_at?: string | null
          sender_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "employer_client_messages_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "employer_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_client_portal_invites: {
        Row: {
          access_token: string
          client_email: string | null
          client_name: string
          created_at: string
          expires_at: string
          id: string
          job_id: string
          last_accessed_at: string | null
          permissions: Json
        }
        Insert: {
          access_token: string
          client_email?: string | null
          client_name: string
          created_at?: string
          expires_at: string
          id?: string
          job_id: string
          last_accessed_at?: string | null
          permissions?: Json
        }
        Update: {
          access_token?: string
          client_email?: string | null
          client_name?: string
          created_at?: string
          expires_at?: string
          id?: string
          job_id?: string
          last_accessed_at?: string | null
          permissions?: Json
        }
        Relationships: [
          {
            foreignKeyName: "employer_client_portal_invites_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "employer_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_client_signoffs: {
        Row: {
          access_token: string
          client_name: string
          id: string
          job_id: string
          notes: string | null
          signature_data: string
          signed_at: string
          stage: string
        }
        Insert: {
          access_token: string
          client_name: string
          id?: string
          job_id: string
          notes?: string | null
          signature_data: string
          signed_at?: string
          stage: string
        }
        Update: {
          access_token?: string
          client_name?: string
          id?: string
          job_id?: string
          notes?: string | null
          signature_data?: string
          signed_at?: string
          stage?: string
        }
        Relationships: [
          {
            foreignKeyName: "employer_client_signoffs_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "employer_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_company_tools: {
        Row: {
          assigned_to: string | null
          assigned_to_employee_id: string | null
          category: string
          created_at: string | null
          id: string
          last_calibration: string | null
          name: string
          next_calibration: string | null
          notes: string | null
          pat_date: string | null
          pat_due: string | null
          purchase_date: string | null
          purchase_price: number | null
          serial_number: string | null
          status: string
          tool_number: string | null
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          assigned_to_employee_id?: string | null
          category?: string
          created_at?: string | null
          id?: string
          last_calibration?: string | null
          name: string
          next_calibration?: string | null
          notes?: string | null
          pat_date?: string | null
          pat_due?: string | null
          purchase_date?: string | null
          purchase_price?: number | null
          serial_number?: string | null
          status?: string
          tool_number?: string | null
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          assigned_to_employee_id?: string | null
          category?: string
          created_at?: string | null
          id?: string
          last_calibration?: string | null
          name?: string
          next_calibration?: string | null
          notes?: string | null
          pat_date?: string | null
          pat_due?: string | null
          purchase_date?: string | null
          purchase_price?: number | null
          serial_number?: string | null
          status?: string
          tool_number?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employer_company_tools_assigned_to_employee_id_fkey"
            columns: ["assigned_to_employee_id"]
            isOneToOne: false
            referencedRelation: "employer_employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_conversations: {
        Row: {
          application_id: string | null
          created_at: string | null
          electrician_can_reply: boolean | null
          electrician_profile_id: string | null
          employer_id: string
          id: string
          initiated_by: string
          last_message_at: string | null
          last_message_preview: string | null
          status: string | null
          unread_electrician: number | null
          unread_employer: number | null
          updated_at: string | null
          vacancy_id: string | null
        }
        Insert: {
          application_id?: string | null
          created_at?: string | null
          electrician_can_reply?: boolean | null
          electrician_profile_id?: string | null
          employer_id: string
          id?: string
          initiated_by: string
          last_message_at?: string | null
          last_message_preview?: string | null
          status?: string | null
          unread_electrician?: number | null
          unread_employer?: number | null
          updated_at?: string | null
          vacancy_id?: string | null
        }
        Update: {
          application_id?: string | null
          created_at?: string | null
          electrician_can_reply?: boolean | null
          electrician_profile_id?: string | null
          employer_id?: string
          id?: string
          initiated_by?: string
          last_message_at?: string | null
          last_message_preview?: string | null
          status?: string | null
          unread_electrician?: number | null
          unread_employer?: number | null
          updated_at?: string | null
          vacancy_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employer_conversations_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "employer_vacancy_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employer_conversations_electrician_profile_id_fkey"
            columns: ["electrician_profile_id"]
            isOneToOne: false
            referencedRelation: "employer_elec_id_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employer_conversations_vacancy_id_fkey"
            columns: ["vacancy_id"]
            isOneToOne: false
            referencedRelation: "employer_vacancies"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_elec_id_profiles: {
        Row: {
          activated: boolean | null
          activated_at: string | null
          available_for_hire: boolean | null
          bio: string | null
          created_at: string
          ecs_card_number: string | null
          ecs_card_type: string | null
          ecs_expiry_date: string | null
          elec_id_number: string
          employee_id: string
          id: string
          is_verified: boolean | null
          opt_out: boolean | null
          opt_out_at: string | null
          profile_views: number | null
          profile_visibility: string | null
          rate_amount: number | null
          rate_type: string | null
          shareable_link: string | null
          specialisations: string[] | null
          tier_updated_at: string | null
          updated_at: string
          verification_tier: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          activated?: boolean | null
          activated_at?: string | null
          available_for_hire?: boolean | null
          bio?: string | null
          created_at?: string
          ecs_card_number?: string | null
          ecs_card_type?: string | null
          ecs_expiry_date?: string | null
          elec_id_number: string
          employee_id: string
          id?: string
          is_verified?: boolean | null
          opt_out?: boolean | null
          opt_out_at?: string | null
          profile_views?: number | null
          profile_visibility?: string | null
          rate_amount?: number | null
          rate_type?: string | null
          shareable_link?: string | null
          specialisations?: string[] | null
          tier_updated_at?: string | null
          updated_at?: string
          verification_tier?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          activated?: boolean | null
          activated_at?: string | null
          available_for_hire?: boolean | null
          bio?: string | null
          created_at?: string
          ecs_card_number?: string | null
          ecs_card_type?: string | null
          ecs_expiry_date?: string | null
          elec_id_number?: string
          employee_id?: string
          id?: string
          is_verified?: boolean | null
          opt_out?: boolean | null
          opt_out_at?: string | null
          profile_views?: number | null
          profile_visibility?: string | null
          rate_amount?: number | null
          rate_type?: string | null
          shareable_link?: string | null
          specialisations?: string[] | null
          tier_updated_at?: string | null
          updated_at?: string
          verification_tier?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employer_elec_id_profiles_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employer_employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_elec_id_qualifications: {
        Row: {
          awarding_body: string | null
          category: string | null
          certificate_number: string | null
          created_at: string
          date_achieved: string | null
          expiry_date: string | null
          grade: string | null
          id: string
          is_verified: boolean | null
          profile_id: string
          qualification_name: string
          qualification_type: string
        }
        Insert: {
          awarding_body?: string | null
          category?: string | null
          certificate_number?: string | null
          created_at?: string
          date_achieved?: string | null
          expiry_date?: string | null
          grade?: string | null
          id?: string
          is_verified?: boolean | null
          profile_id: string
          qualification_name: string
          qualification_type: string
        }
        Update: {
          awarding_body?: string | null
          category?: string | null
          certificate_number?: string | null
          created_at?: string
          date_achieved?: string | null
          expiry_date?: string | null
          grade?: string | null
          id?: string
          is_verified?: boolean | null
          profile_id?: string
          qualification_name?: string
          qualification_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "employer_elec_id_qualifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "employer_elec_id_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_elec_id_skills: {
        Row: {
          created_at: string
          id: string
          is_verified: boolean | null
          profile_id: string
          skill_level: string
          skill_name: string
          years_experience: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_verified?: boolean | null
          profile_id: string
          skill_level?: string
          skill_name: string
          years_experience?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          is_verified?: boolean | null
          profile_id?: string
          skill_level?: string
          skill_name?: string
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "employer_elec_id_skills_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "employer_elec_id_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_elec_id_training: {
        Row: {
          certificate_id: string | null
          completed_date: string | null
          created_at: string
          expiry_date: string | null
          funded_by: string | null
          id: string
          profile_id: string
          provider: string | null
          status: string | null
          training_name: string
        }
        Insert: {
          certificate_id?: string | null
          completed_date?: string | null
          created_at?: string
          expiry_date?: string | null
          funded_by?: string | null
          id?: string
          profile_id: string
          provider?: string | null
          status?: string | null
          training_name: string
        }
        Update: {
          certificate_id?: string | null
          completed_date?: string | null
          created_at?: string
          expiry_date?: string | null
          funded_by?: string | null
          id?: string
          profile_id?: string
          provider?: string | null
          status?: string | null
          training_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "employer_elec_id_training_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "employer_elec_id_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_elec_id_work_history: {
        Row: {
          created_at: string
          description: string | null
          employer_name: string
          end_date: string | null
          id: string
          is_current: boolean | null
          is_verified: boolean | null
          job_title: string
          profile_id: string
          projects: string[] | null
          start_date: string
          verified_by_employer: boolean | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          employer_name: string
          end_date?: string | null
          id?: string
          is_current?: boolean | null
          is_verified?: boolean | null
          job_title: string
          profile_id: string
          projects?: string[] | null
          start_date: string
          verified_by_employer?: boolean | null
        }
        Update: {
          created_at?: string
          description?: string | null
          employer_name?: string
          end_date?: string | null
          id?: string
          is_current?: boolean | null
          is_verified?: boolean | null
          job_title?: string
          profile_id?: string
          projects?: string[] | null
          start_date?: string
          verified_by_employer?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "employer_elec_id_work_history_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "employer_elec_id_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_employees: {
        Row: {
          active_jobs_count: number
          annual_salary: number | null
          avatar_initials: string
          certifications_count: number
          created_at: string
          email: string | null
          employer_id: string | null
          hourly_rate: number
          id: string
          join_date: string | null
          name: string
          pay_type: string
          phone: string | null
          photo_url: string | null
          role: string
          status: string
          team_role: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          active_jobs_count?: number
          annual_salary?: number | null
          avatar_initials: string
          certifications_count?: number
          created_at?: string
          email?: string | null
          employer_id?: string | null
          hourly_rate?: number
          id?: string
          join_date?: string | null
          name: string
          pay_type?: string
          phone?: string | null
          photo_url?: string | null
          role?: string
          status?: string
          team_role?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          active_jobs_count?: number
          annual_salary?: number | null
          avatar_initials?: string
          certifications_count?: number
          created_at?: string
          email?: string | null
          employer_id?: string | null
          hourly_rate?: number
          id?: string
          join_date?: string | null
          name?: string
          pay_type?: string
          phone?: string | null
          photo_url?: string | null
          role?: string
          status?: string
          team_role?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      employer_expense_claims: {
        Row: {
          amount: number
          approved_by: string | null
          approved_date: string | null
          category: string
          created_at: string
          description: string
          employee_id: string
          id: string
          job_id: string | null
          paid_date: string | null
          receipt_url: string | null
          rejection_reason: string | null
          status: string
          submitted_date: string
          updated_at: string
        }
        Insert: {
          amount?: number
          approved_by?: string | null
          approved_date?: string | null
          category?: string
          created_at?: string
          description: string
          employee_id: string
          id?: string
          job_id?: string | null
          paid_date?: string | null
          receipt_url?: string | null
          rejection_reason?: string | null
          status?: string
          submitted_date?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          approved_by?: string | null
          approved_date?: string | null
          category?: string
          created_at?: string
          description?: string
          employee_id?: string
          id?: string
          job_id?: string | null
          paid_date?: string | null
          receipt_url?: string | null
          rejection_reason?: string | null
          status?: string
          submitted_date?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employer_expense_claims_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employer_employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employer_expense_claims_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "employer_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_incidents: {
        Row: {
          actions_taken: string | null
          created_at: string
          description: string | null
          id: string
          incident_type: string
          job_id: string | null
          location: string | null
          reported_at: string
          reported_by: string | null
          severity: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          actions_taken?: string | null
          created_at?: string
          description?: string | null
          id?: string
          incident_type?: string
          job_id?: string | null
          location?: string | null
          reported_at?: string
          reported_by?: string | null
          severity?: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          actions_taken?: string | null
          created_at?: string
          description?: string | null
          id?: string
          incident_type?: string
          job_id?: string | null
          location?: string | null
          reported_at?: string
          reported_by?: string | null
          severity?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employer_incidents_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "employer_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_invoice_access: {
        Row: {
          access_token: string
          client_email: string | null
          client_name: string | null
          created_at: string
          expires_at: string
          id: string
          invoice_id: string
          status: string
          viewed_at: string | null
        }
        Insert: {
          access_token: string
          client_email?: string | null
          client_name?: string | null
          created_at?: string
          expires_at: string
          id?: string
          invoice_id: string
          status?: string
          viewed_at?: string | null
        }
        Update: {
          access_token?: string
          client_email?: string | null
          client_name?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          invoice_id?: string
          status?: string
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employer_invoice_access_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "employer_invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_invoices: {
        Row: {
          amount: number
          client: string
          created_at: string
          due_date: string | null
          id: string
          invoice_number: string
          job_id: string | null
          line_items: Json | null
          notes: string | null
          paid_date: string | null
          project: string | null
          quote_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          amount?: number
          client: string
          created_at?: string
          due_date?: string | null
          id?: string
          invoice_number: string
          job_id?: string | null
          line_items?: Json | null
          notes?: string | null
          paid_date?: string | null
          project?: string | null
          quote_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          client?: string
          created_at?: string
          due_date?: string | null
          id?: string
          invoice_number?: string
          job_id?: string | null
          line_items?: Json | null
          notes?: string | null
          paid_date?: string | null
          project?: string | null
          quote_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employer_invoices_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "employer_jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employer_invoices_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "employer_quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_job_assignments: {
        Row: {
          assigned_at: string
          assigned_by: string | null
          created_at: string
          employee_id: string
          end_date: string | null
          id: string
          job_id: string
          notes: string | null
          notify_email: boolean | null
          role_on_job: string | null
          start_date: string
          status: string
          updated_at: string
        }
        Insert: {
          assigned_at?: string
          assigned_by?: string | null
          created_at?: string
          employee_id: string
          end_date?: string | null
          id?: string
          job_id: string
          notes?: string | null
          notify_email?: boolean | null
          role_on_job?: string | null
          start_date: string
          status?: string
          updated_at?: string
        }
        Update: {
          assigned_at?: string
          assigned_by?: string | null
          created_at?: string
          employee_id?: string
          end_date?: string | null
          id?: string
          job_id?: string
          notes?: string | null
          notify_email?: boolean | null
          role_on_job?: string | null
          start_date?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employer_job_assignments_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employer_employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employer_job_assignments_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "employer_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_job_checklist_items: {
        Row: {
          created_at: string
          id: string
          is_completed: boolean
          job_id: string
          position: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_completed?: boolean
          job_id: string
          position?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_completed?: boolean
          job_id?: string
          position?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employer_job_checklist_items_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "employer_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_job_comments: {
        Row: {
          author_name: string
          comment_type: string
          content: string
          created_at: string
          id: string
          job_id: string
        }
        Insert: {
          author_name: string
          comment_type?: string
          content: string
          created_at?: string
          id?: string
          job_id: string
        }
        Update: {
          author_name?: string
          comment_type?: string
          content?: string
          created_at?: string
          id?: string
          job_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "employer_job_comments_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "employer_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_job_label_assignments: {
        Row: {
          created_at: string
          job_id: string
          label_id: string
        }
        Insert: {
          created_at?: string
          job_id: string
          label_id: string
        }
        Update: {
          created_at?: string
          job_id?: string
          label_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "employer_job_label_assignments_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "employer_jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employer_job_label_assignments_label_id_fkey"
            columns: ["label_id"]
            isOneToOne: false
            referencedRelation: "employer_job_labels"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_job_labels: {
        Row: {
          colour: string
          created_at: string
          id: string
          name: string
        }
        Insert: {
          colour?: string
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          colour?: string
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      employer_job_pack_acknowledgements: {
        Row: {
          acknowledged_at: string | null
          created_at: string | null
          device_info: string | null
          employee_id: string
          id: string
          job_pack_id: string
          location: string | null
          signature_data: string | null
        }
        Insert: {
          acknowledged_at?: string | null
          created_at?: string | null
          device_info?: string | null
          employee_id: string
          id?: string
          job_pack_id: string
          location?: string | null
          signature_data?: string | null
        }
        Update: {
          acknowledged_at?: string | null
          created_at?: string | null
          device_info?: string | null
          employee_id?: string
          id?: string
          job_pack_id?: string
          location?: string | null
          signature_data?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employer_job_pack_acknowledgements_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employer_employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employer_job_pack_acknowledgements_job_pack_id_fkey"
            columns: ["job_pack_id"]
            isOneToOne: false
            referencedRelation: "employer_job_packs"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_job_pack_documents: {
        Row: {
          created_at: string | null
          description: string | null
          document_type: string
          file_url: string | null
          generated_by: string | null
          id: string
          is_required: boolean | null
          job_pack_id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          document_type?: string
          file_url?: string | null
          generated_by?: string | null
          id?: string
          is_required?: boolean | null
          job_pack_id: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          document_type?: string
          file_url?: string | null
          generated_by?: string | null
          id?: string
          is_required?: boolean | null
          job_pack_id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employer_job_pack_documents_job_pack_id_fkey"
            columns: ["job_pack_id"]
            isOneToOne: false
            referencedRelation: "employer_job_packs"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_job_packs: {
        Row: {
          assigned_workers: string[] | null
          briefing_content: string | null
          briefing_pack_generated: boolean | null
          client: string
          created_at: string | null
          estimated_value: number | null
          hazards: string[] | null
          id: string
          location: string
          method_statement_generated: boolean | null
          rams_generated: boolean | null
          required_certifications: string[] | null
          scope: string | null
          sent_to_workers_at: string | null
          start_date: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_workers?: string[] | null
          briefing_content?: string | null
          briefing_pack_generated?: boolean | null
          client: string
          created_at?: string | null
          estimated_value?: number | null
          hazards?: string[] | null
          id?: string
          location: string
          method_statement_generated?: boolean | null
          rams_generated?: boolean | null
          required_certifications?: string[] | null
          scope?: string | null
          sent_to_workers_at?: string | null
          start_date?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_workers?: string[] | null
          briefing_content?: string | null
          briefing_pack_generated?: boolean | null
          client?: string
          created_at?: string | null
          estimated_value?: number | null
          hazards?: string[] | null
          id?: string
          location?: string
          method_statement_generated?: boolean | null
          rams_generated?: boolean | null
          required_certifications?: string[] | null
          scope?: string | null
          sent_to_workers_at?: string | null
          start_date?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      employer_jobs: {
        Row: {
          archived_at: string | null
          client: string
          cover_photo_url: string | null
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          is_template: boolean | null
          lat: number | null
          lng: number | null
          location: string
          position: number | null
          progress: number
          start_date: string | null
          status: string
          title: string
          updated_at: string
          value: number | null
          workers_count: number
        }
        Insert: {
          archived_at?: string | null
          client: string
          cover_photo_url?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          is_template?: boolean | null
          lat?: number | null
          lng?: number | null
          location: string
          position?: number | null
          progress?: number
          start_date?: string | null
          status?: string
          title: string
          updated_at?: string
          value?: number | null
          workers_count?: number
        }
        Update: {
          archived_at?: string | null
          client?: string
          cover_photo_url?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          is_template?: boolean | null
          lat?: number | null
          lng?: number | null
          location?: string
          position?: number | null
          progress?: number
          start_date?: string | null
          status?: string
          title?: string
          updated_at?: string
          value?: number | null
          workers_count?: number
        }
        Relationships: []
      }
      employer_knowledge_documents: {
        Row: {
          category: string
          content: string
          created_at: string
          id: string
          metadata: Json | null
          summary: string | null
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          content: string
          created_at?: string
          id?: string
          metadata?: Json | null
          summary?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          summary?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      employer_leave_requests: {
        Row: {
          approved_by: string | null
          approved_date: string | null
          created_at: string
          employee_id: string
          employee_name: string
          end_date: string
          half_day: string | null
          id: string
          reason: string | null
          rejected_reason: string | null
          start_date: string
          status: string
          total_days: number
          type: string
        }
        Insert: {
          approved_by?: string | null
          approved_date?: string | null
          created_at?: string
          employee_id: string
          employee_name: string
          end_date: string
          half_day?: string | null
          id?: string
          reason?: string | null
          rejected_reason?: string | null
          start_date: string
          status?: string
          total_days?: number
          type?: string
        }
        Update: {
          approved_by?: string | null
          approved_date?: string | null
          created_at?: string
          employee_id?: string
          employee_name?: string
          end_date?: string
          half_day?: string | null
          id?: string
          reason?: string | null
          rejected_reason?: string | null
          start_date?: string
          status?: string
          total_days?: number
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "employer_leave_requests_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employer_employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_material_orders: {
        Row: {
          created_at: string
          delivery_date: string | null
          id: string
          items: Json
          job_id: string | null
          notes: string | null
          order_date: string
          order_number: string
          ordered_by: string | null
          status: string
          supplier_id: string
          total: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          delivery_date?: string | null
          id?: string
          items?: Json
          job_id?: string | null
          notes?: string | null
          order_date?: string
          order_number: string
          ordered_by?: string | null
          status?: string
          supplier_id: string
          total?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          delivery_date?: string | null
          id?: string
          items?: Json
          job_id?: string | null
          notes?: string | null
          order_date?: string
          order_number?: string
          ordered_by?: string | null
          status?: string
          supplier_id?: string
          total?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employer_material_orders_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "employer_jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employer_material_orders_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "employer_suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_message_attachments: {
        Row: {
          created_at: string | null
          file_name: string
          file_size: number
          file_type: string
          id: string
          message_id: string
          metadata: Json | null
          storage_path: string
          thumbnail_path: string | null
        }
        Insert: {
          created_at?: string | null
          file_name: string
          file_size: number
          file_type: string
          id?: string
          message_id: string
          metadata?: Json | null
          storage_path: string
          thumbnail_path?: string | null
        }
        Update: {
          created_at?: string | null
          file_name?: string
          file_size?: number
          file_type?: string
          id?: string
          message_id?: string
          metadata?: Json | null
          storage_path?: string
          thumbnail_path?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employer_message_attachments_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "employer_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_message_reactions: {
        Row: {
          created_at: string | null
          emoji: string
          id: string
          message_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          emoji: string
          id?: string
          message_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          emoji?: string
          id?: string
          message_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "employer_message_reactions_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "employer_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_messages: {
        Row: {
          content: string
          conversation_id: string | null
          created_at: string | null
          deleted_at: string | null
          delivered_at: string | null
          edited_at: string | null
          id: string
          message_type: string | null
          metadata: Json | null
          read_at: string | null
          reply_to_id: string | null
          sender_id: string
          sender_type: string
          sent_at: string | null
        }
        Insert: {
          content: string
          conversation_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          delivered_at?: string | null
          edited_at?: string | null
          id?: string
          message_type?: string | null
          metadata?: Json | null
          read_at?: string | null
          reply_to_id?: string | null
          sender_id: string
          sender_type: string
          sent_at?: string | null
        }
        Update: {
          content?: string
          conversation_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          delivered_at?: string | null
          edited_at?: string | null
          id?: string
          message_type?: string | null
          metadata?: Json | null
          read_at?: string | null
          reply_to_id?: string | null
          sender_id?: string
          sender_type?: string
          sent_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employer_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "employer_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employer_messages_reply_to_id_fkey"
            columns: ["reply_to_id"]
            isOneToOne: false
            referencedRelation: "employer_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_notifications: {
        Row: {
          action_url: string | null
          created_at: string
          employee_id: string
          id: string
          job_id: string | null
          message: string
          read_at: string | null
          title: string
          type: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string
          employee_id: string
          id?: string
          job_id?: string | null
          message: string
          read_at?: string | null
          title: string
          type?: string
        }
        Update: {
          action_url?: string | null
          created_at?: string
          employee_id?: string
          id?: string
          job_id?: string | null
          message?: string
          read_at?: string | null
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "employer_notifications_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employer_employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employer_notifications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "employer_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_price_book: {
        Row: {
          buy_price: number
          category: string
          created_at: string
          id: string
          markup: number | null
          name: string
          reorder_level: number | null
          sell_price: number
          sku: string | null
          stock_level: number | null
          supplier_id: string | null
          unit: string
          updated_at: string
        }
        Insert: {
          buy_price?: number
          category: string
          created_at?: string
          id?: string
          markup?: number | null
          name: string
          reorder_level?: number | null
          sell_price?: number
          sku?: string | null
          stock_level?: number | null
          supplier_id?: string | null
          unit?: string
          updated_at?: string
        }
        Update: {
          buy_price?: number
          category?: string
          created_at?: string
          id?: string
          markup?: number | null
          name?: string
          reorder_level?: number | null
          sell_price?: number
          sku?: string | null
          stock_level?: number | null
          supplier_id?: string | null
          unit?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employer_price_book_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "employer_suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_quote_acceptances: {
        Row: {
          access_token: string
          client_email: string | null
          client_name: string | null
          client_notes: string | null
          created_at: string
          expires_at: string
          id: string
          quote_id: string
          responded_at: string | null
          signature_data: string | null
          status: string
        }
        Insert: {
          access_token: string
          client_email?: string | null
          client_name?: string | null
          client_notes?: string | null
          created_at?: string
          expires_at: string
          id?: string
          quote_id: string
          responded_at?: string | null
          signature_data?: string | null
          status?: string
        }
        Update: {
          access_token?: string
          client_email?: string | null
          client_name?: string | null
          client_notes?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          quote_id?: string
          responded_at?: string | null
          signature_data?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "employer_quote_acceptances_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "employer_quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_quotes: {
        Row: {
          client: string
          client_address: string | null
          client_email: string | null
          client_phone: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          job_id: string | null
          job_title: string | null
          line_items: Json | null
          notes: string | null
          quote_number: string
          sent_date: string | null
          status: string
          updated_at: string
          valid_until: string | null
          value: number
        }
        Insert: {
          client: string
          client_address?: string | null
          client_email?: string | null
          client_phone?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          job_id?: string | null
          job_title?: string | null
          line_items?: Json | null
          notes?: string | null
          quote_number: string
          sent_date?: string | null
          status?: string
          updated_at?: string
          valid_until?: string | null
          value?: number
        }
        Update: {
          client?: string
          client_address?: string | null
          client_email?: string | null
          client_phone?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          job_id?: string | null
          job_title?: string | null
          line_items?: Json | null
          notes?: string | null
          quote_number?: string
          sent_date?: string | null
          status?: string
          updated_at?: string
          valid_until?: string | null
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "employer_quotes_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "employer_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_rams: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          client: string | null
          control_measures: string[] | null
          created_at: string
          hazards: string[] | null
          id: string
          job_id: string | null
          location: string | null
          ppe_required: string[] | null
          scope_of_work: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          client?: string | null
          control_measures?: string[] | null
          created_at?: string
          hazards?: string[] | null
          id?: string
          job_id?: string | null
          location?: string | null
          ppe_required?: string[] | null
          scope_of_work?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          client?: string | null
          control_measures?: string[] | null
          created_at?: string
          hazards?: string[] | null
          id?: string
          job_id?: string | null
          location?: string | null
          ppe_required?: string[] | null
          scope_of_work?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employer_rams_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "employer_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_stripe_connected_accounts: {
        Row: {
          account_status: string
          business_name: string | null
          charges_enabled: boolean
          created_at: string
          id: string
          onboarding_completed: boolean
          payouts_enabled: boolean
          stripe_account_id: string
          updated_at: string
        }
        Insert: {
          account_status?: string
          business_name?: string | null
          charges_enabled?: boolean
          created_at?: string
          id?: string
          onboarding_completed?: boolean
          payouts_enabled?: boolean
          stripe_account_id: string
          updated_at?: string
        }
        Update: {
          account_status?: string
          business_name?: string | null
          charges_enabled?: boolean
          created_at?: string
          id?: string
          onboarding_completed?: boolean
          payouts_enabled?: boolean
          stripe_account_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      employer_suppliers: {
        Row: {
          account_number: string | null
          address: string | null
          balance: number | null
          category: string
          contact_name: string | null
          created_at: string
          credit_limit: number | null
          delivery_days: number | null
          discount_percent: number | null
          email: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          account_number?: string | null
          address?: string | null
          balance?: number | null
          category?: string
          contact_name?: string | null
          created_at?: string
          credit_limit?: number | null
          delivery_days?: number | null
          discount_percent?: number | null
          email?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          account_number?: string | null
          address?: string | null
          balance?: number | null
          category?: string
          contact_name?: string | null
          created_at?: string
          credit_limit?: number | null
          delivery_days?: number | null
          discount_percent?: number | null
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      employer_timesheets: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          break_minutes: number
          clock_in: string | null
          clock_out: string | null
          created_at: string
          date: string
          employee_id: string
          id: string
          job_id: string | null
          notes: string | null
          status: string
          total_hours: number | null
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          break_minutes?: number
          clock_in?: string | null
          clock_out?: string | null
          created_at?: string
          date: string
          employee_id: string
          id?: string
          job_id?: string | null
          notes?: string | null
          status?: string
          total_hours?: number | null
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          break_minutes?: number
          clock_in?: string | null
          clock_out?: string | null
          created_at?: string
          date?: string
          employee_id?: string
          id?: string
          job_id?: string | null
          notes?: string | null
          status?: string
          total_hours?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employer_timesheets_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employer_employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employer_timesheets_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "employer_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_vacancies: {
        Row: {
          benefits: string[] | null
          closing_date: string | null
          created_at: string | null
          description: string | null
          id: string
          location: string
          requirements: string[] | null
          salary_max: number | null
          salary_min: number | null
          salary_period: string | null
          status: string | null
          title: string
          type: string | null
          updated_at: string | null
          views: number | null
        }
        Insert: {
          benefits?: string[] | null
          closing_date?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          location: string
          requirements?: string[] | null
          salary_max?: number | null
          salary_min?: number | null
          salary_period?: string | null
          status?: string | null
          title: string
          type?: string | null
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          benefits?: string[] | null
          closing_date?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          location?: string
          requirements?: string[] | null
          salary_max?: number | null
          salary_min?: number | null
          salary_period?: string | null
          status?: string | null
          title?: string
          type?: string | null
          updated_at?: string | null
          views?: number | null
        }
        Relationships: []
      }
      employer_vacancy_applications: {
        Row: {
          applicant_email: string | null
          applicant_name: string
          applicant_phone: string | null
          applicant_profile_id: string | null
          applied_at: string | null
          cover_letter: string | null
          created_at: string | null
          cv_url: string | null
          id: string
          notes: string | null
          status: string | null
          updated_at: string | null
          vacancy_id: string | null
        }
        Insert: {
          applicant_email?: string | null
          applicant_name: string
          applicant_phone?: string | null
          applicant_profile_id?: string | null
          applied_at?: string | null
          cover_letter?: string | null
          created_at?: string | null
          cv_url?: string | null
          id?: string
          notes?: string | null
          status?: string | null
          updated_at?: string | null
          vacancy_id?: string | null
        }
        Update: {
          applicant_email?: string | null
          applicant_name?: string
          applicant_phone?: string | null
          applicant_profile_id?: string | null
          applied_at?: string | null
          cover_letter?: string | null
          created_at?: string | null
          cv_url?: string | null
          id?: string
          notes?: string | null
          status?: string | null
          updated_at?: string | null
          vacancy_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employer_vacancy_applications_applicant_profile_id_fkey"
            columns: ["applicant_profile_id"]
            isOneToOne: false
            referencedRelation: "employer_elec_id_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employer_vacancy_applications_vacancy_id_fkey"
            columns: ["vacancy_id"]
            isOneToOne: false
            referencedRelation: "employer_vacancies"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_vacancy_invitations: {
        Row: {
          created_at: string | null
          electrician_profile_id: string | null
          expires_at: string | null
          id: string
          invited_by: string
          message: string | null
          responded_at: string | null
          sent_at: string | null
          status: string | null
          vacancy_id: string | null
          viewed_at: string | null
        }
        Insert: {
          created_at?: string | null
          electrician_profile_id?: string | null
          expires_at?: string | null
          id?: string
          invited_by: string
          message?: string | null
          responded_at?: string | null
          sent_at?: string | null
          status?: string | null
          vacancy_id?: string | null
          viewed_at?: string | null
        }
        Update: {
          created_at?: string | null
          electrician_profile_id?: string | null
          expires_at?: string | null
          id?: string
          invited_by?: string
          message?: string | null
          responded_at?: string | null
          sent_at?: string | null
          status?: string | null
          vacancy_id?: string | null
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employer_vacancy_invitations_electrician_profile_id_fkey"
            columns: ["electrician_profile_id"]
            isOneToOne: false
            referencedRelation: "employer_elec_id_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employer_vacancy_invitations_vacancy_id_fkey"
            columns: ["vacancy_id"]
            isOneToOne: false
            referencedRelation: "employer_vacancies"
            referencedColumns: ["id"]
          },
        ]
      }
      employer_voice_sessions: {
        Row: {
          context: Json | null
          created_at: string | null
          id: string
          session_key: string
          updated_at: string | null
        }
        Insert: {
          context?: Json | null
          created_at?: string | null
          id?: string
          session_key: string
          updated_at?: string | null
        }
        Update: {
          context?: Json | null
          created_at?: string | null
          id?: string
          session_key?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      employer_worker_locations: {
        Row: {
          accuracy: number | null
          checked_in_at: string | null
          checked_out_at: string | null
          created_at: string
          employee_id: string
          id: string
          job_id: string | null
          last_updated: string
          lat: number
          lng: number
          status: string
        }
        Insert: {
          accuracy?: number | null
          checked_in_at?: string | null
          checked_out_at?: string | null
          created_at?: string
          employee_id: string
          id?: string
          job_id?: string | null
          last_updated?: string
          lat: number
          lng: number
          status?: string
        }
        Update: {
          accuracy?: number | null
          checked_in_at?: string | null
          checked_out_at?: string | null
          created_at?: string
          employee_id?: string
          id?: string
          job_id?: string | null
          last_updated?: string
          lat?: number
          lng?: number
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "employer_worker_locations_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employer_employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employer_worker_locations_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "employer_jobs"
            referencedColumns: ["id"]
          },
        ]
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
      enrichment_reconciliation: {
        Row: {
          created_at: string | null
          id: string
          job_type: string
          missing_ids: Json | null
          missing_items: number
          reconciled_at: string | null
          source_table: string
          target_table: string
          total_enriched_items: number
          total_source_items: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          job_type: string
          missing_ids?: Json | null
          missing_items: number
          reconciled_at?: string | null
          source_table: string
          target_table: string
          total_enriched_items: number
          total_source_items: number
        }
        Update: {
          created_at?: string | null
          id?: string
          job_type?: string
          missing_ids?: Json | null
          missing_items?: number
          reconciled_at?: string | null
          source_table?: string
          target_table?: string
          total_enriched_items?: number
          total_source_items?: number
        }
        Relationships: []
      }
      epa_gateway_checklist: {
        Row: {
          created_at: string | null
          employer_comments: string | null
          employer_declaration_at: string | null
          employer_id: string | null
          employer_name: string | null
          employer_satisfied: boolean | null
          english_level2_achieved: boolean | null
          english_level2_certificate: string | null
          english_level2_date: string | null
          epa_booked: boolean | null
          epa_booking_date: string | null
          epa_eligible: boolean | null
          epa_provider: string | null
          epa_reference: string | null
          gateway_meeting_attendees: string[] | null
          gateway_meeting_date: string | null
          gateway_meeting_held: boolean | null
          gateway_meeting_notes: string | null
          gateway_meeting_outcome: string | null
          gateway_meeting_scheduled: string | null
          gateway_passed: boolean | null
          gateway_passed_at: string | null
          gateway_passed_by: string | null
          id: string
          maths_level2_achieved: boolean | null
          maths_level2_certificate: string | null
          maths_level2_date: string | null
          ojt_hours_completed: number | null
          ojt_hours_required: number | null
          ojt_hours_verified: boolean | null
          ojt_hours_verified_at: string | null
          ojt_hours_verified_by: string | null
          portfolio_complete: boolean | null
          portfolio_complete_at: string | null
          portfolio_signed_off: boolean | null
          portfolio_signed_off_at: string | null
          portfolio_signed_off_by: string | null
          provider_comments: string | null
          provider_declaration_at: string | null
          provider_id: string | null
          provider_name: string | null
          provider_satisfied: boolean | null
          qualification_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          employer_comments?: string | null
          employer_declaration_at?: string | null
          employer_id?: string | null
          employer_name?: string | null
          employer_satisfied?: boolean | null
          english_level2_achieved?: boolean | null
          english_level2_certificate?: string | null
          english_level2_date?: string | null
          epa_booked?: boolean | null
          epa_booking_date?: string | null
          epa_eligible?: boolean | null
          epa_provider?: string | null
          epa_reference?: string | null
          gateway_meeting_attendees?: string[] | null
          gateway_meeting_date?: string | null
          gateway_meeting_held?: boolean | null
          gateway_meeting_notes?: string | null
          gateway_meeting_outcome?: string | null
          gateway_meeting_scheduled?: string | null
          gateway_passed?: boolean | null
          gateway_passed_at?: string | null
          gateway_passed_by?: string | null
          id?: string
          maths_level2_achieved?: boolean | null
          maths_level2_certificate?: string | null
          maths_level2_date?: string | null
          ojt_hours_completed?: number | null
          ojt_hours_required?: number | null
          ojt_hours_verified?: boolean | null
          ojt_hours_verified_at?: string | null
          ojt_hours_verified_by?: string | null
          portfolio_complete?: boolean | null
          portfolio_complete_at?: string | null
          portfolio_signed_off?: boolean | null
          portfolio_signed_off_at?: string | null
          portfolio_signed_off_by?: string | null
          provider_comments?: string | null
          provider_declaration_at?: string | null
          provider_id?: string | null
          provider_name?: string | null
          provider_satisfied?: boolean | null
          qualification_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          employer_comments?: string | null
          employer_declaration_at?: string | null
          employer_id?: string | null
          employer_name?: string | null
          employer_satisfied?: boolean | null
          english_level2_achieved?: boolean | null
          english_level2_certificate?: string | null
          english_level2_date?: string | null
          epa_booked?: boolean | null
          epa_booking_date?: string | null
          epa_eligible?: boolean | null
          epa_provider?: string | null
          epa_reference?: string | null
          gateway_meeting_attendees?: string[] | null
          gateway_meeting_date?: string | null
          gateway_meeting_held?: boolean | null
          gateway_meeting_notes?: string | null
          gateway_meeting_outcome?: string | null
          gateway_meeting_scheduled?: string | null
          gateway_passed?: boolean | null
          gateway_passed_at?: string | null
          gateway_passed_by?: string | null
          id?: string
          maths_level2_achieved?: boolean | null
          maths_level2_certificate?: string | null
          maths_level2_date?: string | null
          ojt_hours_completed?: number | null
          ojt_hours_required?: number | null
          ojt_hours_verified?: boolean | null
          ojt_hours_verified_at?: string | null
          ojt_hours_verified_by?: string | null
          portfolio_complete?: boolean | null
          portfolio_complete_at?: string | null
          portfolio_signed_off?: boolean | null
          portfolio_signed_off_at?: string | null
          portfolio_signed_off_by?: string | null
          provider_comments?: string | null
          provider_declaration_at?: string | null
          provider_id?: string | null
          provider_name?: string | null
          provider_satisfied?: boolean | null
          qualification_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "epa_gateway_checklist_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "epa_gateway_checklist_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "v_assessor_workload"
            referencedColumns: ["assessor_id"]
          },
          {
            foreignKeyName: "epa_gateway_checklist_gateway_passed_by_fkey"
            columns: ["gateway_passed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "epa_gateway_checklist_gateway_passed_by_fkey"
            columns: ["gateway_passed_by"]
            isOneToOne: false
            referencedRelation: "v_assessor_workload"
            referencedColumns: ["assessor_id"]
          },
          {
            foreignKeyName: "epa_gateway_checklist_ojt_hours_verified_by_fkey"
            columns: ["ojt_hours_verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "epa_gateway_checklist_ojt_hours_verified_by_fkey"
            columns: ["ojt_hours_verified_by"]
            isOneToOne: false
            referencedRelation: "v_assessor_workload"
            referencedColumns: ["assessor_id"]
          },
          {
            foreignKeyName: "epa_gateway_checklist_portfolio_signed_off_by_fkey"
            columns: ["portfolio_signed_off_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "epa_gateway_checklist_portfolio_signed_off_by_fkey"
            columns: ["portfolio_signed_off_by"]
            isOneToOne: false
            referencedRelation: "v_assessor_workload"
            referencedColumns: ["assessor_id"]
          },
          {
            foreignKeyName: "epa_gateway_checklist_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "epa_gateway_checklist_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "v_assessor_workload"
            referencedColumns: ["assessor_id"]
          },
          {
            foreignKeyName: "epa_gateway_checklist_qualification_id_fkey"
            columns: ["qualification_id"]
            isOneToOne: false
            referencedRelation: "qualifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "epa_gateway_checklist_qualification_id_fkey"
            columns: ["qualification_id"]
            isOneToOne: false
            referencedRelation: "v_iqa_sampling_status"
            referencedColumns: ["qualification_id"]
          },
          {
            foreignKeyName: "epa_gateway_checklist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "epa_gateway_checklist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_assessor_workload"
            referencedColumns: ["assessor_id"]
          },
        ]
      }
      evidence_ksb_mapping: {
        Row: {
          coverage_level: string | null
          created_at: string | null
          id: string
          ksb_id: string
          mapping_status: string | null
          portfolio_item_id: string
          updated_at: string | null
          verification_notes: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          coverage_level?: string | null
          created_at?: string | null
          id?: string
          ksb_id: string
          mapping_status?: string | null
          portfolio_item_id: string
          updated_at?: string | null
          verification_notes?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          coverage_level?: string | null
          created_at?: string | null
          id?: string
          ksb_id?: string
          mapping_status?: string | null
          portfolio_item_id?: string
          updated_at?: string | null
          verification_notes?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "evidence_ksb_mapping_ksb_id_fkey"
            columns: ["ksb_id"]
            isOneToOne: false
            referencedRelation: "apprenticeship_ksbs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evidence_ksb_mapping_portfolio_item_id_fkey"
            columns: ["portfolio_item_id"]
            isOneToOne: false
            referencedRelation: "portfolio_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evidence_ksb_mapping_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evidence_ksb_mapping_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "v_assessor_workload"
            referencedColumns: ["assessor_id"]
          },
        ]
      }
      evidence_types: {
        Row: {
          allowed_file_types: string[] | null
          code: string
          color: string | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          max_file_size_mb: number | null
          name: string
          requires_date: boolean | null
          requires_witness: boolean | null
          sort_order: number | null
        }
        Insert: {
          allowed_file_types?: string[] | null
          code: string
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          max_file_size_mb?: number | null
          name: string
          requires_date?: boolean | null
          requires_witness?: boolean | null
          sort_order?: number | null
        }
        Update: {
          allowed_file_types?: string[] | null
          code?: string
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          max_file_size_mb?: number | null
          name?: string
          requires_date?: boolean | null
          requires_witness?: boolean | null
          sort_order?: number | null
        }
        Relationships: []
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
      hazard_step_links: {
        Row: {
          created_at: string | null
          hazard_id: string | null
          id: string
          procedure_id: string | null
          relevance_score: number | null
          step_number: number | null
        }
        Insert: {
          created_at?: string | null
          hazard_id?: string | null
          id?: string
          procedure_id?: string | null
          relevance_score?: number | null
          step_number?: number | null
        }
        Update: {
          created_at?: string | null
          hazard_id?: string | null
          id?: string
          procedure_id?: string | null
          relevance_score?: number | null
          step_number?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "hazard_step_links_procedure_id_fkey"
            columns: ["procedure_id"]
            isOneToOne: false
            referencedRelation: "installation_procedures"
            referencedColumns: ["id"]
          },
        ]
      }
      health_safety_intelligence: {
        Row: {
          confidence_score: number | null
          content_summary: string | null
          control_measures: string[] | null
          created_at: string | null
          document_type: string | null
          embedding: string | null
          enrichment_version: string | null
          hazard_description: string | null
          hazards_mentioned: string[] | null
          id: string
          keywords: string[] | null
          primary_topic: string | null
          relevance_score: number | null
          required_ppe: Json | null
          search_tags: string[] | null
          source_hash: string | null
          source_id: string | null
          updated_at: string | null
        }
        Insert: {
          confidence_score?: number | null
          content_summary?: string | null
          control_measures?: string[] | null
          created_at?: string | null
          document_type?: string | null
          embedding?: string | null
          enrichment_version?: string | null
          hazard_description?: string | null
          hazards_mentioned?: string[] | null
          id?: string
          keywords?: string[] | null
          primary_topic?: string | null
          relevance_score?: number | null
          required_ppe?: Json | null
          search_tags?: string[] | null
          source_hash?: string | null
          source_id?: string | null
          updated_at?: string | null
        }
        Update: {
          confidence_score?: number | null
          content_summary?: string | null
          control_measures?: string[] | null
          created_at?: string | null
          document_type?: string | null
          embedding?: string | null
          enrichment_version?: string | null
          hazard_description?: string | null
          hazards_mentioned?: string[] | null
          id?: string
          keywords?: string[] | null
          primary_topic?: string | null
          relevance_score?: number | null
          required_ppe?: Json | null
          search_tags?: string[] | null
          source_hash?: string | null
          source_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "health_safety_intelligence_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "health_safety_knowledge"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "health_safety_intelligence_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "hs_common_hazards"
            referencedColumns: ["id"]
          },
        ]
      }
      health_safety_jobs: {
        Row: {
          completed_at: string | null
          created_at: string | null
          current_step: string | null
          error_message: string | null
          id: string
          output_data: Json | null
          progress: number | null
          project_info: Json | null
          query: string
          raw_response: Json | null
          started_at: string | null
          status: string | null
          updated_at: string | null
          user_id: string
          work_type: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          current_step?: string | null
          error_message?: string | null
          id?: string
          output_data?: Json | null
          progress?: number | null
          project_info?: Json | null
          query: string
          raw_response?: Json | null
          started_at?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
          work_type?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          current_step?: string | null
          error_message?: string | null
          id?: string
          output_data?: Json | null
          progress?: number | null
          project_info?: Json | null
          query?: string
          raw_response?: Json | null
          started_at?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
          work_type?: string | null
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
      inspection_procedures: {
        Row: {
          acceptance_criteria: Json | null
          confidence_score: number | null
          created_at: string | null
          enrichment_version: string | null
          equipment_required: string[] | null
          frequency: string | null
          id: string
          regulations_cited: string[] | null
          source_hash: string | null
          source_id: string | null
          test_name: string
          test_steps: Json
          test_type: string
          typical_values: Json | null
          updated_at: string | null
        }
        Insert: {
          acceptance_criteria?: Json | null
          confidence_score?: number | null
          created_at?: string | null
          enrichment_version?: string | null
          equipment_required?: string[] | null
          frequency?: string | null
          id?: string
          regulations_cited?: string[] | null
          source_hash?: string | null
          source_id?: string | null
          test_name: string
          test_steps?: Json
          test_type: string
          typical_values?: Json | null
          updated_at?: string | null
        }
        Update: {
          acceptance_criteria?: Json | null
          confidence_score?: number | null
          created_at?: string | null
          enrichment_version?: string | null
          equipment_required?: string[] | null
          frequency?: string | null
          id?: string
          regulations_cited?: string[] | null
          source_hash?: string | null
          source_id?: string | null
          test_name?: string
          test_steps?: Json
          test_type?: string
          typical_values?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inspection_procedures_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "inspection_testing_knowledge"
            referencedColumns: ["id"]
          },
        ]
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
          search_vector: unknown
          source: string
          topic: string
        }
        Insert: {
          content: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          search_vector?: unknown
          source: string
          topic: string
        }
        Update: {
          content?: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          search_vector?: unknown
          source?: string
          topic?: string
        }
        Relationships: []
      }
      installation_method_cache: {
        Row: {
          created_at: string | null
          expires_at: string
          hit_count: number | null
          id: string
          installation_method: Json
          last_used_at: string | null
          query_embedding: string
          query_text: string
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          hit_count?: number | null
          id?: string
          installation_method: Json
          last_used_at?: string | null
          query_embedding: string
          query_text: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          hit_count?: number | null
          id?: string
          installation_method?: Json
          last_used_at?: string | null
          query_embedding?: string
          query_text?: string
        }
        Relationships: []
      }
      installation_method_jobs: {
        Row: {
          completed_at: string | null
          created_at: string
          current_step: string | null
          designer_context: Json | null
          detail_level: string | null
          error_message: string | null
          id: string
          method_data: Json | null
          progress: number
          project_details: Json
          quality_metrics: Json | null
          query: string
          started_at: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          current_step?: string | null
          designer_context?: Json | null
          detail_level?: string | null
          error_message?: string | null
          id?: string
          method_data?: Json | null
          progress?: number
          project_details: Json
          quality_metrics?: Json | null
          query: string
          started_at?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          current_step?: string | null
          designer_context?: Json | null
          detail_level?: string | null
          error_message?: string | null
          id?: string
          method_data?: Json | null
          progress?: number
          project_details?: Json
          quality_metrics?: Json | null
          query?: string
          started_at?: string | null
          status?: string
          updated_at?: string
          user_id?: string
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
      installation_procedures: {
        Row: {
          confidence_score: number | null
          created_at: string | null
          enrichment_version: string | null
          estimated_time_minutes: number | null
          id: string
          materials_required: string[] | null
          procedure_title: string
          procedure_type: string
          regulations_cited: string[] | null
          safety_requirements: Json | null
          skill_level: string | null
          source_hash: string | null
          source_id: string | null
          steps: Json
          tools_required: string[] | null
          updated_at: string | null
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string | null
          enrichment_version?: string | null
          estimated_time_minutes?: number | null
          id?: string
          materials_required?: string[] | null
          procedure_title: string
          procedure_type: string
          regulations_cited?: string[] | null
          safety_requirements?: Json | null
          skill_level?: string | null
          source_hash?: string | null
          source_id?: string | null
          steps?: Json
          tools_required?: string[] | null
          updated_at?: string | null
        }
        Update: {
          confidence_score?: number | null
          created_at?: string | null
          enrichment_version?: string | null
          estimated_time_minutes?: number | null
          id?: string
          materials_required?: string[] | null
          procedure_title?: string
          procedure_type?: string
          regulations_cited?: string[] | null
          safety_requirements?: Json | null
          skill_level?: string | null
          source_hash?: string | null
          source_id?: string | null
          steps?: Json
          tools_required?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "installation_procedures_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "installation_knowledge"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_payments: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          notes: string | null
          payment_date: string
          payment_method: string | null
          payment_reference: string | null
          quote_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          notes?: string | null
          payment_date: string
          payment_method?: string | null
          payment_reference?: string | null
          quote_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          notes?: string | null
          payment_date?: string
          payment_method?: string | null
          payment_reference?: string | null
          quote_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_payments_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_assessor_workload"
            referencedColumns: ["assessor_id"]
          },
        ]
      }
      invoice_reminders: {
        Row: {
          created_at: string | null
          id: string
          quote_id: string | null
          reminder_type: string
          sent_at: string | null
          sent_to_email: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          quote_id?: string | null
          reminder_type: string
          sent_at?: string | null
          sent_to_email: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          quote_id?: string | null
          reminder_type?: string
          sent_at?: string | null
          sent_to_email?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_reminders_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_reminders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_reminders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_assessor_workload"
            referencedColumns: ["assessor_id"]
          },
        ]
      }
      iqa_sampling_records: {
        Row: {
          action_deadline: string | null
          action_points: string[] | null
          actions_completed: boolean | null
          actions_completed_at: string | null
          assessment_decision_agreed: boolean | null
          assessor_id: string
          best_practice_identified: string | null
          categories_reviewed: string[] | null
          created_at: string | null
          evidence_items_reviewed: number | null
          evidence_sufficiency: string | null
          feedback_quality: string | null
          follow_up_date: string | null
          follow_up_notes: string | null
          follow_up_required: boolean | null
          grading_appropriate: boolean | null
          id: string
          iqa_feedback: string | null
          iqa_id: string
          observation_id: string | null
          outcome: string
          qualification_id: string | null
          reviewed_at: string | null
          sampling_period_end: string | null
          sampling_period_start: string | null
          sampling_type: string | null
          standardization_notes: string | null
          student_id: string
          submission_id: string | null
          updated_at: string | null
        }
        Insert: {
          action_deadline?: string | null
          action_points?: string[] | null
          actions_completed?: boolean | null
          actions_completed_at?: string | null
          assessment_decision_agreed?: boolean | null
          assessor_id: string
          best_practice_identified?: string | null
          categories_reviewed?: string[] | null
          created_at?: string | null
          evidence_items_reviewed?: number | null
          evidence_sufficiency?: string | null
          feedback_quality?: string | null
          follow_up_date?: string | null
          follow_up_notes?: string | null
          follow_up_required?: boolean | null
          grading_appropriate?: boolean | null
          id?: string
          iqa_feedback?: string | null
          iqa_id: string
          observation_id?: string | null
          outcome: string
          qualification_id?: string | null
          reviewed_at?: string | null
          sampling_period_end?: string | null
          sampling_period_start?: string | null
          sampling_type?: string | null
          standardization_notes?: string | null
          student_id: string
          submission_id?: string | null
          updated_at?: string | null
        }
        Update: {
          action_deadline?: string | null
          action_points?: string[] | null
          actions_completed?: boolean | null
          actions_completed_at?: string | null
          assessment_decision_agreed?: boolean | null
          assessor_id?: string
          best_practice_identified?: string | null
          categories_reviewed?: string[] | null
          created_at?: string | null
          evidence_items_reviewed?: number | null
          evidence_sufficiency?: string | null
          feedback_quality?: string | null
          follow_up_date?: string | null
          follow_up_notes?: string | null
          follow_up_required?: boolean | null
          grading_appropriate?: boolean | null
          id?: string
          iqa_feedback?: string | null
          iqa_id?: string
          observation_id?: string | null
          outcome?: string
          qualification_id?: string | null
          reviewed_at?: string | null
          sampling_period_end?: string | null
          sampling_period_start?: string | null
          sampling_type?: string | null
          standardization_notes?: string | null
          student_id?: string
          submission_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "iqa_sampling_records_assessor_id_fkey"
            columns: ["assessor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "iqa_sampling_records_assessor_id_fkey"
            columns: ["assessor_id"]
            isOneToOne: false
            referencedRelation: "v_assessor_workload"
            referencedColumns: ["assessor_id"]
          },
          {
            foreignKeyName: "iqa_sampling_records_iqa_id_fkey"
            columns: ["iqa_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "iqa_sampling_records_iqa_id_fkey"
            columns: ["iqa_id"]
            isOneToOne: false
            referencedRelation: "v_assessor_workload"
            referencedColumns: ["assessor_id"]
          },
          {
            foreignKeyName: "iqa_sampling_records_observation_id_fkey"
            columns: ["observation_id"]
            isOneToOne: false
            referencedRelation: "assessor_observations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "iqa_sampling_records_qualification_id_fkey"
            columns: ["qualification_id"]
            isOneToOne: false
            referencedRelation: "qualifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "iqa_sampling_records_qualification_id_fkey"
            columns: ["qualification_id"]
            isOneToOne: false
            referencedRelation: "v_iqa_sampling_status"
            referencedColumns: ["qualification_id"]
          },
          {
            foreignKeyName: "iqa_sampling_records_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "iqa_sampling_records_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "v_assessor_workload"
            referencedColumns: ["assessor_id"]
          },
          {
            foreignKeyName: "iqa_sampling_records_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "portfolio_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      job_financials: {
        Row: {
          actual_equipment: number | null
          actual_labour: number | null
          actual_materials: number | null
          actual_overheads: number | null
          actual_total: number | null
          budget_equipment: number | null
          budget_labour: number | null
          budget_materials: number | null
          budget_overheads: number | null
          budget_profit: number | null
          budget_total: number | null
          created_at: string | null
          id: string
          invoiced: number | null
          job_id: string | null
          margin: number | null
          notes: string | null
          paid: number | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          actual_equipment?: number | null
          actual_labour?: number | null
          actual_materials?: number | null
          actual_overheads?: number | null
          actual_total?: number | null
          budget_equipment?: number | null
          budget_labour?: number | null
          budget_materials?: number | null
          budget_overheads?: number | null
          budget_profit?: number | null
          budget_total?: number | null
          created_at?: string | null
          id?: string
          invoiced?: number | null
          job_id?: string | null
          margin?: number | null
          notes?: string | null
          paid?: number | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          actual_equipment?: number | null
          actual_labour?: number | null
          actual_materials?: number | null
          actual_overheads?: number | null
          actual_total?: number | null
          budget_equipment?: number | null
          budget_labour?: number | null
          budget_materials?: number | null
          budget_overheads?: number | null
          budget_profit?: number | null
          budget_total?: number | null
          created_at?: string | null
          id?: string
          invoiced?: number | null
          job_id?: string | null
          margin?: number | null
          notes?: string | null
          paid?: number | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_financials_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: true
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
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
      jobs: {
        Row: {
          archived_at: string | null
          client: string
          cover_photo_url: string | null
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          is_template: boolean | null
          lat: number | null
          lng: number | null
          location: string | null
          position: number | null
          progress: number | null
          start_date: string | null
          status: string | null
          title: string
          updated_at: string | null
          user_id: string | null
          value: number | null
          workers_count: number | null
        }
        Insert: {
          archived_at?: string | null
          client: string
          cover_photo_url?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_template?: boolean | null
          lat?: number | null
          lng?: number | null
          location?: string | null
          position?: number | null
          progress?: number | null
          start_date?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
          value?: number | null
          workers_count?: number | null
        }
        Update: {
          archived_at?: string | null
          client?: string
          cover_photo_url?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_template?: boolean | null
          lat?: number | null
          lng?: number | null
          location?: string | null
          position?: number | null
          progress?: number | null
          start_date?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
          value?: number | null
          workers_count?: number | null
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
      lti_access_tokens: {
        Row: {
          access_token: string
          created_at: string
          expires_at: string
          id: string
          platform_id: string
          scopes: string[] | null
          token_type: string
        }
        Insert: {
          access_token: string
          created_at?: string
          expires_at: string
          id?: string
          platform_id: string
          scopes?: string[] | null
          token_type?: string
        }
        Update: {
          access_token?: string
          created_at?: string
          expires_at?: string
          id?: string
          platform_id?: string
          scopes?: string[] | null
          token_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "lti_access_tokens_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "lti_platforms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lti_access_tokens_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "v_lti_grade_sync_status"
            referencedColumns: ["platform_id"]
          },
        ]
      }
      lti_contexts: {
        Row: {
          cohort_id: string | null
          context_id: string
          context_label: string | null
          context_title: string | null
          context_type: string[] | null
          created_at: string
          id: string
          platform_id: string
          settings: Json | null
          updated_at: string
        }
        Insert: {
          cohort_id?: string | null
          context_id: string
          context_label?: string | null
          context_title?: string | null
          context_type?: string[] | null
          created_at?: string
          id?: string
          platform_id: string
          settings?: Json | null
          updated_at?: string
        }
        Update: {
          cohort_id?: string | null
          context_id?: string
          context_label?: string | null
          context_title?: string | null
          context_type?: string[] | null
          created_at?: string
          id?: string
          platform_id?: string
          settings?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lti_contexts_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "lti_platforms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lti_contexts_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "v_lti_grade_sync_status"
            referencedColumns: ["platform_id"]
          },
        ]
      }
      lti_grade_sync: {
        Row: {
          activity_progress: string | null
          comment: string | null
          context_id: string | null
          created_at: string
          error_message: string | null
          grading_progress: string | null
          id: string
          lineitem_id: string | null
          lti_user_id: string | null
          platform_id: string
          portfolio_submission_id: string | null
          resource_link_id: string | null
          score_given: number | null
          score_maximum: number | null
          sync_error: string | null
          sync_status: string
          synced_at: string | null
          user_id: string | null
        }
        Insert: {
          activity_progress?: string | null
          comment?: string | null
          context_id?: string | null
          created_at?: string
          error_message?: string | null
          grading_progress?: string | null
          id?: string
          lineitem_id?: string | null
          lti_user_id?: string | null
          platform_id: string
          portfolio_submission_id?: string | null
          resource_link_id?: string | null
          score_given?: number | null
          score_maximum?: number | null
          sync_error?: string | null
          sync_status?: string
          synced_at?: string | null
          user_id?: string | null
        }
        Update: {
          activity_progress?: string | null
          comment?: string | null
          context_id?: string | null
          created_at?: string
          error_message?: string | null
          grading_progress?: string | null
          id?: string
          lineitem_id?: string | null
          lti_user_id?: string | null
          platform_id?: string
          portfolio_submission_id?: string | null
          resource_link_id?: string | null
          score_given?: number | null
          score_maximum?: number | null
          sync_error?: string | null
          sync_status?: string
          synced_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lti_grade_sync_context_id_fkey"
            columns: ["context_id"]
            isOneToOne: false
            referencedRelation: "lti_contexts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lti_grade_sync_lti_user_id_fkey"
            columns: ["lti_user_id"]
            isOneToOne: false
            referencedRelation: "lti_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lti_grade_sync_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "lti_platforms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lti_grade_sync_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "v_lti_grade_sync_status"
            referencedColumns: ["platform_id"]
          },
          {
            foreignKeyName: "lti_grade_sync_resource_link_id_fkey"
            columns: ["resource_link_id"]
            isOneToOne: false
            referencedRelation: "lti_resource_links"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lti_grade_sync_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lti_grade_sync_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_assessor_workload"
            referencedColumns: ["assessor_id"]
          },
        ]
      }
      lti_launch_sessions: {
        Row: {
          client_id: string | null
          created_at: string
          expires_at: string
          id: string
          login_hint: string | null
          lti_message_hint: string | null
          nonce: string | null
          platform_id: string | null
          redirect_uri: string | null
          state: string
          target_link_uri: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          login_hint?: string | null
          lti_message_hint?: string | null
          nonce?: string | null
          platform_id?: string | null
          redirect_uri?: string | null
          state: string
          target_link_uri?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          login_hint?: string | null
          lti_message_hint?: string | null
          nonce?: string | null
          platform_id?: string | null
          redirect_uri?: string | null
          state?: string
          target_link_uri?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lti_launch_sessions_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "lti_platforms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lti_launch_sessions_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "v_lti_grade_sync_status"
            referencedColumns: ["platform_id"]
          },
        ]
      }
      lti_launches: {
        Row: {
          context_id: string | null
          context_label: string | null
          context_title: string | null
          created_at: string | null
          expires_at: string | null
          id: string
          launch_data: Json | null
          lti_user_id: string
          nonce: string
          platform_id: string | null
          resource_link_id: string | null
          roles: string[] | null
          state: string
          user_id: string | null
          validated: boolean | null
        }
        Insert: {
          context_id?: string | null
          context_label?: string | null
          context_title?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          launch_data?: Json | null
          lti_user_id: string
          nonce: string
          platform_id?: string | null
          resource_link_id?: string | null
          roles?: string[] | null
          state: string
          user_id?: string | null
          validated?: boolean | null
        }
        Update: {
          context_id?: string | null
          context_label?: string | null
          context_title?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          launch_data?: Json | null
          lti_user_id?: string
          nonce?: string
          platform_id?: string | null
          resource_link_id?: string | null
          roles?: string[] | null
          state?: string
          user_id?: string | null
          validated?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "lti_launches_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "lti_platforms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lti_launches_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "v_lti_grade_sync_status"
            referencedColumns: ["platform_id"]
          },
          {
            foreignKeyName: "lti_launches_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lti_launches_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_assessor_workload"
            referencedColumns: ["assessor_id"]
          },
        ]
      }
      lti_nonces: {
        Row: {
          id: string
          nonce: string
          platform_id: string
          used_at: string
        }
        Insert: {
          id?: string
          nonce: string
          platform_id: string
          used_at?: string
        }
        Update: {
          id?: string
          nonce?: string
          platform_id?: string
          used_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lti_nonces_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "lti_platforms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lti_nonces_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "v_lti_grade_sync_status"
            referencedColumns: ["platform_id"]
          },
        ]
      }
      lti_platforms: {
        Row: {
          auth_login_url: string
          auth_token_url: string
          client_id: string
          college_id: string | null
          created_at: string
          deployment_id: string | null
          id: string
          issuer: string
          jwks_url: string
          last_sync_at: string | null
          name: string
          platform_type: string
          settings: Json | null
          status: string
          updated_at: string
        }
        Insert: {
          auth_login_url: string
          auth_token_url: string
          client_id: string
          college_id?: string | null
          created_at?: string
          deployment_id?: string | null
          id?: string
          issuer: string
          jwks_url: string
          last_sync_at?: string | null
          name: string
          platform_type: string
          settings?: Json | null
          status?: string
          updated_at?: string
        }
        Update: {
          auth_login_url?: string
          auth_token_url?: string
          client_id?: string
          college_id?: string | null
          created_at?: string
          deployment_id?: string | null
          id?: string
          issuer?: string
          jwks_url?: string
          last_sync_at?: string | null
          name?: string
          platform_type?: string
          settings?: Json | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lti_platforms_college_fk"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "colleges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lti_platforms_college_fk"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "v_iqa_sampling_status"
            referencedColumns: ["college_id"]
          },
          {
            foreignKeyName: "lti_platforms_college_fk"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "v_portfolio_stats_by_college"
            referencedColumns: ["college_id"]
          },
        ]
      }
      lti_resource_links: {
        Row: {
          context_id: string | null
          created_at: string
          id: string
          lineitem_url: string | null
          local_resource_id: string | null
          local_resource_type: string | null
          platform_id: string
          resource_link_id: string
          resource_link_title: string | null
          resource_type: string | null
          settings: Json | null
        }
        Insert: {
          context_id?: string | null
          created_at?: string
          id?: string
          lineitem_url?: string | null
          local_resource_id?: string | null
          local_resource_type?: string | null
          platform_id: string
          resource_link_id: string
          resource_link_title?: string | null
          resource_type?: string | null
          settings?: Json | null
        }
        Update: {
          context_id?: string | null
          created_at?: string
          id?: string
          lineitem_url?: string | null
          local_resource_id?: string | null
          local_resource_type?: string | null
          platform_id?: string
          resource_link_id?: string
          resource_link_title?: string | null
          resource_type?: string | null
          settings?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "lti_resource_links_context_id_fkey"
            columns: ["context_id"]
            isOneToOne: false
            referencedRelation: "lti_contexts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lti_resource_links_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "lti_platforms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lti_resource_links_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "v_lti_grade_sync_status"
            referencedColumns: ["platform_id"]
          },
        ]
      }
      lti_roster_sync: {
        Row: {
          completed_at: string | null
          context_id: string | null
          id: string
          members_created: number | null
          members_synced: number | null
          members_updated: number | null
          platform_id: string
          started_at: string
          sync_error: string | null
          sync_status: string
          sync_type: string
        }
        Insert: {
          completed_at?: string | null
          context_id?: string | null
          id?: string
          members_created?: number | null
          members_synced?: number | null
          members_updated?: number | null
          platform_id: string
          started_at?: string
          sync_error?: string | null
          sync_status?: string
          sync_type: string
        }
        Update: {
          completed_at?: string | null
          context_id?: string | null
          id?: string
          members_created?: number | null
          members_synced?: number | null
          members_updated?: number | null
          platform_id?: string
          started_at?: string
          sync_error?: string | null
          sync_status?: string
          sync_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "lti_roster_sync_context_id_fkey"
            columns: ["context_id"]
            isOneToOne: false
            referencedRelation: "lti_contexts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lti_roster_sync_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "lti_platforms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lti_roster_sync_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "v_lti_grade_sync_status"
            referencedColumns: ["platform_id"]
          },
        ]
      }
      lti_tool_keys: {
        Row: {
          algorithm: string
          created_at: string
          expires_at: string | null
          id: string
          is_active: boolean
          kid: string
          private_key: string
          public_key: string
        }
        Insert: {
          algorithm?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          kid: string
          private_key: string
          public_key: string
        }
        Update: {
          algorithm?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          kid?: string
          private_key?: string
          public_key?: string
        }
        Relationships: []
      }
      lti_user_mappings: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          last_login_at: string | null
          lti_user_id: string
          name: string | null
          platform_id: string | null
          roles: string[] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          last_login_at?: string | null
          lti_user_id: string
          name?: string | null
          platform_id?: string | null
          roles?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          last_login_at?: string | null
          lti_user_id?: string
          name?: string | null
          platform_id?: string | null
          roles?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lti_user_mappings_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "lti_platforms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lti_user_mappings_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "v_lti_grade_sync_status"
            referencedColumns: ["platform_id"]
          },
          {
            foreignKeyName: "lti_user_mappings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lti_user_mappings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_assessor_workload"
            referencedColumns: ["assessor_id"]
          },
        ]
      }
      lti_users: {
        Row: {
          created_at: string
          email: string | null
          family_name: string | null
          given_name: string | null
          id: string
          last_login_at: string | null
          local_user_id: string | null
          lti_user_id: string
          name: string | null
          platform_id: string
          roles: string[] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          family_name?: string | null
          given_name?: string | null
          id?: string
          last_login_at?: string | null
          local_user_id?: string | null
          lti_user_id: string
          name?: string | null
          platform_id: string
          roles?: string[] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          family_name?: string | null
          given_name?: string | null
          id?: string
          last_login_at?: string | null
          local_user_id?: string | null
          lti_user_id?: string
          name?: string | null
          platform_id?: string
          roles?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lti_users_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "lti_platforms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lti_users_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "v_lti_grade_sync_status"
            referencedColumns: ["platform_id"]
          },
        ]
      }
      maintenance_knowledge: {
        Row: {
          content: string
          created_at: string | null
          embedding: string | null
          equipment_type: string | null
          id: string
          maintenance_type: string | null
          metadata: Json | null
          search_vector: unknown
          source: string
          topic: string
        }
        Insert: {
          content: string
          created_at?: string | null
          embedding?: string | null
          equipment_type?: string | null
          id?: string
          maintenance_type?: string | null
          metadata?: Json | null
          search_vector?: unknown
          source: string
          topic: string
        }
        Update: {
          content?: string
          created_at?: string | null
          embedding?: string | null
          equipment_type?: string | null
          id?: string
          maintenance_type?: string | null
          metadata?: Json | null
          search_vector?: unknown
          source?: string
          topic?: string
        }
        Relationships: []
      }
      maintenance_knowledge_backup: {
        Row: {
          content: string | null
          created_at: string | null
          embedding: string | null
          equipment_type: string | null
          id: string | null
          maintenance_type: string | null
          metadata: Json | null
          search_vector: unknown
          source: string | null
          topic: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          embedding?: string | null
          equipment_type?: string | null
          id?: string | null
          maintenance_type?: string | null
          metadata?: Json | null
          search_vector?: unknown
          source?: string | null
          topic?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          embedding?: string | null
          equipment_type?: string | null
          id?: string | null
          maintenance_type?: string | null
          metadata?: Json | null
          search_vector?: unknown
          source?: string | null
          topic?: string | null
        }
        Relationships: []
      }
      maintenance_method_jobs: {
        Row: {
          completed_at: string | null
          created_at: string | null
          current_step: string | null
          detail_level: string | null
          equipment_details: Json | null
          error_message: string | null
          id: string
          method_data: Json | null
          progress: number | null
          quality_metrics: Json | null
          query: string
          started_at: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          current_step?: string | null
          detail_level?: string | null
          equipment_details?: Json | null
          error_message?: string | null
          id?: string
          method_data?: Json | null
          progress?: number | null
          quality_metrics?: Json | null
          query: string
          started_at?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          current_step?: string | null
          detail_level?: string | null
          equipment_details?: Json | null
          error_message?: string | null
          id?: string
          method_data?: Json | null
          progress?: number | null
          quality_metrics?: Json | null
          query?: string
          started_at?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      maintenance_schedules: {
        Row: {
          confidence_score: number | null
          created_at: string | null
          enrichment_version: string | null
          equipment_type: string
          estimated_duration_minutes: number | null
          frequency: string | null
          id: string
          maintenance_type: string
          procedure_steps: Json
          regulations_cited: string[] | null
          required_qualifications: string[] | null
          safety_precautions: Json | null
          source_hash: string | null
          source_id: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string | null
          enrichment_version?: string | null
          equipment_type: string
          estimated_duration_minutes?: number | null
          frequency?: string | null
          id?: string
          maintenance_type: string
          procedure_steps?: Json
          regulations_cited?: string[] | null
          required_qualifications?: string[] | null
          safety_precautions?: Json | null
          source_hash?: string | null
          source_id?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          confidence_score?: number | null
          created_at?: string | null
          enrichment_version?: string | null
          equipment_type?: string
          estimated_duration_minutes?: number | null
          frequency?: string | null
          id?: string
          maintenance_type?: string
          procedure_steps?: Json
          regulations_cited?: string[] | null
          required_qualifications?: string[] | null
          safety_precautions?: Json | null
          source_hash?: string | null
          source_id?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_schedules_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "maintenance_knowledge"
            referencedColumns: ["id"]
          },
        ]
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
      mental_health_peer_blocks: {
        Row: {
          blocked_user_id: string
          blocker_id: string
          created_at: string | null
          id: string
        }
        Insert: {
          blocked_user_id: string
          blocker_id: string
          created_at?: string | null
          id?: string
        }
        Update: {
          blocked_user_id?: string
          blocker_id?: string
          created_at?: string | null
          id?: string
        }
        Relationships: []
      }
      mental_health_peer_conversations: {
        Row: {
          ended_at: string | null
          id: string
          last_message_at: string | null
          seeker_id: string
          started_at: string | null
          status: string | null
          supporter_id: string | null
        }
        Insert: {
          ended_at?: string | null
          id?: string
          last_message_at?: string | null
          seeker_id: string
          started_at?: string | null
          status?: string | null
          supporter_id?: string | null
        }
        Update: {
          ended_at?: string | null
          id?: string
          last_message_at?: string | null
          seeker_id?: string
          started_at?: string | null
          status?: string | null
          supporter_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mental_health_peer_conversations_supporter_id_fkey"
            columns: ["supporter_id"]
            isOneToOne: false
            referencedRelation: "mental_health_peer_supporters"
            referencedColumns: ["id"]
          },
        ]
      }
      mental_health_peer_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string | null
          delivered_at: string | null
          id: string
          is_read: boolean | null
          read_at: string | null
          sender_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string | null
          delivered_at?: string | null
          id?: string
          is_read?: boolean | null
          read_at?: string | null
          sender_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string | null
          delivered_at?: string | null
          id?: string
          is_read?: boolean | null
          read_at?: string | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mental_health_peer_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "mental_health_peer_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      mental_health_peer_reports: {
        Row: {
          additional_notes: string | null
          admin_notes: string | null
          conversation_id: string | null
          created_at: string | null
          id: string
          reason: string
          reported_user_id: string
          reporter_id: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
        }
        Insert: {
          additional_notes?: string | null
          admin_notes?: string | null
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          reason: string
          reported_user_id: string
          reporter_id: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
        }
        Update: {
          additional_notes?: string | null
          admin_notes?: string | null
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          reason?: string
          reported_user_id?: string
          reporter_id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mental_health_peer_reports_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "mental_health_peer_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      mental_health_peer_supporters: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          display_name: string
          id: string
          is_active: boolean | null
          is_available: boolean | null
          last_active_at: string | null
          topics_comfortable_with: string[] | null
          total_conversations: number | null
          training_level: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name: string
          id?: string
          is_active?: boolean | null
          is_available?: boolean | null
          last_active_at?: string | null
          topics_comfortable_with?: string[] | null
          total_conversations?: number | null
          training_level?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string
          id?: string
          is_active?: boolean | null
          is_available?: boolean | null
          last_active_at?: string | null
          topics_comfortable_with?: string[] | null
          total_conversations?: number | null
          training_level?: string | null
          updated_at?: string | null
          user_id?: string
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
          common_mistakes: string[] | null
          compliance_regulations: string[] | null
          compliance_warnings: string[] | null
          contractor: string
          created_at: string
          description: string | null
          difficulty_level: string | null
          duration: string | null
          id: string
          job_scale: string | null
          job_title: string
          location: string
          materials_required: string[] | null
          overall_risk_level: string
          practical_tips: string[] | null
          rams_document_id: string | null
          review_date: string | null
          status: string
          steps: Json
          supervisor: string
          team_size: string | null
          tools_required: string[] | null
          total_estimated_time: string | null
          updated_at: string
          user_id: string
          work_type: string
        }
        Insert: {
          approved_by?: string | null
          common_mistakes?: string[] | null
          compliance_regulations?: string[] | null
          compliance_warnings?: string[] | null
          contractor: string
          created_at?: string
          description?: string | null
          difficulty_level?: string | null
          duration?: string | null
          id?: string
          job_scale?: string | null
          job_title: string
          location: string
          materials_required?: string[] | null
          overall_risk_level?: string
          practical_tips?: string[] | null
          rams_document_id?: string | null
          review_date?: string | null
          status?: string
          steps?: Json
          supervisor: string
          team_size?: string | null
          tools_required?: string[] | null
          total_estimated_time?: string | null
          updated_at?: string
          user_id: string
          work_type: string
        }
        Update: {
          approved_by?: string | null
          common_mistakes?: string[] | null
          compliance_regulations?: string[] | null
          compliance_warnings?: string[] | null
          contractor?: string
          created_at?: string
          description?: string | null
          difficulty_level?: string | null
          duration?: string | null
          id?: string
          job_scale?: string | null
          job_title?: string
          location?: string
          materials_required?: string[] | null
          overall_risk_level?: string
          practical_tips?: string[] | null
          rams_document_id?: string | null
          review_date?: string | null
          status?: string
          steps?: Json
          supervisor?: string
          team_size?: string | null
          tools_required?: string[] | null
          total_estimated_time?: string | null
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
          equipment_fault_details: string | null
          equipment_faulty: boolean | null
          equipment_involved: string | null
          follow_up_required: boolean
          id: string
          immediate_actions: string | null
          incident_date: string
          incident_time: string
          lighting_conditions: string | null
          location: string
          photos_attached: string[] | null
          potential_consequences: string | null
          preventive_measures: string | null
          previous_similar_incidents: string | null
          reporter_name: string
          severity: string
          status: string
          supervisor_name: string | null
          supervisor_notified: boolean | null
          third_party_details: string | null
          third_party_involved: boolean | null
          updated_at: string
          user_id: string
          weather_conditions: string | null
          witnesses: Json | null
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
          equipment_fault_details?: string | null
          equipment_faulty?: boolean | null
          equipment_involved?: string | null
          follow_up_required?: boolean
          id?: string
          immediate_actions?: string | null
          incident_date: string
          incident_time: string
          lighting_conditions?: string | null
          location: string
          photos_attached?: string[] | null
          potential_consequences?: string | null
          preventive_measures?: string | null
          previous_similar_incidents?: string | null
          reporter_name: string
          severity: string
          status?: string
          supervisor_name?: string | null
          supervisor_notified?: boolean | null
          third_party_details?: string | null
          third_party_involved?: boolean | null
          updated_at?: string
          user_id: string
          weather_conditions?: string | null
          witnesses?: Json | null
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
          equipment_fault_details?: string | null
          equipment_faulty?: boolean | null
          equipment_involved?: string | null
          follow_up_required?: boolean
          id?: string
          immediate_actions?: string | null
          incident_date?: string
          incident_time?: string
          lighting_conditions?: string | null
          location?: string
          photos_attached?: string[] | null
          potential_consequences?: string | null
          preventive_measures?: string | null
          previous_similar_incidents?: string | null
          reporter_name?: string
          severity?: string
          status?: string
          supervisor_name?: string | null
          supervisor_notified?: boolean | null
          third_party_details?: string | null
          third_party_involved?: boolean | null
          updated_at?: string
          user_id?: string
          weather_conditions?: string | null
          witnesses?: Json | null
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
      notification_log: {
        Row: {
          body: string | null
          clicked_at: string | null
          data: Json | null
          id: string
          notification_type: string
          read_at: string | null
          sent_at: string | null
          title: string
          user_id: string
        }
        Insert: {
          body?: string | null
          clicked_at?: string | null
          data?: Json | null
          id?: string
          notification_type: string
          read_at?: string | null
          sent_at?: string | null
          title: string
          user_id: string
        }
        Update: {
          body?: string | null
          clicked_at?: string | null
          data?: Json | null
          id?: string
          notification_type?: string
          read_at?: string | null
          sent_at?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      notification_logs: {
        Row: {
          created_at: string | null
          id: string
          invoice_id: string | null
          notification_type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          invoice_id?: string | null
          notification_type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          invoice_id?: string | null
          notification_type?: string
          user_id?: string
        }
        Relationships: []
      }
      oauth_states: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          provider: string
          state: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at: string
          id?: string
          provider: string
          state: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          provider?: string
          state?: string
          user_id?: string
        }
        Relationships: []
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
      performance_analytics: {
        Row: {
          agent_name: string
          ai_time_ms: number | null
          cache_hit: boolean | null
          id: string
          metadata: Json | null
          quality_score: number | null
          query_hash: string
          query_text: string
          rag_time_ms: number | null
          regulation_count: number | null
          timestamp: string | null
          total_time_ms: number
          user_id: string | null
        }
        Insert: {
          agent_name: string
          ai_time_ms?: number | null
          cache_hit?: boolean | null
          id?: string
          metadata?: Json | null
          quality_score?: number | null
          query_hash: string
          query_text: string
          rag_time_ms?: number | null
          regulation_count?: number | null
          timestamp?: string | null
          total_time_ms: number
          user_id?: string | null
        }
        Update: {
          agent_name?: string
          ai_time_ms?: number | null
          cache_hit?: boolean | null
          id?: string
          metadata?: Json | null
          quality_score?: number | null
          query_hash?: string
          query_text?: string
          rag_time_ms?: number | null
          regulation_count?: number | null
          timestamp?: string | null
          total_time_ms?: number
          user_id?: string | null
        }
        Relationships: []
      }
      portfolio_audit_log: {
        Row: {
          action: string
          created_at: string | null
          entity_id: string
          entity_type: string
          id: string
          ip_address: string | null
          metadata: Json | null
          new_values: Json | null
          old_values: Json | null
          user_agent: string | null
          user_id: string | null
          user_name: string | null
          user_role: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          entity_id: string
          entity_type: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          new_values?: Json | null
          old_values?: Json | null
          user_agent?: string | null
          user_id?: string | null
          user_name?: string | null
          user_role?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          entity_id?: string
          entity_type?: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          new_values?: Json | null
          old_values?: Json | null
          user_agent?: string | null
          user_id?: string | null
          user_name?: string | null
          user_role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_audit_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portfolio_audit_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_assessor_workload"
            referencedColumns: ["assessor_id"]
          },
        ]
      }
      portfolio_comments: {
        Row: {
          action_owner: string | null
          author_id: string
          author_initials: string | null
          author_name: string
          author_role: string
          content: string
          context_type: string
          created_at: string | null
          evidence_id: string
          id: string
          is_resolved: boolean | null
          mentions: string[] | null
          parent_id: string | null
          requires_action: boolean | null
          resolved_by_name: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          action_owner?: string | null
          author_id?: string
          author_initials?: string | null
          author_name: string
          author_role?: string
          content: string
          context_type?: string
          created_at?: string | null
          evidence_id: string
          id?: string
          is_resolved?: boolean | null
          mentions?: string[] | null
          parent_id?: string | null
          requires_action?: boolean | null
          resolved_by_name?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          action_owner?: string | null
          author_id?: string
          author_initials?: string | null
          author_name?: string
          author_role?: string
          content?: string
          context_type?: string
          created_at?: string | null
          evidence_id?: string
          id?: string
          is_resolved?: boolean | null
          mentions?: string[] | null
          parent_id?: string | null
          requires_action?: boolean | null
          resolved_by_name?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_comments_evidence_id_fkey"
            columns: ["evidence_id"]
            isOneToOne: false
            referencedRelation: "portfolio_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portfolio_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "portfolio_comments"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_items: {
        Row: {
          assessment_criteria_met: string[] | null
          awarding_body_standards: string[] | null
          category: string
          created_at: string
          date_completed: string | null
          description: string | null
          evidence_count: number | null
          file_type: string | null
          file_url: string | null
          grade: string | null
          id: string
          learning_outcomes_met: string[] | null
          qualification_category_id: string | null
          reflection_notes: string | null
          self_assessment: number | null
          skills_demonstrated: string[] | null
          status: string | null
          storage_urls: Json | null
          supervisor_feedback: string | null
          tags: string[] | null
          time_spent: number | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assessment_criteria_met?: string[] | null
          awarding_body_standards?: string[] | null
          category: string
          created_at?: string
          date_completed?: string | null
          description?: string | null
          evidence_count?: number | null
          file_type?: string | null
          file_url?: string | null
          grade?: string | null
          id?: string
          learning_outcomes_met?: string[] | null
          qualification_category_id?: string | null
          reflection_notes?: string | null
          self_assessment?: number | null
          skills_demonstrated?: string[] | null
          status?: string | null
          storage_urls?: Json | null
          supervisor_feedback?: string | null
          tags?: string[] | null
          time_spent?: number | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assessment_criteria_met?: string[] | null
          awarding_body_standards?: string[] | null
          category?: string
          created_at?: string
          date_completed?: string | null
          description?: string | null
          evidence_count?: number | null
          file_type?: string | null
          file_url?: string | null
          grade?: string | null
          id?: string
          learning_outcomes_met?: string[] | null
          qualification_category_id?: string | null
          reflection_notes?: string | null
          self_assessment?: number | null
          skills_demonstrated?: string[] | null
          status?: string | null
          storage_urls?: Json | null
          supervisor_feedback?: string | null
          tags?: string[] | null
          time_spent?: number | null
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
      portfolio_shares: {
        Row: {
          created_at: string | null
          description: string | null
          entry_ids: string[] | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          last_viewed_at: string | null
          permissions: string[] | null
          portfolio_item_id: string | null
          recipient_email: string | null
          recipient_type: string | null
          share_type: string
          title: string | null
          token: string
          updated_at: string | null
          user_id: string
          view_count: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          entry_ids?: string[] | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          last_viewed_at?: string | null
          permissions?: string[] | null
          portfolio_item_id?: string | null
          recipient_email?: string | null
          recipient_type?: string | null
          share_type?: string
          title?: string | null
          token: string
          updated_at?: string | null
          user_id: string
          view_count?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          entry_ids?: string[] | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          last_viewed_at?: string | null
          permissions?: string[] | null
          portfolio_item_id?: string | null
          recipient_email?: string | null
          recipient_type?: string | null
          share_type?: string
          title?: string | null
          token?: string
          updated_at?: string | null
          user_id?: string
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_shares_portfolio_item_id_fkey"
            columns: ["portfolio_item_id"]
            isOneToOne: false
            referencedRelation: "portfolio_items"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_signatures: {
        Row: {
          declaration_text: string | null
          id: string
          ip_address: unknown
          portfolio_item_id: string | null
          signature_image: string | null
          signature_text: string | null
          signature_type: string
          signed_at: string | null
          signer_id: string
          signer_role: string
          submission_id: string | null
          user_agent: string | null
        }
        Insert: {
          declaration_text?: string | null
          id?: string
          ip_address?: unknown
          portfolio_item_id?: string | null
          signature_image?: string | null
          signature_text?: string | null
          signature_type: string
          signed_at?: string | null
          signer_id: string
          signer_role: string
          submission_id?: string | null
          user_agent?: string | null
        }
        Update: {
          declaration_text?: string | null
          id?: string
          ip_address?: unknown
          portfolio_item_id?: string | null
          signature_image?: string | null
          signature_text?: string | null
          signature_type?: string
          signed_at?: string | null
          signer_id?: string
          signer_role?: string
          submission_id?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_signatures_portfolio_item_id_fkey"
            columns: ["portfolio_item_id"]
            isOneToOne: false
            referencedRelation: "portfolio_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portfolio_signatures_signer_id_fkey"
            columns: ["signer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portfolio_signatures_signer_id_fkey"
            columns: ["signer_id"]
            isOneToOne: false
            referencedRelation: "v_assessor_workload"
            referencedColumns: ["assessor_id"]
          },
          {
            foreignKeyName: "portfolio_signatures_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "portfolio_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_submissions: {
        Row: {
          assessor_feedback: string | null
          assessor_id: string | null
          assigned_at: string | null
          category_id: string | null
          created_at: string | null
          grade: string | null
          id: string
          iqa_feedback: string | null
          iqa_outcome: string | null
          iqa_sampled: boolean | null
          iqa_sampled_at: string | null
          iqa_sampled_by: string | null
          iqa_verified_at: string | null
          iqa_verified_by: string | null
          last_feedback_at: string | null
          qualification_id: string | null
          reviewed_at: string | null
          signed_off_at: string | null
          signed_off_by: string | null
          status: string | null
          submission_count: number | null
          submission_notes: string | null
          submitted_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          assessor_feedback?: string | null
          assessor_id?: string | null
          assigned_at?: string | null
          category_id?: string | null
          created_at?: string | null
          grade?: string | null
          id?: string
          iqa_feedback?: string | null
          iqa_outcome?: string | null
          iqa_sampled?: boolean | null
          iqa_sampled_at?: string | null
          iqa_sampled_by?: string | null
          iqa_verified_at?: string | null
          iqa_verified_by?: string | null
          last_feedback_at?: string | null
          qualification_id?: string | null
          reviewed_at?: string | null
          signed_off_at?: string | null
          signed_off_by?: string | null
          status?: string | null
          submission_count?: number | null
          submission_notes?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          assessor_feedback?: string | null
          assessor_id?: string | null
          assigned_at?: string | null
          category_id?: string | null
          created_at?: string | null
          grade?: string | null
          id?: string
          iqa_feedback?: string | null
          iqa_outcome?: string | null
          iqa_sampled?: boolean | null
          iqa_sampled_at?: string | null
          iqa_sampled_by?: string | null
          iqa_verified_at?: string | null
          iqa_verified_by?: string | null
          last_feedback_at?: string | null
          qualification_id?: string | null
          reviewed_at?: string | null
          signed_off_at?: string | null
          signed_off_by?: string | null
          status?: string | null
          submission_count?: number | null
          submission_notes?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_submissions_assessor_id_fkey"
            columns: ["assessor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portfolio_submissions_assessor_id_fkey"
            columns: ["assessor_id"]
            isOneToOne: false
            referencedRelation: "v_assessor_workload"
            referencedColumns: ["assessor_id"]
          },
          {
            foreignKeyName: "portfolio_submissions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "qualification_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portfolio_submissions_iqa_sampled_by_fkey"
            columns: ["iqa_sampled_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portfolio_submissions_iqa_sampled_by_fkey"
            columns: ["iqa_sampled_by"]
            isOneToOne: false
            referencedRelation: "v_assessor_workload"
            referencedColumns: ["assessor_id"]
          },
          {
            foreignKeyName: "portfolio_submissions_iqa_verified_by_fkey"
            columns: ["iqa_verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portfolio_submissions_iqa_verified_by_fkey"
            columns: ["iqa_verified_by"]
            isOneToOne: false
            referencedRelation: "v_assessor_workload"
            referencedColumns: ["assessor_id"]
          },
          {
            foreignKeyName: "portfolio_submissions_qualification_id_fkey"
            columns: ["qualification_id"]
            isOneToOne: false
            referencedRelation: "qualifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portfolio_submissions_qualification_id_fkey"
            columns: ["qualification_id"]
            isOneToOne: false
            referencedRelation: "v_iqa_sampling_status"
            referencedColumns: ["qualification_id"]
          },
          {
            foreignKeyName: "portfolio_submissions_signed_off_by_fkey"
            columns: ["signed_off_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portfolio_submissions_signed_off_by_fkey"
            columns: ["signed_off_by"]
            isOneToOne: false
            referencedRelation: "v_assessor_workload"
            referencedColumns: ["assessor_id"]
          },
          {
            foreignKeyName: "portfolio_submissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portfolio_submissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_assessor_workload"
            referencedColumns: ["assessor_id"]
          },
        ]
      }
      practical_work: {
        Row: {
          activity_suggested: string[]
          cluster_id: string | null
          content: string
          content_hash: string | null
          content_normalized: string | null
          created_at: string | null
          embedding: string | null
          enrichment_locked_at: string | null
          enrichment_status: string | null
          id: string
          is_canonical: boolean
          metadata: Json | null
          source: string
          source_id: string
          source_table: string
          sources: Json
          topic: string | null
        }
        Insert: {
          activity_suggested?: string[]
          cluster_id?: string | null
          content: string
          content_hash?: string | null
          content_normalized?: string | null
          created_at?: string | null
          embedding?: string | null
          enrichment_locked_at?: string | null
          enrichment_status?: string | null
          id?: string
          is_canonical?: boolean
          metadata?: Json | null
          source: string
          source_id: string
          source_table: string
          sources?: Json
          topic?: string | null
        }
        Update: {
          activity_suggested?: string[]
          cluster_id?: string | null
          content?: string
          content_hash?: string | null
          content_normalized?: string | null
          created_at?: string | null
          embedding?: string | null
          enrichment_locked_at?: string | null
          enrichment_status?: string | null
          id?: string
          is_canonical?: boolean
          metadata?: Json | null
          source?: string
          source_id?: string
          source_table?: string
          sources?: Json
          topic?: string | null
        }
        Relationships: []
      }
      practical_work_cluster_members: {
        Row: {
          activity_tags: string[]
          added_at: string
          cluster_id: string
          match_method: string
          member_id: string
          similarity: number
          source_table: string
        }
        Insert: {
          activity_tags?: string[]
          added_at?: string
          cluster_id: string
          match_method: string
          member_id: string
          similarity: number
          source_table: string
        }
        Update: {
          activity_tags?: string[]
          added_at?: string
          cluster_id?: string
          match_method?: string
          member_id?: string
          similarity?: number
          source_table?: string
        }
        Relationships: [
          {
            foreignKeyName: "practical_work_cluster_members_cluster_id_fkey"
            columns: ["cluster_id"]
            isOneToOne: false
            referencedRelation: "practical_work_clusters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "practical_work_cluster_members_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "practical_work"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "practical_work_cluster_members_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "v_practical_work_canonical"
            referencedColumns: ["id"]
          },
        ]
      }
      practical_work_clusters: {
        Row: {
          canonical_id: string
          created_at: string
          id: string
          member_count: number
          metrics: Json
          overlap_flags: Json
          updated_at: string
        }
        Insert: {
          canonical_id: string
          created_at?: string
          id?: string
          member_count?: number
          metrics?: Json
          overlap_flags?: Json
          updated_at?: string
        }
        Update: {
          canonical_id?: string
          created_at?: string
          id?: string
          member_count?: number
          metrics?: Json
          overlap_flags?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "practical_work_clusters_canonical_id_fkey"
            columns: ["canonical_id"]
            isOneToOne: false
            referencedRelation: "practical_work"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "practical_work_clusters_canonical_id_fkey"
            columns: ["canonical_id"]
            isOneToOne: false
            referencedRelation: "v_practical_work_canonical"
            referencedColumns: ["id"]
          },
        ]
      }
      practical_work_intelligence: {
        Row: {
          acceptance_criteria: Json | null
          activity_types: string[]
          applies_to: string[] | null
          bs7671_regulations: string[] | null
          bs7671_zones: string[] | null
          cable_routes: string[] | null
          cable_sizes: string[] | null
          canonical_id: string | null
          cluster_id: string | null
          common_defects: string[] | null
          common_failures: Json[] | null
          common_mistakes: string[] | null
          confidence_score: number | null
          created_at: string | null
          diagnostic_tests: string[] | null
          eicr_observation_codes: string[] | null
          equipment_category: string | null
          equipment_subcategory: string | null
          facet_hash: string | null
          facet_type: string
          fixing_intervals: Json | null
          id: string
          inspection_checklist: Json[] | null
          installation_method: string | null
          keywords: string[] | null
          location_types: string[] | null
          maintenance_intervals: Json | null
          maintenance_tasks: Json[] | null
          materials_needed: Json[] | null
          other_standards: string[] | null
          power_ratings: string[] | null
          practical_work_id: string
          primary_topic: string | null
          provenance: Json
          related_topics: string[] | null
          replacement_criteria: string[] | null
          safety_requirements: Json | null
          skill_level: string | null
          source_tables: string[]
          team_size: number | null
          termination_methods: string[] | null
          test_equipment_required: string[] | null
          test_frequency: string | null
          test_procedures: Json[] | null
          tools_required: string[] | null
          troubleshooting_steps: string[] | null
          typical_duration_minutes: number | null
          updated_at: string | null
          visual_inspection_points: string[] | null
          wear_indicators: string[] | null
        }
        Insert: {
          acceptance_criteria?: Json | null
          activity_types?: string[]
          applies_to?: string[] | null
          bs7671_regulations?: string[] | null
          bs7671_zones?: string[] | null
          cable_routes?: string[] | null
          cable_sizes?: string[] | null
          canonical_id?: string | null
          cluster_id?: string | null
          common_defects?: string[] | null
          common_failures?: Json[] | null
          common_mistakes?: string[] | null
          confidence_score?: number | null
          created_at?: string | null
          diagnostic_tests?: string[] | null
          eicr_observation_codes?: string[] | null
          equipment_category?: string | null
          equipment_subcategory?: string | null
          facet_hash?: string | null
          facet_type?: string
          fixing_intervals?: Json | null
          id?: string
          inspection_checklist?: Json[] | null
          installation_method?: string | null
          keywords?: string[] | null
          location_types?: string[] | null
          maintenance_intervals?: Json | null
          maintenance_tasks?: Json[] | null
          materials_needed?: Json[] | null
          other_standards?: string[] | null
          power_ratings?: string[] | null
          practical_work_id: string
          primary_topic?: string | null
          provenance?: Json
          related_topics?: string[] | null
          replacement_criteria?: string[] | null
          safety_requirements?: Json | null
          skill_level?: string | null
          source_tables?: string[]
          team_size?: number | null
          termination_methods?: string[] | null
          test_equipment_required?: string[] | null
          test_frequency?: string | null
          test_procedures?: Json[] | null
          tools_required?: string[] | null
          troubleshooting_steps?: string[] | null
          typical_duration_minutes?: number | null
          updated_at?: string | null
          visual_inspection_points?: string[] | null
          wear_indicators?: string[] | null
        }
        Update: {
          acceptance_criteria?: Json | null
          activity_types?: string[]
          applies_to?: string[] | null
          bs7671_regulations?: string[] | null
          bs7671_zones?: string[] | null
          cable_routes?: string[] | null
          cable_sizes?: string[] | null
          canonical_id?: string | null
          cluster_id?: string | null
          common_defects?: string[] | null
          common_failures?: Json[] | null
          common_mistakes?: string[] | null
          confidence_score?: number | null
          created_at?: string | null
          diagnostic_tests?: string[] | null
          eicr_observation_codes?: string[] | null
          equipment_category?: string | null
          equipment_subcategory?: string | null
          facet_hash?: string | null
          facet_type?: string
          fixing_intervals?: Json | null
          id?: string
          inspection_checklist?: Json[] | null
          installation_method?: string | null
          keywords?: string[] | null
          location_types?: string[] | null
          maintenance_intervals?: Json | null
          maintenance_tasks?: Json[] | null
          materials_needed?: Json[] | null
          other_standards?: string[] | null
          power_ratings?: string[] | null
          practical_work_id?: string
          primary_topic?: string | null
          provenance?: Json
          related_topics?: string[] | null
          replacement_criteria?: string[] | null
          safety_requirements?: Json | null
          skill_level?: string | null
          source_tables?: string[]
          team_size?: number | null
          termination_methods?: string[] | null
          test_equipment_required?: string[] | null
          test_frequency?: string | null
          test_procedures?: Json[] | null
          tools_required?: string[] | null
          troubleshooting_steps?: string[] | null
          typical_duration_minutes?: number | null
          updated_at?: string | null
          visual_inspection_points?: string[] | null
          wear_indicators?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "practical_work_intelligence_canonical_id_fkey"
            columns: ["canonical_id"]
            isOneToOne: false
            referencedRelation: "practical_work"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "practical_work_intelligence_canonical_id_fkey"
            columns: ["canonical_id"]
            isOneToOne: false
            referencedRelation: "v_practical_work_canonical"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "practical_work_intelligence_cluster_id_fkey"
            columns: ["cluster_id"]
            isOneToOne: false
            referencedRelation: "practical_work_clusters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "practical_work_intelligence_practical_work_id_fkey"
            columns: ["practical_work_id"]
            isOneToOne: false
            referencedRelation: "practical_work"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "practical_work_intelligence_practical_work_id_fkey"
            columns: ["practical_work_id"]
            isOneToOne: false
            referencedRelation: "v_practical_work_canonical"
            referencedColumns: ["id"]
          },
        ]
      }
      practical_work_intelligence_archive: {
        Row: {
          activity_types: string[] | null
          archived_at: string | null
          confidence_score: number | null
          equipment_category: string | null
          equipment_subcategory: string | null
          facet_hash: string
          full_data: Json | null
          id: string
          original_created_at: string | null
          practical_work_id: string | null
          rank_at_archive: number | null
        }
        Insert: {
          activity_types?: string[] | null
          archived_at?: string | null
          confidence_score?: number | null
          equipment_category?: string | null
          equipment_subcategory?: string | null
          facet_hash: string
          full_data?: Json | null
          id: string
          original_created_at?: string | null
          practical_work_id?: string | null
          rank_at_archive?: number | null
        }
        Update: {
          activity_types?: string[] | null
          archived_at?: string | null
          confidence_score?: number | null
          equipment_category?: string | null
          equipment_subcategory?: string | null
          facet_hash?: string
          full_data?: Json | null
          id?: string
          original_created_at?: string | null
          practical_work_id?: string | null
          rank_at_archive?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "practical_work_intelligence_archive_practical_work_id_fkey"
            columns: ["practical_work_id"]
            isOneToOne: false
            referencedRelation: "practical_work"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "practical_work_intelligence_archive_practical_work_id_fkey"
            columns: ["practical_work_id"]
            isOneToOne: false
            referencedRelation: "v_practical_work_canonical"
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
      pricing_intelligence: {
        Row: {
          bs_standards_compliance: string[] | null
          bulk_discount_available: boolean | null
          bulk_discount_threshold: number | null
          common_failure_modes: string[] | null
          compatibility_notes: string | null
          confidence_score: number | null
          created_at: string | null
          enrichment_version: string | null
          id: string
          installation_complexity: string | null
          installation_time_estimate_mins: number | null
          maintenance_requirements: string | null
          pricing_id: string | null
          product_category: string
          product_subcategory: string | null
          quality_rating: string | null
          regional_availability: string[] | null
          required_for_compliance: string[] | null
          source_hash: string | null
          typical_lead_time_days: number | null
          typical_use_cases: string[] | null
          updated_at: string | null
        }
        Insert: {
          bs_standards_compliance?: string[] | null
          bulk_discount_available?: boolean | null
          bulk_discount_threshold?: number | null
          common_failure_modes?: string[] | null
          compatibility_notes?: string | null
          confidence_score?: number | null
          created_at?: string | null
          enrichment_version?: string | null
          id?: string
          installation_complexity?: string | null
          installation_time_estimate_mins?: number | null
          maintenance_requirements?: string | null
          pricing_id?: string | null
          product_category: string
          product_subcategory?: string | null
          quality_rating?: string | null
          regional_availability?: string[] | null
          required_for_compliance?: string[] | null
          source_hash?: string | null
          typical_lead_time_days?: number | null
          typical_use_cases?: string[] | null
          updated_at?: string | null
        }
        Update: {
          bs_standards_compliance?: string[] | null
          bulk_discount_available?: boolean | null
          bulk_discount_threshold?: number | null
          common_failure_modes?: string[] | null
          compatibility_notes?: string | null
          confidence_score?: number | null
          created_at?: string | null
          enrichment_version?: string | null
          id?: string
          installation_complexity?: string | null
          installation_time_estimate_mins?: number | null
          maintenance_requirements?: string | null
          pricing_id?: string | null
          product_category?: string
          product_subcategory?: string | null
          quality_rating?: string | null
          regional_availability?: string[] | null
          required_for_compliance?: string[] | null
          source_hash?: string | null
          typical_lead_time_days?: number | null
          typical_use_cases?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pricing_intelligence_pricing_id_fkey"
            columns: ["pricing_id"]
            isOneToOne: true
            referencedRelation: "pricing_embeddings"
            referencedColumns: ["id"]
          },
        ]
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
          assessor_qualifications: string[] | null
          avatar_url: string | null
          college_id: string | null
          college_role: string | null
          created_at: string | null
          ecs_card_type: string | null
          elec_id_enabled: boolean | null
          elec_id_number: string | null
          full_name: string | null
          id: string
          iqa_qualifications: string[] | null
          is_assessor: boolean | null
          is_iqa: boolean | null
          onboarding_completed: boolean | null
          role: string | null
          subscribed: boolean | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          assessor_qualifications?: string[] | null
          avatar_url?: string | null
          college_id?: string | null
          college_role?: string | null
          created_at?: string | null
          ecs_card_type?: string | null
          elec_id_enabled?: boolean | null
          elec_id_number?: string | null
          full_name?: string | null
          id: string
          iqa_qualifications?: string[] | null
          is_assessor?: boolean | null
          is_iqa?: boolean | null
          onboarding_completed?: boolean | null
          role?: string | null
          subscribed?: boolean | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          assessor_qualifications?: string[] | null
          avatar_url?: string | null
          college_id?: string | null
          college_role?: string | null
          created_at?: string | null
          ecs_card_type?: string | null
          elec_id_enabled?: boolean | null
          elec_id_number?: string | null
          full_name?: string | null
          id?: string
          iqa_qualifications?: string[] | null
          is_assessor?: boolean | null
          is_iqa?: boolean | null
          onboarding_completed?: boolean | null
          role?: string | null
          subscribed?: boolean | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_profiles_college"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "colleges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_profiles_college"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "v_iqa_sampling_status"
            referencedColumns: ["college_id"]
          },
          {
            foreignKeyName: "fk_profiles_college"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "v_portfolio_stats_by_college"
            referencedColumns: ["college_id"]
          },
        ]
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
      project_templates: {
        Row: {
          confidence_score: number | null
          created_at: string | null
          deliverables: Json | null
          description: string | null
          difficulty: string | null
          enrichment_version: string | null
          icon_name: string | null
          id: string
          phases: Json
          regulations_cited: string[] | null
          required_documents: string[] | null
          risk_factors: Json | null
          source_hash: string | null
          source_id: string | null
          tags: string[] | null
          team_roles: string[] | null
          template_type: string
          title: string
          typical_duration_days: number | null
          updated_at: string | null
          usage_count: number | null
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string | null
          deliverables?: Json | null
          description?: string | null
          difficulty?: string | null
          enrichment_version?: string | null
          icon_name?: string | null
          id?: string
          phases?: Json
          regulations_cited?: string[] | null
          required_documents?: string[] | null
          risk_factors?: Json | null
          source_hash?: string | null
          source_id?: string | null
          tags?: string[] | null
          team_roles?: string[] | null
          template_type: string
          title: string
          typical_duration_days?: number | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Update: {
          confidence_score?: number | null
          created_at?: string | null
          deliverables?: Json | null
          description?: string | null
          difficulty?: string | null
          enrichment_version?: string | null
          icon_name?: string | null
          id?: string
          phases?: Json
          regulations_cited?: string[] | null
          required_documents?: string[] | null
          risk_factors?: Json | null
          source_hash?: string | null
          source_id?: string | null
          tags?: string[] | null
          team_roles?: string[] | null
          template_type?: string
          title?: string
          typical_duration_days?: number | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "project_templates_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "project_mgmt_knowledge"
            referencedColumns: ["id"]
          },
        ]
      }
      push_subscriptions: {
        Row: {
          browser: string | null
          created_at: string | null
          device_type: string | null
          endpoint: string
          id: string
          is_active: boolean | null
          keys: Json
          updated_at: string | null
          user_id: string
        }
        Insert: {
          browser?: string | null
          created_at?: string | null
          device_type?: string | null
          endpoint: string
          id?: string
          is_active?: boolean | null
          keys: Json
          updated_at?: string | null
          user_id: string
        }
        Update: {
          browser?: string | null
          created_at?: string | null
          device_type?: string | null
          endpoint?: string
          id?: string
          is_active?: boolean | null
          keys?: Json
          updated_at?: string | null
          user_id?: string
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
          {
            foreignKeyName: "qualification_categories_qualification_id_fkey"
            columns: ["qualification_id"]
            isOneToOne: false
            referencedRelation: "v_iqa_sampling_status"
            referencedColumns: ["qualification_id"]
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
          {
            foreignKeyName: "qualification_compliance_qualification_id_fkey"
            columns: ["qualification_id"]
            isOneToOne: false
            referencedRelation: "v_iqa_sampling_status"
            referencedColumns: ["qualification_id"]
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
      query_cache: {
        Row: {
          citations: Json
          enrichment: Json
          hit_count: number | null
          query_hash: string
          regulations: Json
          rendering: Json
          response: string
          structured_data: Json
          timestamp: number
        }
        Insert: {
          citations: Json
          enrichment: Json
          hit_count?: number | null
          query_hash: string
          regulations: Json
          rendering: Json
          response: string
          structured_data: Json
          timestamp: number
        }
        Update: {
          citations?: Json
          enrichment?: Json
          hit_count?: number | null
          query_hash?: string
          regulations?: Json
          rendering?: Json
          response?: string
          structured_data?: Json
          timestamp?: number
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
          deleted_at: string | null
          docusign_envelope_id: string | null
          docusign_status: string | null
          expiry_date: string
          id: string
          invoice_date: string | null
          invoice_due_date: string | null
          invoice_notes: string | null
          invoice_number: string | null
          invoice_paid_at: string | null
          invoice_payment_method: string | null
          invoice_payment_reference: string | null
          invoice_raised: boolean | null
          invoice_sent_at: string | null
          invoice_status: string | null
          items: Json
          job_details: Json | null
          last_reminder_sent_at: string | null
          notes: string | null
          overhead: number
          partial_payments: Json | null
          payment_proof_urls: string[] | null
          pdf_document_id: string | null
          pdf_generated_at: string | null
          pdf_url: string | null
          pdf_version: number | null
          profit: number
          public_token: string | null
          quote_number: string
          reminder_count: number | null
          settings: Json
          signature_url: string | null
          status: string
          subtotal: number
          tags: string[] | null
          total: number
          total_paid: number | null
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
          deleted_at?: string | null
          docusign_envelope_id?: string | null
          docusign_status?: string | null
          expiry_date: string
          id?: string
          invoice_date?: string | null
          invoice_due_date?: string | null
          invoice_notes?: string | null
          invoice_number?: string | null
          invoice_paid_at?: string | null
          invoice_payment_method?: string | null
          invoice_payment_reference?: string | null
          invoice_raised?: boolean | null
          invoice_sent_at?: string | null
          invoice_status?: string | null
          items?: Json
          job_details?: Json | null
          last_reminder_sent_at?: string | null
          notes?: string | null
          overhead?: number
          partial_payments?: Json | null
          payment_proof_urls?: string[] | null
          pdf_document_id?: string | null
          pdf_generated_at?: string | null
          pdf_url?: string | null
          pdf_version?: number | null
          profit?: number
          public_token?: string | null
          quote_number: string
          reminder_count?: number | null
          settings: Json
          signature_url?: string | null
          status?: string
          subtotal?: number
          tags?: string[] | null
          total?: number
          total_paid?: number | null
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
          deleted_at?: string | null
          docusign_envelope_id?: string | null
          docusign_status?: string | null
          expiry_date?: string
          id?: string
          invoice_date?: string | null
          invoice_due_date?: string | null
          invoice_notes?: string | null
          invoice_number?: string | null
          invoice_paid_at?: string | null
          invoice_payment_method?: string | null
          invoice_payment_reference?: string | null
          invoice_raised?: boolean | null
          invoice_sent_at?: string | null
          invoice_status?: string | null
          items?: Json
          job_details?: Json | null
          last_reminder_sent_at?: string | null
          notes?: string | null
          overhead?: number
          partial_payments?: Json | null
          payment_proof_urls?: string[] | null
          pdf_document_id?: string | null
          pdf_generated_at?: string | null
          pdf_url?: string | null
          pdf_version?: number | null
          profit?: number
          public_token?: string | null
          quote_number?: string
          reminder_count?: number | null
          settings?: Json
          signature_url?: string | null
          status?: string
          subtotal?: number
          tags?: string[] | null
          total?: number
          total_paid?: number | null
          updated_at?: string
          user_id?: string
          vat_amount?: number
          work_completion_date?: string | null
        }
        Relationships: []
      }
      rag_cache: {
        Row: {
          agent_name: string
          cache_confidence: number | null
          cache_hits: number | null
          created_at: string | null
          expires_at: string | null
          hit_count: number | null
          query_hash: string
          query_text: string
          results: Json
        }
        Insert: {
          agent_name: string
          cache_confidence?: number | null
          cache_hits?: number | null
          created_at?: string | null
          expires_at?: string | null
          hit_count?: number | null
          query_hash: string
          query_text: string
          results: Json
        }
        Update: {
          agent_name?: string
          cache_confidence?: number | null
          cache_hits?: number | null
          created_at?: string | null
          expires_at?: string | null
          hit_count?: number | null
          query_hash?: string
          query_text?: string
          results?: Json
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
          ppe_details: Json | null
          project_name: string
          required_ppe: string[] | null
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
          ppe_details?: Json | null
          project_name: string
          required_ppe?: string[] | null
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
          ppe_details?: Json | null
          project_name?: string
          required_ppe?: string[] | null
          risks?: Json
          status?: string
          supervisor?: string | null
          updated_at?: string
          user_id?: string
          version?: number
        }
        Relationships: []
      }
      rams_generation_jobs: {
        Row: {
          cache_hit: boolean | null
          completed_at: string | null
          created_at: string
          current_step: string | null
          error_message: string | null
          generation_metadata: Json | null
          hs_agent_progress: number | null
          hs_agent_status: string | null
          id: string
          installer_agent_progress: number | null
          installer_agent_status: string | null
          job_description: string
          job_scale: string
          method_data: Json | null
          progress: number | null
          project_info: Json
          rams_data: Json | null
          raw_hs_response: Json | null
          raw_installer_response: Json | null
          retry_count: number | null
          started_at: string | null
          status: string
          user_id: string
        }
        Insert: {
          cache_hit?: boolean | null
          completed_at?: string | null
          created_at?: string
          current_step?: string | null
          error_message?: string | null
          generation_metadata?: Json | null
          hs_agent_progress?: number | null
          hs_agent_status?: string | null
          id?: string
          installer_agent_progress?: number | null
          installer_agent_status?: string | null
          job_description: string
          job_scale: string
          method_data?: Json | null
          progress?: number | null
          project_info: Json
          rams_data?: Json | null
          raw_hs_response?: Json | null
          raw_installer_response?: Json | null
          retry_count?: number | null
          started_at?: string | null
          status?: string
          user_id: string
        }
        Update: {
          cache_hit?: boolean | null
          completed_at?: string | null
          created_at?: string
          current_step?: string | null
          error_message?: string | null
          generation_metadata?: Json | null
          hs_agent_progress?: number | null
          hs_agent_status?: string | null
          id?: string
          installer_agent_progress?: number | null
          installer_agent_status?: string | null
          job_description?: string
          job_scale?: string
          method_data?: Json | null
          progress?: number | null
          project_info?: Json
          rams_data?: Json | null
          raw_hs_response?: Json | null
          raw_installer_response?: Json | null
          retry_count?: number | null
          started_at?: string | null
          status?: string
          user_id?: string
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
      rams_partial_cache: {
        Row: {
          agent_output: Json
          agent_type: string
          created_at: string | null
          expires_at: string
          hit_count: number | null
          id: string
          job_description_embedding: string | null
          job_scale: string
          last_used_at: string | null
          work_type: string
        }
        Insert: {
          agent_output: Json
          agent_type: string
          created_at?: string | null
          expires_at: string
          hit_count?: number | null
          id?: string
          job_description_embedding?: string | null
          job_scale: string
          last_used_at?: string | null
          work_type: string
        }
        Update: {
          agent_output?: Json
          agent_type?: string
          created_at?: string | null
          expires_at?: string
          hit_count?: number | null
          id?: string
          job_description_embedding?: string | null
          job_scale?: string
          last_used_at?: string | null
          work_type?: string
        }
        Relationships: []
      }
      rams_rag_cache: {
        Row: {
          cache_key: string
          created_at: string | null
          expires_at: string
          hit_count: number | null
          id: string
          knowledge_base_type: string
          last_used_at: string | null
          query_text: string
          rag_results: Json
        }
        Insert: {
          cache_key: string
          created_at?: string | null
          expires_at: string
          hit_count?: number | null
          id?: string
          knowledge_base_type: string
          last_used_at?: string | null
          query_text: string
          rag_results: Json
        }
        Update: {
          cache_key?: string
          created_at?: string | null
          expires_at?: string
          hit_count?: number | null
          id?: string
          knowledge_base_type?: string
          last_used_at?: string | null
          query_text?: string
          rag_results?: Json
        }
        Relationships: []
      }
      rams_semantic_cache: {
        Row: {
          created_at: string | null
          expires_at: string | null
          hit_count: number | null
          id: string
          job_description_embedding: string
          job_scale: string
          last_used_at: string | null
          method_data: Json
          rams_data: Json
          work_type: string
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          hit_count?: number | null
          id?: string
          job_description_embedding: string
          job_scale: string
          last_used_at?: string | null
          method_data: Json
          rams_data: Json
          work_type: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          hit_count?: number | null
          id?: string
          job_description_embedding?: string
          job_scale?: string
          last_used_at?: string | null
          method_data?: Json
          rams_data?: Json
          work_type?: string
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
      regulation_hazards_extracted: {
        Row: {
          applies_to_equipment: string[] | null
          applies_to_installation_phases: string[] | null
          applies_to_locations: string[] | null
          applies_to_work_types: string[] | null
          confidence_score: number | null
          control_hierarchy: string | null
          control_measures: string[]
          created_at: string | null
          embedding: string | null
          hazard_category: string
          hazard_description: string
          id: string
          last_used: string | null
          likelihood: number
          regulation_excerpt: string | null
          regulation_id: string | null
          regulation_number: string
          regulation_section: string
          required_ppe: Json | null
          risk_score: number | null
          severity: number
          updated_at: string | null
          usage_count: number | null
        }
        Insert: {
          applies_to_equipment?: string[] | null
          applies_to_installation_phases?: string[] | null
          applies_to_locations?: string[] | null
          applies_to_work_types?: string[] | null
          confidence_score?: number | null
          control_hierarchy?: string | null
          control_measures?: string[]
          created_at?: string | null
          embedding?: string | null
          hazard_category: string
          hazard_description: string
          id?: string
          last_used?: string | null
          likelihood: number
          regulation_excerpt?: string | null
          regulation_id?: string | null
          regulation_number: string
          regulation_section: string
          required_ppe?: Json | null
          risk_score?: number | null
          severity: number
          updated_at?: string | null
          usage_count?: number | null
        }
        Update: {
          applies_to_equipment?: string[] | null
          applies_to_installation_phases?: string[] | null
          applies_to_locations?: string[] | null
          applies_to_work_types?: string[] | null
          confidence_score?: number | null
          control_hierarchy?: string | null
          control_measures?: string[]
          created_at?: string | null
          embedding?: string | null
          hazard_category?: string
          hazard_description?: string
          id?: string
          last_used?: string | null
          likelihood?: number
          regulation_excerpt?: string | null
          regulation_id?: string | null
          regulation_number?: string
          regulation_section?: string
          required_ppe?: Json | null
          risk_score?: number | null
          severity?: number
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "regulation_hazards_extracted_regulation_id_fkey"
            columns: ["regulation_id"]
            isOneToOne: false
            referencedRelation: "regulations_intelligence"
            referencedColumns: ["id"]
          },
        ]
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
      regulations_intelligence: {
        Row: {
          applies_to: string[] | null
          category: string
          confidence_score: number | null
          created_at: string | null
          enrichment_version: string | null
          facet_hash: string | null
          id: string
          keywords: string[]
          primary_topic: string
          regulation_id: string | null
          regulation_number: string
          regulation_type: string | null
          related_regulations: string[] | null
          secondary_topics: string[] | null
          source_hash: string | null
          subcategory: string | null
          technical_level: number | null
          updated_at: string | null
        }
        Insert: {
          applies_to?: string[] | null
          category: string
          confidence_score?: number | null
          created_at?: string | null
          enrichment_version?: string | null
          facet_hash?: string | null
          id?: string
          keywords?: string[]
          primary_topic: string
          regulation_id?: string | null
          regulation_number: string
          regulation_type?: string | null
          related_regulations?: string[] | null
          secondary_topics?: string[] | null
          source_hash?: string | null
          subcategory?: string | null
          technical_level?: number | null
          updated_at?: string | null
        }
        Update: {
          applies_to?: string[] | null
          category?: string
          confidence_score?: number | null
          created_at?: string | null
          enrichment_version?: string | null
          facet_hash?: string | null
          id?: string
          keywords?: string[]
          primary_topic?: string
          regulation_id?: string | null
          regulation_number?: string
          regulation_type?: string | null
          related_regulations?: string[] | null
          secondary_topics?: string[] | null
          source_hash?: string | null
          subcategory?: string | null
          technical_level?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "regulations_intelligence_regulation_id_fkey"
            columns: ["regulation_id"]
            isOneToOne: false
            referencedRelation: "bs7671_embeddings"
            referencedColumns: ["id"]
          },
        ]
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
          ip_address: unknown
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          content_id: string
          content_type: string
          created_at?: string | null
          id?: string
          ip_address?: unknown
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          content_id?: string
          content_type?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      safety_equipment: {
        Row: {
          assigned_to: string | null
          calibration_due: string | null
          calibration_interval_days: number | null
          category: string
          condition_notes: string | null
          created_at: string | null
          id: string
          inspection_interval_days: number | null
          last_calibration: string | null
          last_inspection: string | null
          location: string
          name: string
          next_inspection: string | null
          photos: string[] | null
          purchase_date: string | null
          purchase_price: number | null
          qr_code: string | null
          requires_calibration: boolean | null
          serial_number: string | null
          status: string
          updated_at: string | null
          user_id: string
          warranty_expiry: string | null
        }
        Insert: {
          assigned_to?: string | null
          calibration_due?: string | null
          calibration_interval_days?: number | null
          category: string
          condition_notes?: string | null
          created_at?: string | null
          id?: string
          inspection_interval_days?: number | null
          last_calibration?: string | null
          last_inspection?: string | null
          location: string
          name: string
          next_inspection?: string | null
          photos?: string[] | null
          purchase_date?: string | null
          purchase_price?: number | null
          qr_code?: string | null
          requires_calibration?: boolean | null
          serial_number?: string | null
          status?: string
          updated_at?: string | null
          user_id: string
          warranty_expiry?: string | null
        }
        Update: {
          assigned_to?: string | null
          calibration_due?: string | null
          calibration_interval_days?: number | null
          category?: string
          condition_notes?: string | null
          created_at?: string | null
          id?: string
          inspection_interval_days?: number | null
          last_calibration?: string | null
          last_inspection?: string | null
          location?: string
          name?: string
          next_inspection?: string | null
          photos?: string[] | null
          purchase_date?: string | null
          purchase_price?: number | null
          qr_code?: string | null
          requires_calibration?: boolean | null
          serial_number?: string | null
          status?: string
          updated_at?: string | null
          user_id?: string
          warranty_expiry?: string | null
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
          ip_address: unknown
          record_id: string | null
          table_name: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          ip_address?: unknown
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown
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
          ai_quality_score: number | null
          attendee_signatures: Json | null
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
          dynamic_fields: Json | null
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
          presentation_ended_at: string | null
          presentation_started_at: string | null
          risk_level: string | null
          safety_points: string[] | null
          safety_warning: string | null
          special_considerations: string | null
          started_at: string | null
          status: string | null
          team_size: number | null
          template_id: string
          template_used_id: string | null
          updated_at: string
          user_edits_count: number | null
          user_id: string
          work_scope: string | null
        }
        Insert: {
          ai_generated?: boolean | null
          ai_prompt_data?: Json | null
          ai_quality_score?: number | null
          attendee_signatures?: Json | null
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
          dynamic_fields?: Json | null
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
          presentation_ended_at?: string | null
          presentation_started_at?: string | null
          risk_level?: string | null
          safety_points?: string[] | null
          safety_warning?: string | null
          special_considerations?: string | null
          started_at?: string | null
          status?: string | null
          team_size?: number | null
          template_id: string
          template_used_id?: string | null
          updated_at?: string
          user_edits_count?: number | null
          user_id: string
          work_scope?: string | null
        }
        Update: {
          ai_generated?: boolean | null
          ai_prompt_data?: Json | null
          ai_quality_score?: number | null
          attendee_signatures?: Json | null
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
          dynamic_fields?: Json | null
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
          presentation_ended_at?: string | null
          presentation_started_at?: string | null
          risk_level?: string | null
          safety_points?: string[] | null
          safety_warning?: string | null
          special_considerations?: string | null
          started_at?: string | null
          status?: string | null
          team_size?: number | null
          template_id?: string
          template_used_id?: string | null
          updated_at?: string
          user_edits_count?: number | null
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
          {
            foreignKeyName: "team_briefings_template_used_id_fkey"
            columns: ["template_used_id"]
            isOneToOne: false
            referencedRelation: "briefing_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      team_channel_members: {
        Row: {
          channel_id: string | null
          id: string
          joined_at: string | null
          last_read_at: string | null
          notifications_enabled: boolean | null
          role: string | null
          user_id: string | null
        }
        Insert: {
          channel_id?: string | null
          id?: string
          joined_at?: string | null
          last_read_at?: string | null
          notifications_enabled?: boolean | null
          role?: string | null
          user_id?: string | null
        }
        Update: {
          channel_id?: string | null
          id?: string
          joined_at?: string | null
          last_read_at?: string | null
          notifications_enabled?: boolean | null
          role?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_channel_members_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "team_channels"
            referencedColumns: ["id"]
          },
        ]
      }
      team_channel_messages: {
        Row: {
          channel_id: string | null
          content: string
          created_at: string | null
          edited_at: string | null
          id: string
          is_pinned: boolean | null
          message_type: string | null
          metadata: Json | null
          reply_to_id: string | null
          sender_id: string | null
          sent_at: string | null
        }
        Insert: {
          channel_id?: string | null
          content: string
          created_at?: string | null
          edited_at?: string | null
          id?: string
          is_pinned?: boolean | null
          message_type?: string | null
          metadata?: Json | null
          reply_to_id?: string | null
          sender_id?: string | null
          sent_at?: string | null
        }
        Update: {
          channel_id?: string | null
          content?: string
          created_at?: string | null
          edited_at?: string | null
          id?: string
          is_pinned?: boolean | null
          message_type?: string | null
          metadata?: Json | null
          reply_to_id?: string | null
          sender_id?: string | null
          sent_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_channel_messages_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "team_channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_channel_messages_reply_to_id_fkey"
            columns: ["reply_to_id"]
            isOneToOne: false
            referencedRelation: "team_channel_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      team_channels: {
        Row: {
          channel_type: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          employer_id: string
          id: string
          is_private: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          channel_type?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          employer_id: string
          id?: string
          is_private?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          channel_type?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          employer_id?: string
          id?: string
          is_private?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      team_direct_messages: {
        Row: {
          created_at: string | null
          employer_id: string
          id: string
          last_message_at: string | null
          last_message_preview: string | null
          participant_1_id: string
          participant_2_id: string
          unread_1: number | null
          unread_2: number | null
          updated_at: string | null
          user_1_id: string | null
          user_2_id: string | null
        }
        Insert: {
          created_at?: string | null
          employer_id: string
          id?: string
          last_message_at?: string | null
          last_message_preview?: string | null
          participant_1_id: string
          participant_2_id: string
          unread_1?: number | null
          unread_2?: number | null
          updated_at?: string | null
          user_1_id?: string | null
          user_2_id?: string | null
        }
        Update: {
          created_at?: string | null
          employer_id?: string
          id?: string
          last_message_at?: string | null
          last_message_preview?: string | null
          participant_1_id?: string
          participant_2_id?: string
          unread_1?: number | null
          unread_2?: number | null
          updated_at?: string | null
          user_1_id?: string | null
          user_2_id?: string | null
        }
        Relationships: []
      }
      team_dm_messages: {
        Row: {
          content: string
          conversation_id: string | null
          created_at: string | null
          id: string
          message_type: string | null
          metadata: Json | null
          read_at: string | null
          sender_id: string | null
          sent_at: string | null
        }
        Insert: {
          content: string
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          message_type?: string | null
          metadata?: Json | null
          read_at?: string | null
          sender_id?: string | null
          sent_at?: string | null
        }
        Update: {
          content?: string
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          message_type?: string | null
          metadata?: Json | null
          read_at?: string | null
          sender_id?: string | null
          sent_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_dm_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "team_direct_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      tender_estimates: {
        Row: {
          confidence: string | null
          created_at: string | null
          equipment_cost: number | null
          hazards: Json | null
          id: string
          labour_cost: number | null
          labour_hours: number | null
          materials_cost: number | null
          notes: string | null
          overheads: number | null
          profit: number | null
          programme: string | null
          rams_scoped: boolean | null
          tender_id: string | null
          total_estimate: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          confidence?: string | null
          created_at?: string | null
          equipment_cost?: number | null
          hazards?: Json | null
          id?: string
          labour_cost?: number | null
          labour_hours?: number | null
          materials_cost?: number | null
          notes?: string | null
          overheads?: number | null
          profit?: number | null
          programme?: string | null
          rams_scoped?: boolean | null
          tender_id?: string | null
          total_estimate?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          confidence?: string | null
          created_at?: string | null
          equipment_cost?: number | null
          hazards?: Json | null
          id?: string
          labour_cost?: number | null
          labour_hours?: number | null
          materials_cost?: number | null
          notes?: string | null
          overheads?: number | null
          profit?: number | null
          programme?: string | null
          rams_scoped?: boolean | null
          tender_id?: string | null
          total_estimate?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tender_estimates_tender_id_fkey"
            columns: ["tender_id"]
            isOneToOne: false
            referencedRelation: "tenders"
            referencedColumns: ["id"]
          },
        ]
      }
      tenders: {
        Row: {
          category: string | null
          client: string
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          created_at: string | null
          deadline: string | null
          description: string | null
          documents: Json | null
          id: string
          notes: string | null
          result_date: string | null
          status: string | null
          submission_date: string | null
          tender_number: string | null
          title: string
          updated_at: string | null
          user_id: string | null
          value: number | null
        }
        Insert: {
          category?: string | null
          client: string
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string | null
          deadline?: string | null
          description?: string | null
          documents?: Json | null
          id?: string
          notes?: string | null
          result_date?: string | null
          status?: string | null
          submission_date?: string | null
          tender_number?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
          value?: number | null
        }
        Update: {
          category?: string | null
          client?: string
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string | null
          deadline?: string | null
          description?: string | null
          documents?: Json | null
          id?: string
          notes?: string | null
          result_date?: string | null
          status?: string | null
          submission_date?: string | null
          tender_number?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
          value?: number | null
        }
        Relationships: []
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
      tool_usage_analytics: {
        Row: {
          duration_seconds: number | null
          feature_used: string | null
          id: string
          metadata: Json | null
          session_end: string | null
          session_start: string | null
          tool_id: string
          user_id: string
        }
        Insert: {
          duration_seconds?: number | null
          feature_used?: string | null
          id?: string
          metadata?: Json | null
          session_end?: string | null
          session_start?: string | null
          tool_id: string
          user_id: string
        }
        Update: {
          duration_seconds?: number | null
          feature_used?: string | null
          id?: string
          metadata?: Json | null
          session_end?: string | null
          session_start?: string | null
          tool_id?: string
          user_id?: string
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
      tutor_knowledge: {
        Row: {
          content: string
          created_at: string | null
          embedding: string | null
          exam_relevance: string | null
          id: string
          metadata: Json | null
          qualification_level: string | null
          search_vector: unknown
          source: string
          subject_area: string | null
          topic: string
        }
        Insert: {
          content: string
          created_at?: string | null
          embedding?: string | null
          exam_relevance?: string | null
          id?: string
          metadata?: Json | null
          qualification_level?: string | null
          search_vector?: unknown
          source: string
          subject_area?: string | null
          topic: string
        }
        Update: {
          content?: string
          created_at?: string | null
          embedding?: string | null
          exam_relevance?: string | null
          id?: string
          metadata?: Json | null
          qualification_level?: string | null
          search_vector?: unknown
          source?: string
          subject_area?: string | null
          topic?: string
        }
        Relationships: []
      }
      tutor_portfolio_requirements: {
        Row: {
          category_id: string | null
          completed_at: string | null
          created_at: string
          description: string | null
          due_date: string | null
          evidence_type_codes: string[]
          guidance: string | null
          id: string
          is_mandatory: boolean | null
          quantity_required: number | null
          status: string | null
          student_id: string
          title: string
          tutor_id: string
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          evidence_type_codes: string[]
          guidance?: string | null
          id?: string
          is_mandatory?: boolean | null
          quantity_required?: number | null
          status?: string | null
          student_id: string
          title: string
          tutor_id: string
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          evidence_type_codes?: string[]
          guidance?: string | null
          id?: string
          is_mandatory?: boolean | null
          quantity_required?: number | null
          status?: string | null
          student_id?: string
          title?: string
          tutor_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tutor_portfolio_requirements_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "qualification_categories"
            referencedColumns: ["id"]
          },
        ]
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
      unit_coverage_matrix: {
        Row: {
          category_id: string
          completed_at: string | null
          completed_entries: number
          completion_percentage: number | null
          created_at: string | null
          evidence_completed_at: string | null
          evidenced_criteria: number
          id: string
          last_updated: string | null
          qualification_id: string
          required_entries: number
          started_at: string | null
          status: string | null
          submitted_at: string | null
          total_criteria: number
          user_id: string
          verified_criteria: number
        }
        Insert: {
          category_id: string
          completed_at?: string | null
          completed_entries?: number
          completion_percentage?: number | null
          created_at?: string | null
          evidence_completed_at?: string | null
          evidenced_criteria?: number
          id?: string
          last_updated?: string | null
          qualification_id: string
          required_entries?: number
          started_at?: string | null
          status?: string | null
          submitted_at?: string | null
          total_criteria?: number
          user_id: string
          verified_criteria?: number
        }
        Update: {
          category_id?: string
          completed_at?: string | null
          completed_entries?: number
          completion_percentage?: number | null
          created_at?: string | null
          evidence_completed_at?: string | null
          evidenced_criteria?: number
          id?: string
          last_updated?: string | null
          qualification_id?: string
          required_entries?: number
          started_at?: string | null
          status?: string | null
          submitted_at?: string | null
          total_criteria?: number
          user_id?: string
          verified_criteria?: number
        }
        Relationships: [
          {
            foreignKeyName: "unit_coverage_matrix_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "qualification_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "unit_coverage_matrix_qualification_id_fkey"
            columns: ["qualification_id"]
            isOneToOne: false
            referencedRelation: "qualifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "unit_coverage_matrix_qualification_id_fkey"
            columns: ["qualification_id"]
            isOneToOne: false
            referencedRelation: "v_iqa_sampling_status"
            referencedColumns: ["qualification_id"]
          },
          {
            foreignKeyName: "unit_coverage_matrix_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "unit_coverage_matrix_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_assessor_workload"
            referencedColumns: ["assessor_id"]
          },
        ]
      }
      unit_evidence_requirements: {
        Row: {
          assessment_criterion: string
          assessment_criterion_text: string | null
          category_id: string | null
          created_at: string
          evidence_type_codes: string[]
          example_description: string | null
          guidance: string | null
          id: string
          is_mandatory: boolean | null
          min_quantity: number | null
          quantity_required: number | null
        }
        Insert: {
          assessment_criterion: string
          assessment_criterion_text?: string | null
          category_id?: string | null
          created_at?: string
          evidence_type_codes: string[]
          example_description?: string | null
          guidance?: string | null
          id?: string
          is_mandatory?: boolean | null
          min_quantity?: number | null
          quantity_required?: number | null
        }
        Update: {
          assessment_criterion?: string
          assessment_criterion_text?: string | null
          category_id?: string | null
          created_at?: string
          evidence_type_codes?: string[]
          example_description?: string | null
          guidance?: string | null
          id?: string
          is_mandatory?: boolean | null
          min_quantity?: number | null
          quantity_required?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "unit_evidence_requirements_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "qualification_categories"
            referencedColumns: ["id"]
          },
        ]
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
      user_assessment_scores: {
        Row: {
          assessment_id: string | null
          assessment_type: string
          completed_at: string | null
          details: Json | null
          id: string
          max_score: number
          percentage: number | null
          score: number
          time_taken_seconds: number | null
          user_id: string
        }
        Insert: {
          assessment_id?: string | null
          assessment_type: string
          completed_at?: string | null
          details?: Json | null
          id?: string
          max_score: number
          percentage?: number | null
          score: number
          time_taken_seconds?: number | null
          user_id: string
        }
        Update: {
          assessment_id?: string | null
          assessment_type?: string
          completed_at?: string | null
          details?: Json | null
          id?: string
          max_score?: number
          percentage?: number | null
          score?: number
          time_taken_seconds?: number | null
          user_id?: string
        }
        Relationships: []
      }
      user_email_configs: {
        Row: {
          created_at: string | null
          daily_sent_count: number | null
          email_address: string
          email_provider: string
          encrypted_access_token: string | null
          encrypted_refresh_token: string | null
          id: string
          is_active: boolean | null
          last_sent_at: string | null
          rate_limit_reset_at: string | null
          token_expires_at: string | null
          total_sent_count: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          daily_sent_count?: number | null
          email_address: string
          email_provider: string
          encrypted_access_token?: string | null
          encrypted_refresh_token?: string | null
          id?: string
          is_active?: boolean | null
          last_sent_at?: string | null
          rate_limit_reset_at?: string | null
          token_expires_at?: string | null
          total_sent_count?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          daily_sent_count?: number | null
          email_address?: string
          email_provider?: string
          encrypted_access_token?: string | null
          encrypted_refresh_token?: string | null
          id?: string
          is_active?: boolean | null
          last_sent_at?: string | null
          rate_limit_reset_at?: string | null
          token_expires_at?: string | null
          total_sent_count?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_flashcard_progress: {
        Row: {
          card_id: string
          correct_count: number | null
          created_at: string | null
          flashcard_set_id: string
          id: string
          incorrect_count: number | null
          last_reviewed_at: string | null
          mastery_level: number | null
          next_review_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          card_id: string
          correct_count?: number | null
          created_at?: string | null
          flashcard_set_id: string
          id?: string
          incorrect_count?: number | null
          last_reviewed_at?: string | null
          mastery_level?: number | null
          next_review_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          card_id?: string
          correct_count?: number | null
          created_at?: string | null
          flashcard_set_id?: string
          id?: string
          incorrect_count?: number | null
          last_reviewed_at?: string | null
          mastery_level?: number | null
          next_review_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_ksb_progress: {
        Row: {
          created_at: string
          evidence_portfolio_ids: string[] | null
          id: string
          ksb_id: string
          notes: string | null
          status: string
          updated_at: string
          user_id: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          created_at?: string
          evidence_portfolio_ids?: string[] | null
          id?: string
          ksb_id: string
          notes?: string | null
          status?: string
          updated_at?: string
          user_id: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          created_at?: string
          evidence_portfolio_ids?: string[] | null
          id?: string
          ksb_id?: string
          notes?: string | null
          status?: string
          updated_at?: string
          user_id?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_ksb_progress_ksb_id_fkey"
            columns: ["ksb_id"]
            isOneToOne: false
            referencedRelation: "apprenticeship_ksbs"
            referencedColumns: ["id"]
          },
        ]
      }
      user_presence: {
        Row: {
          is_online: boolean | null
          last_seen: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          is_online?: boolean | null
          last_seen?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          is_online?: boolean | null
          last_seen?: string | null
          status?: string | null
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
      user_project_plans: {
        Row: {
          client_name: string | null
          created_at: string | null
          id: string
          location: string | null
          plan_data: Json
          project_name: string
          start_date: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          client_name?: string | null
          created_at?: string | null
          id?: string
          location?: string | null
          plan_data: Json
          project_name: string
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          client_name?: string | null
          created_at?: string | null
          id?: string
          location?: string | null
          plan_data?: Json
          project_name?: string
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
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
          {
            foreignKeyName: "user_qualification_selections_qualification_id_fkey"
            columns: ["qualification_id"]
            isOneToOne: false
            referencedRelation: "v_iqa_sampling_status"
            referencedColumns: ["qualification_id"]
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
      user_study_streaks: {
        Row: {
          created_at: string | null
          current_streak: number | null
          id: string
          last_study_date: string | null
          longest_streak: number | null
          total_cards_reviewed: number | null
          total_sessions: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_streak?: number | null
          id?: string
          last_study_date?: string | null
          longest_streak?: number | null
          total_cards_reviewed?: number | null
          total_sessions?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_streak?: number | null
          id?: string
          last_study_date?: string | null
          longest_streak?: number | null
          total_cards_reviewed?: number | null
          total_sessions?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      variation_orders: {
        Row: {
          approved_by: string | null
          approved_date: string | null
          created_at: string | null
          description: string
          id: string
          job_id: string | null
          notes: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
          value: number | null
        }
        Insert: {
          approved_by?: string | null
          approved_date?: string | null
          created_at?: string | null
          description: string
          id?: string
          job_id?: string | null
          notes?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
          value?: number | null
        }
        Update: {
          approved_by?: string | null
          approved_date?: string | null
          created_at?: string | null
          description?: string
          id?: string
          job_id?: string | null
          notes?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "variation_orders_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      webhook_configs: {
        Row: {
          college_id: string | null
          created_at: string | null
          events: string[]
          headers: Json | null
          id: string
          is_active: boolean | null
          name: string
          secret: string | null
          updated_at: string | null
          url: string
        }
        Insert: {
          college_id?: string | null
          created_at?: string | null
          events?: string[]
          headers?: Json | null
          id?: string
          is_active?: boolean | null
          name: string
          secret?: string | null
          updated_at?: string | null
          url: string
        }
        Update: {
          college_id?: string | null
          created_at?: string | null
          events?: string[]
          headers?: Json | null
          id?: string
          is_active?: boolean | null
          name?: string
          secret?: string | null
          updated_at?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "webhook_configs_college_id_fkey"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "colleges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "webhook_configs_college_id_fkey"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "v_iqa_sampling_status"
            referencedColumns: ["college_id"]
          },
          {
            foreignKeyName: "webhook_configs_college_id_fkey"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "v_portfolio_stats_by_college"
            referencedColumns: ["college_id"]
          },
        ]
      }
      webhook_deliveries: {
        Row: {
          created_at: string | null
          delivered_at: string | null
          event: string
          id: string
          payload: Json
          response_body: string | null
          response_status: number | null
          retry_count: number | null
          status: string | null
          webhook_id: string | null
        }
        Insert: {
          created_at?: string | null
          delivered_at?: string | null
          event: string
          id?: string
          payload: Json
          response_body?: string | null
          response_status?: number | null
          retry_count?: number | null
          status?: string | null
          webhook_id?: string | null
        }
        Update: {
          created_at?: string | null
          delivered_at?: string | null
          event?: string
          id?: string
          payload?: Json
          response_body?: string | null
          response_status?: number | null
          retry_count?: number | null
          status?: string | null
          webhook_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "webhook_deliveries_webhook_id_fkey"
            columns: ["webhook_id"]
            isOneToOne: false
            referencedRelation: "webhook_configs"
            referencedColumns: ["id"]
          },
        ]
      }
      witness_testimonies: {
        Row: {
          activity_date: string | null
          activity_description: string
          activity_location: string | null
          activity_title: string
          created_at: string | null
          duration_witnessed: string | null
          id: string
          ksbs_evidenced: string[] | null
          portfolio_item_id: string | null
          skills_demonstrated: string[] | null
          testimony_date: string
          testimony_statement: string
          updated_at: string | null
          user_id: string
          verification_method: string | null
          verification_notes: string | null
          verification_status: string | null
          verified_at: string | null
          verified_by: string | null
          witness_company: string | null
          witness_email: string | null
          witness_job_title: string | null
          witness_name: string
          witness_phone: string | null
          witness_relationship: string | null
          witness_signature: string | null
          witness_signed_at: string | null
          witness_user_id: string | null
          work_standard: string | null
        }
        Insert: {
          activity_date?: string | null
          activity_description: string
          activity_location?: string | null
          activity_title: string
          created_at?: string | null
          duration_witnessed?: string | null
          id?: string
          ksbs_evidenced?: string[] | null
          portfolio_item_id?: string | null
          skills_demonstrated?: string[] | null
          testimony_date: string
          testimony_statement: string
          updated_at?: string | null
          user_id: string
          verification_method?: string | null
          verification_notes?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
          witness_company?: string | null
          witness_email?: string | null
          witness_job_title?: string | null
          witness_name: string
          witness_phone?: string | null
          witness_relationship?: string | null
          witness_signature?: string | null
          witness_signed_at?: string | null
          witness_user_id?: string | null
          work_standard?: string | null
        }
        Update: {
          activity_date?: string | null
          activity_description?: string
          activity_location?: string | null
          activity_title?: string
          created_at?: string | null
          duration_witnessed?: string | null
          id?: string
          ksbs_evidenced?: string[] | null
          portfolio_item_id?: string | null
          skills_demonstrated?: string[] | null
          testimony_date?: string
          testimony_statement?: string
          updated_at?: string | null
          user_id?: string
          verification_method?: string | null
          verification_notes?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
          witness_company?: string | null
          witness_email?: string | null
          witness_job_title?: string | null
          witness_name?: string
          witness_phone?: string | null
          witness_relationship?: string | null
          witness_signature?: string | null
          witness_signed_at?: string | null
          witness_user_id?: string | null
          work_standard?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "witness_testimonies_portfolio_item_id_fkey"
            columns: ["portfolio_item_id"]
            isOneToOne: false
            referencedRelation: "portfolio_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "witness_testimonies_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "witness_testimonies_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_assessor_workload"
            referencedColumns: ["assessor_id"]
          },
          {
            foreignKeyName: "witness_testimonies_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "witness_testimonies_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "v_assessor_workload"
            referencedColumns: ["assessor_id"]
          },
          {
            foreignKeyName: "witness_testimonies_witness_user_id_fkey"
            columns: ["witness_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "witness_testimonies_witness_user_id_fkey"
            columns: ["witness_user_id"]
            isOneToOne: false
            referencedRelation: "v_assessor_workload"
            referencedColumns: ["assessor_id"]
          },
        ]
      }
      workplace_culture_progress: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          id: string
          module_id: string
          progress_percent: number | null
          sections_completed: string[] | null
          started_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          module_id: string
          progress_percent?: number | null
          sections_completed?: string[] | null
          started_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          module_id?: string
          progress_percent?: number | null
          sections_completed?: string[] | null
          started_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      apprentice_ksb_summary: {
        Row: {
          completed_ksbs: number | null
          completion_percentage: number | null
          in_progress_ksbs: number | null
          ksb_type: string | null
          qualification_id: string | null
          qualification_title: string | null
          total_ksbs: number | null
          user_id: string | null
          verified_ksbs: number | null
        }
        Relationships: [
          {
            foreignKeyName: "apprenticeship_ksbs_qualification_id_fkey"
            columns: ["qualification_id"]
            isOneToOne: false
            referencedRelation: "qualifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "apprenticeship_ksbs_qualification_id_fkey"
            columns: ["qualification_id"]
            isOneToOne: false
            referencedRelation: "v_iqa_sampling_status"
            referencedColumns: ["qualification_id"]
          },
        ]
      }
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
      design_knowledge_facet_compliance: {
        Row: {
          avg_facets_all_time: number | null
          avg_facets_per_source: number | null
          compliance_percentage: number | null
          sources_enriched: number | null
          total_sources_all_time: number | null
        }
        Relationships: []
      }
      hs_common_hazards: {
        Row: {
          content: string | null
          embedding: string | null
          id: string | null
          metadata: Json | null
          source: string | null
          topic: string | null
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
      practical_work_facet_compliance: {
        Row: {
          avg_facets_per_source: number | null
          compliance_percentage: number | null
          sources_enriched: number | null
          total_facets: number | null
          total_gold_sources: number | null
        }
        Relationships: []
      }
      practical_work_intelligence_top8: {
        Row: {
          acceptance_criteria: Json | null
          activity_types: string[] | null
          applies_to: string[] | null
          bs7671_regulations: string[] | null
          bs7671_zones: string[] | null
          cable_routes: string[] | null
          cable_sizes: string[] | null
          canonical_id: string | null
          cluster_id: string | null
          common_defects: string[] | null
          common_failures: Json[] | null
          common_mistakes: string[] | null
          confidence_score: number | null
          created_at: string | null
          diagnostic_tests: string[] | null
          eicr_observation_codes: string[] | null
          equipment_category: string | null
          equipment_subcategory: string | null
          facet_hash: string | null
          facet_type: string | null
          fixing_intervals: Json | null
          id: string | null
          inspection_checklist: Json[] | null
          installation_method: string | null
          keywords: string[] | null
          location_types: string[] | null
          maintenance_intervals: Json | null
          maintenance_tasks: Json[] | null
          materials_needed: Json[] | null
          other_standards: string[] | null
          power_ratings: string[] | null
          practical_work_id: string | null
          primary_topic: string | null
          provenance: Json | null
          related_topics: string[] | null
          replacement_criteria: string[] | null
          safety_requirements: Json | null
          skill_level: string | null
          source_tables: string[] | null
          team_size: number | null
          termination_methods: string[] | null
          test_equipment_required: string[] | null
          test_frequency: string | null
          test_procedures: Json[] | null
          tools_required: string[] | null
          troubleshooting_steps: string[] | null
          typical_duration_minutes: number | null
          updated_at: string | null
          visual_inspection_points: string[] | null
          wear_indicators: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "practical_work_intelligence_canonical_id_fkey"
            columns: ["canonical_id"]
            isOneToOne: false
            referencedRelation: "practical_work"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "practical_work_intelligence_canonical_id_fkey"
            columns: ["canonical_id"]
            isOneToOne: false
            referencedRelation: "v_practical_work_canonical"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "practical_work_intelligence_cluster_id_fkey"
            columns: ["cluster_id"]
            isOneToOne: false
            referencedRelation: "practical_work_clusters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "practical_work_intelligence_practical_work_id_fkey"
            columns: ["practical_work_id"]
            isOneToOne: false
            referencedRelation: "practical_work"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "practical_work_intelligence_practical_work_id_fkey"
            columns: ["practical_work_id"]
            isOneToOne: false
            referencedRelation: "v_practical_work_canonical"
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
      v_assessor_workload: {
        Row: {
          assessor_id: string | null
          assessor_name: string | null
          avg_review_hours: number | null
          college_id: string | null
          college_name: string | null
          pending_reviews: number | null
          pending_signoff: number | null
          reviewed_this_week: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_profiles_college"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "colleges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_profiles_college"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "v_iqa_sampling_status"
            referencedColumns: ["college_id"]
          },
          {
            foreignKeyName: "fk_profiles_college"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "v_portfolio_stats_by_college"
            referencedColumns: ["college_id"]
          },
        ]
      }
      v_iqa_sampling_status: {
        Row: {
          awaiting_sampling: number | null
          college_id: string | null
          college_name: string | null
          qualification_id: string | null
          qualification_title: string | null
          sampled: number | null
          sampling_rate: number | null
          verified: number | null
        }
        Relationships: []
      }
      v_lti_grade_sync_status: {
        Row: {
          college_name: string | null
          failed: number | null
          last_sync_at: string | null
          pending: number | null
          platform_id: string | null
          platform_name: string | null
          platform_type: string | null
          skipped: number | null
          synced: number | null
        }
        Relationships: []
      }
      v_portfolio_stats_by_college: {
        Row: {
          approved: number | null
          college_id: string | null
          college_name: string | null
          completion_rate: number | null
          feedback_pending: number | null
          iqa_complete: number | null
          pending_review: number | null
          signed_off: number | null
          total_students: number | null
          total_submissions: number | null
          under_review: number | null
        }
        Relationships: []
      }
      v_practical_work_canonical: {
        Row: {
          activity_suggested: string[] | null
          cluster_id: string | null
          content: string | null
          content_hash: string | null
          content_normalized: string | null
          created_at: string | null
          embedding: string | null
          id: string | null
          is_canonical: boolean | null
          member_count: number | null
          metadata: Json | null
          metrics: Json | null
          overlap_flags: Json | null
          source: string | null
          source_id: string | null
          source_table: string | null
          sources: Json | null
          topic: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      abort_duplicate_jobs: {
        Args: never
        Returns: {
          aborted_job_id: string
          created_at_result: string
          job_type_result: string
        }[]
      }
      can_access_quote_via_token: {
        Args: { q_id: string; token: string }
        Returns: boolean
      }
      cleanup_ai_cache: { Args: never; Returns: undefined }
      cleanup_cost_query_cache: { Args: never; Returns: undefined }
      cleanup_expired_cables_cache: { Args: never; Returns: undefined }
      cleanup_expired_caches: { Args: never; Returns: undefined }
      cleanup_expired_circuit_design_cache: { Args: never; Returns: undefined }
      cleanup_expired_course_cache: { Args: never; Returns: undefined }
      cleanup_expired_course_dates_cache: { Args: never; Returns: undefined }
      cleanup_expired_design_exports: { Args: never; Returns: undefined }
      cleanup_expired_education_cache: { Args: never; Returns: undefined }
      cleanup_expired_guide_cache: { Args: never; Returns: undefined }
      cleanup_expired_installation_cache: { Args: never; Returns: undefined }
      cleanup_expired_market_insights_cache: { Args: never; Returns: undefined }
      cleanup_expired_materials_weekly_cache: {
        Args: never
        Returns: undefined
      }
      cleanup_expired_oauth_states: { Args: never; Returns: undefined }
      cleanup_expired_pricing_data: { Args: never; Returns: undefined }
      cleanup_expired_rams_cache: { Args: never; Returns: undefined }
      cleanup_expired_temp_pdfs: { Args: never; Returns: undefined }
      cleanup_expired_tool_cache: { Args: never; Returns: undefined }
      cleanup_expired_tools_cache: { Args: never; Returns: undefined }
      cleanup_hs_query_cache: { Args: never; Returns: undefined }
      cleanup_rag_cache: { Args: never; Returns: undefined }
      count_fully_enriched_design_sources: {
        Args: { max_facets?: number; min_facets?: number }
        Returns: number
      }
      extract_postcode_district: {
        Args: { full_postcode: string }
        Returns: string
      }
      generate_content_hash: {
        Args: { content: string; source_url: string; title: string }
        Returns: string
      }
      generate_invoice_number: { Args: never; Returns: string }
      generate_standalone_invoice_number: { Args: never; Returns: string }
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
      get_current_user_role: { Args: never; Returns: string }
      get_facet_distribution_stats: {
        Args: never
        Returns: {
          avg_facets_per_source: number
          exactly_8: number
          max_facets: number
          min_facets: number
          over_200: number
          quality_score: number
          range_101_200: number
          range_21_50: number
          range_51_100: number
          range_9_20: number
          total_facets: number
          total_sources: number
          under_8: number
        }[]
      }
      get_next_biweekly_refresh: { Args: never; Returns: string }
      get_next_sunday_education_refresh: { Args: never; Returns: string }
      get_next_sunday_market_refresh: { Args: never; Returns: string }
      get_next_sunday_refresh: { Args: never; Returns: string }
      get_shared_portfolio: {
        Args: { share_token: string }
        Returns: {
          entry_ids: string[]
          is_valid: boolean
          owner_name: string
          share_description: string
          share_id: string
          share_title: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_cache_hit: {
        Args: { p_cache_key: string; p_last_hit_at: string }
        Returns: undefined
      }
      increment_hazard_usage: {
        Args: { hazard_id: string }
        Returns: undefined
      }
      increment_share_view: {
        Args: { share_token: string }
        Returns: undefined
      }
      is_owner_of_quote: { Args: { q_id: string }; Returns: boolean }
      match_extracted_hazards: {
        Args: {
          match_count?: number
          match_threshold?: number
          query_embedding: string
        }
        Returns: {
          applies_to_equipment: string[]
          applies_to_installation_phases: string[]
          applies_to_locations: string[]
          applies_to_work_types: string[]
          confidence_score: number
          control_hierarchy: string
          control_measures: string[]
          hazard_category: string
          hazard_description: string
          id: string
          likelihood: number
          regulation_excerpt: string
          regulation_number: string
          regulation_section: string
          required_ppe: Json
          risk_score: number
          severity: number
          similarity: number
          usage_count: number
        }[]
      }
      match_installation_method_cache: {
        Args: {
          match_count?: number
          query_embedding: string
          similarity_threshold?: number
        }
        Returns: {
          created_at: string
          hit_count: number
          id: string
          installation_method: Json
          similarity: number
        }[]
      }
      match_rams_cache: {
        Args: {
          job_scale: string
          match_count?: number
          query_embedding: string
          similarity_threshold?: number
          work_type: string
        }
        Returns: {
          hit_count: number
          id: string
          method_data: Json
          rams_data: Json
          similarity: number
        }[]
      }
      match_rams_partial_cache: {
        Args: {
          agent_type: string
          job_scale: string
          match_count?: number
          query_embedding: string
          similarity_threshold?: number
          work_type: string
        }
        Returns: {
          agent_output: Json
          created_at: string
          hit_count: number
          id: string
          similarity: number
        }[]
      }
      normalize_query_text: { Args: { query_text: string }; Returns: string }
      prune_design_knowledge_facets_to_8: {
        Args: never
        Returns: {
          avg_after: number
          avg_before: number
          facets_deleted: number
          sources_processed: number
        }[]
      }
      prune_practical_work_facets_to_8: {
        Args: never
        Returns: {
          avg_facets_after: number
          avg_facets_before: number
          facets_deleted: number
          sources_processed: number
        }[]
      }
      prune_practical_work_to_8_archive: {
        Args: never
        Returns: {
          facets_archived: number
          sources_affected: number
          total_facets_after: number
          total_facets_before: number
        }[]
      }
      queue_webhook_notification: {
        Args: { p_college_id: string; p_event: string; p_payload: Json }
        Returns: undefined
      }
      reset_stuck_batches: {
        Args: { timeout_minutes?: number }
        Returns: {
          batch_id: string
          batch_number: number
          job_id: string
          stuck_duration_minutes: number
        }[]
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
      search_bs7671_hybrid: {
        Args: {
          match_count?: number
          query_embedding: string
          query_text: string
        }
        Returns: {
          amendment: string
          content: string
          hybrid_score: number
          id: string
          metadata: Json
          regulation_number: string
          section: string
        }[]
      }
      search_bs7671_hybrid_cached: {
        Args: {
          match_count?: number
          query_embedding: string
          query_text: string
        }
        Returns: {
          amendment: string
          content: string
          hybrid_score: number
          id: string
          metadata: Json
          regulation_number: string
          section: string
        }[]
      }
      search_bs7671_intelligence_hybrid: {
        Args: { match_count?: number; query_text: string }
        Returns: {
          applies_to: string[]
          category: string
          content: string
          hybrid_score: number
          id: string
          keywords: string[]
          primary_topic: string
          regulation_id: string
          regulation_number: string
          section: string
          subcategory: string
        }[]
      }
      search_design_hybrid: {
        Args: {
          match_count?: number
          query_embedding: string
          query_text: string
        }
        Returns: {
          content: string
          hybrid_score: number
          id: string
          metadata: Json
          source: string
          topic: string
        }[]
      }
      search_design_knowledge: {
        Args: {
          circuit_filter?: string
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
      search_design_knowledge_intelligence_hybrid: {
        Args: { match_count?: number; query_text: string }
        Returns: {
          bs7671_regulations: string[]
          cable_sizes: string[]
          calculation_steps: string[]
          confidence_score: number
          content: string
          design_category: string
          facet_type: string
          formulas: string[]
          hybrid_score: number
          id: string
          keywords: string[]
          load_types: string[]
          primary_topic: string
          quality_score: number
          table_refs: string[]
          worked_examples: Json[]
        }[]
      }
      search_health_safety: {
        Args: {
          match_count?: number
          match_threshold?: number
          query_embedding: string
          scale_filter?: string
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
      search_health_safety_hybrid: {
        Args: {
          match_count?: number
          query_embedding: string
          query_text: string
          scale_filter?: string
        }
        Returns: {
          content: string
          hybrid_score: number
          id: string
          metadata: Json
          scale: string
          source: string
          topic: string
        }[]
      }
      search_health_safety_intelligence_hybrid: {
        Args: {
          match_count?: number
          min_confidence?: number
          query_embedding: string
          query_text: string
        }
        Returns: {
          confidence_score: number
          control_measures: string[]
          hazard_description: string
          hybrid_score: number
          id: string
          required_ppe: Json
          source_topic: string
        }[]
      }
      search_inspection_testing_hybrid: {
        Args: {
          match_count?: number
          query_embedding: string
          query_text: string
        }
        Returns: {
          content: string
          hybrid_score: number
          id: string
          metadata: Json
          source: string
          topic: string
        }[]
      }
      search_installation_hybrid: {
        Args: {
          match_count?: number
          query_embedding: string
          query_text: string
        }
        Returns: {
          content: string
          hybrid_score: number
          id: string
          metadata: Json
          source: string
          topic: string
        }[]
      }
      search_installation_knowledge: {
        Args: {
          match_count?: number
          match_threshold?: number
          method_filter?: string
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
      search_maintenance_hybrid: {
        Args: {
          equipment_filter?: string
          match_count?: number
          query_embedding: string
          query_text: string
        }
        Returns: {
          content: string
          hybrid_score: number
          id: string
          metadata: Json
          source: string
          topic: string
        }[]
      }
      search_practical_work_fast: {
        Args: { match_count?: number; query_text: string }
        Returns: {
          activity_types: string[]
          applies_to: string[]
          bs7671_regulations: string[]
          cable_sizes: string[]
          common_failures: Json[]
          confidence_score: number
          description: string
          equipment_category: string
          id: string
          keywords: string[]
          primary_topic: string
          safety_requirements: Json
          test_procedures: Json[]
          tools_required: string[]
          troubleshooting_steps: string[]
        }[]
      }
      search_practical_work_intelligence:
        | {
            Args: {
              filter_activity_types?: string[]
              match_count?: number
              match_threshold?: number
              query_embedding: string
            }
            Returns: {
              activity_types: string[]
              best_practices: Json
              canonical_id: string
              cluster_id: string
              common_mistakes: Json
              id: string
              practical_work_id: string
              safety_critical: boolean
              similarity: number
              source_tables: string[]
              title: string
              tools_required: Json
            }[]
          }
        | {
            Args: {
              filter_activity_types?: string[]
              filter_equipment?: string[]
              filter_skill_level?: string[]
              match_count?: number
              query_embedding: string
              query_text: string
            }
            Returns: {
              activity_types: string[]
              bs7671_regulations: string[]
              common_failures: Json[]
              content: string
              equipment_category: string
              final_score: number
              id: string
              inspection_checklist: Json[]
              keyword_score: number
              maintenance_intervals: Json
              safety_requirements: Json
              similarity_score: number
              skill_level: string
              test_procedures: Json[]
              tools_required: string[]
              typical_duration_minutes: number
            }[]
          }
      search_practical_work_intelligence_hybrid: {
        Args: {
          filter_trade?: string
          match_count?: number
          query_embedding?: string
          query_text: string
        }
        Returns: {
          applies_to: string[]
          bs7671_regulations: string[]
          cable_sizes: string[]
          confidence_score: number
          content: string
          equipment_category: string
          expected_results: string
          hybrid_score: number
          id: string
          keywords: string[]
          location_types: string[]
          maintenance_interval: string
          power_ratings: string[]
          practical_work_id: string
          primary_topic: string
          source: string
          tools_required: string[]
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
      search_project_mgmt_hybrid: {
        Args: {
          match_count?: number
          query_embedding: string
          query_text: string
        }
        Returns: {
          content: string
          hybrid_score: number
          id: string
          metadata: Json
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
      search_regulations_intelligence_hybrid: {
        Args: {
          filter_categories?: string[]
          match_count?: number
          query_text: string
        }
        Returns: {
          applies_to: string[]
          category: string
          confidence_score: number
          hybrid_score: number
          keywords: string[]
          primary_topic: string
          regulation_id: string
          regulation_number: string
          related_regulations: string[]
          subcategory: string
        }[]
      }
      search_tutor_hybrid: {
        Args: {
          level_filter?: string
          match_count?: number
          query_embedding: string
          query_text: string
        }
        Returns: {
          content: string
          hybrid_score: number
          id: string
          metadata: Json
          qualification_level: string
          source: string
          topic: string
        }[]
      }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
      trigger_materials_weekly_refresh: { Args: never; Returns: undefined }
      unified_rag_search: {
        Args: {
          agent_priorities?: Json
          match_count?: number
          query_embedding: string
          query_text: string
        }
        Returns: {
          content: string
          hybrid_score: number
          metadata: Json
          regulation_number: string
          source: string
        }[]
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
