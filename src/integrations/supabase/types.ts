export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
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
          average_rating: number | null
          category: string
          content: string
          created_at: string
          date_published: string
          id: string
          is_active: boolean
          regulatory_body: string
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
          regulatory_body: string
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
          regulatory_body?: string
          summary?: string
          title?: string
          updated_at?: string
          view_count?: number | null
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
      major_projects: {
        Row: {
          average_rating: number | null
          awarded_to: string
          content: string
          created_at: string
          date_awarded: string
          id: string
          is_active: boolean
          location: string
          project_value: string
          status: string
          summary: string
          title: string
          updated_at: string
          view_count: number | null
        }
        Insert: {
          average_rating?: number | null
          awarded_to: string
          content: string
          created_at?: string
          date_awarded?: string
          id?: string
          is_active?: boolean
          location: string
          project_value: string
          status?: string
          summary: string
          title: string
          updated_at?: string
          view_count?: number | null
        }
        Update: {
          average_rating?: number | null
          awarded_to?: string
          content?: string
          created_at?: string
          date_awarded?: string
          id?: string
          is_active?: boolean
          location?: string
          project_value?: string
          status?: string
          summary?: string
          title?: string
          updated_at?: string
          view_count?: number | null
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
      regional_job_pricing: {
        Row: {
          average_price: number
          complexity_level: string
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
      time_entries: {
        Row: {
          activity: string
          created_at: string | null
          date: string
          duration: number
          id: string
          is_automatic: boolean | null
          notes: string | null
          user_id: string
        }
        Insert: {
          activity: string
          created_at?: string | null
          date: string
          duration: number
          id?: string
          is_automatic?: boolean | null
          notes?: string | null
          user_id: string
        }
        Update: {
          activity?: string
          created_at?: string | null
          date?: string
          duration?: number
          id?: string
          is_automatic?: boolean | null
          notes?: string | null
          user_id?: string
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_chat_messages_with_upvote_status: {
        Args: { user_id: string }
        Returns: {
          id: string
          author_id: string
          author_name: string
          author_avatar: string
          content: string
          category: string
          upvotes: number
          created_at: string
          updated_at: string
          has_user_upvoted: boolean
        }[]
      }
    }
    Enums: {
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
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
