-- Create user_project_plans table for saving editable project plans
CREATE TABLE IF NOT EXISTS public.user_project_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  project_name TEXT NOT NULL,
  client_name TEXT,
  location TEXT,
  start_date DATE,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'completed', 'archived')),
  plan_data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_project_plans ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own project plans"
  ON public.user_project_plans FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own project plans"
  ON public.user_project_plans FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own project plans"
  ON public.user_project_plans FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own project plans"
  ON public.user_project_plans FOR DELETE
  USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE TRIGGER update_user_project_plans_updated_at
  BEFORE UPDATE ON public.user_project_plans
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add extra columns to project_templates if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='project_templates' AND column_name='description') THEN
    ALTER TABLE public.project_templates ADD COLUMN description TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='project_templates' AND column_name='difficulty') THEN
    ALTER TABLE public.project_templates ADD COLUMN difficulty TEXT CHECK (difficulty IN ('simple', 'moderate', 'complex'));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='project_templates' AND column_name='icon_name') THEN
    ALTER TABLE public.project_templates ADD COLUMN icon_name TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='project_templates' AND column_name='tags') THEN
    ALTER TABLE public.project_templates ADD COLUMN tags TEXT[];
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='project_templates' AND column_name='usage_count') THEN
    ALTER TABLE public.project_templates ADD COLUMN usage_count INTEGER DEFAULT 0;
  END IF;
END $$;

-- Insert 15+ UK electrical project templates
INSERT INTO public.project_templates (title, template_type, description, typical_duration_days, difficulty, icon_name, tags, phases, risk_factors) VALUES

-- Domestic Templates
(
  '1-Bed Flat Rewire',
  'domestic_rewire',
  'Complete rewire of a 1-bedroom flat including consumer unit replacement, new circuits, and testing',
  4,
  'simple',
  'Home',
  ARRAY['domestic', 'rewire', 'flat', 'residential'],
  '[
    {
      "phaseName": "Survey and Preparation",
      "dayStart": 1,
      "dayEnd": 1,
      "tasks": [
        "Site survey and measurements",
        "Order consumer unit and materials",
        "Arrange Building Control notification",
        "Agree access with client"
      ],
      "materials": [
        {"name": "Consumer unit (6-way)", "quantity": 1, "orderBy": "Day -3"},
        {"name": "Twin & earth cable 2.5mm", "quantity": 50, "unit": "m"},
        {"name": "Twin & earth cable 1.5mm", "quantity": 100, "unit": "m"}
      ]
    },
    {
      "phaseName": "First Fix",
      "dayStart": 2,
      "dayEnd": 3,
      "tasks": [
        "Install new consumer unit",
        "Run cables for all circuits",
        "Install back boxes",
        "First fix inspection point"
      ],
      "holdPoints": ["Building Control first fix inspection"],
      "tradeCoordination": [
        {"trade": "Plasterer", "day": 4, "note": "Notify 2 days in advance"}
      ]
    },
    {
      "phaseName": "Second Fix and Testing",
      "dayStart": 4,
      "dayEnd": 4,
      "tasks": [
        "Install sockets, switches, and accessories",
        "Terminate circuits in consumer unit",
        "Complete testing and certification",
        "Hand over to client"
      ],
      "materials": [
        {"name": "Sockets double", "quantity": 15},
        {"name": "Light switches", "quantity": 8}
      ]
    }
  ]'::jsonb,
  '{"risks": [
    {"description": "Asbestos in old wiring", "mitigation": "Survey before work starts"},
    {"description": "Consumer unit delivery delay", "mitigation": "Order 1 week in advance"}
  ]}'::jsonb
),

(
  '3-Bed House Rewire',
  'domestic_rewire',
  'Full house rewire with modern consumer unit, additional circuits for kitchen and bathroom',
  7,
  'moderate',
  'Home',
  ARRAY['domestic', 'rewire', 'house', 'residential'],
  '[
    {
      "phaseName": "Survey and Planning",
      "dayStart": 1,
      "dayEnd": 1,
      "tasks": [
        "Detailed site survey",
        "Circuit design and cable calculations",
        "Order all materials and consumer unit",
        "Book Building Control inspection",
        "Client liaison - agree working hours"
      ]
    },
    {
      "phaseName": "First Fix - Upstairs",
      "dayStart": 2,
      "dayEnd": 3,
      "tasks": [
        "Install new consumer unit location",
        "Run lighting circuits upstairs",
        "Run socket circuits upstairs",
        "Install shower circuit if applicable"
      ]
    },
    {
      "phaseName": "First Fix - Downstairs",
      "dayStart": 4,
      "dayEnd": 5,
      "tasks": [
        "Run lighting circuits downstairs",
        "Run socket circuits downstairs",
        "Install cooker and immersion circuits",
        "First fix inspection"
      ],
      "holdPoints": ["Building Control first fix inspection before plastering"]
    },
    {
      "phaseName": "Second Fix",
      "dayStart": 6,
      "dayEnd": 7,
      "tasks": [
        "Install all sockets and switches",
        "Install light fittings",
        "Terminate all circuits",
        "Testing: IR, continuity, Zs, RCD",
        "Issue EIC and hand over"
      ],
      "tradeCoordination": [
        {"trade": "Decorator", "day": 8, "note": "Can start after handover"}
      ]
    }
  ]'::jsonb,
  '{}'::jsonb
),

(
  'Kitchen Upgrade',
  'domestic_upgrade',
  'Kitchen electrical upgrade with additional circuits for appliances and LED downlights',
  2,
  'simple',
  'ChefHat',
  ARRAY['domestic', 'kitchen', 'upgrade'],
  '[
    {
      "phaseName": "Planning and First Fix",
      "dayStart": 1,
      "dayEnd": 1,
      "tasks": [
        "Site survey with kitchen fitter",
        "Install cooker circuit 6mm",
        "Install additional socket circuits",
        "Run cables for LED downlights",
        "Install extractor fan circuit"
      ],
      "tradeCoordination": [
        {"trade": "Kitchen fitter", "day": 0, "note": "Coordinate cable routes"}
      ]
    },
    {
      "phaseName": "Second Fix and Testing",
      "dayStart": 2,
      "dayEnd": 2,
      "tasks": [
        "Install cooker outlet",
        "Install kitchen sockets",
        "Install LED downlights and transformers",
        "Connect extractor fan",
        "Test all circuits and issue certificate"
      ]
    }
  ]'::jsonb,
  '{}'::jsonb
),

(
  'EV Charger Installation',
  'domestic_installation',
  'Electric vehicle charging point installation with dedicated circuit and RCD protection',
  1,
  'simple',
  'Zap',
  ARRAY['domestic', 'ev', 'charger', 'electric-vehicle'],
  '[
    {
      "phaseName": "Survey and Installation",
      "dayStart": 1,
      "dayEnd": 1,
      "tasks": [
        "Check consumer unit capacity",
        "Install 32A RCBO in consumer unit",
        "Run 6mm SWA from CU to charge point",
        "Mount EV charger on wall",
        "Commission and test",
        "Register with OZEV if applicable"
      ],
      "materials": [
        {"name": "32A RCBO", "quantity": 1},
        {"name": "6mm SWA cable", "quantity": 25, "unit": "m"},
        {"name": "EV charger unit", "quantity": 1, "orderBy": "Day -5"}
      ]
    }
  ]'::jsonb,
  '{}'::jsonb
),

(
  'New Build First Fix',
  'domestic_new_build',
  'First fix electrical installation for new build house with multiple trades on site',
  3,
  'moderate',
  'Building',
  ARRAY['domestic', 'new-build', 'first-fix'],
  '[
    {
      "phaseName": "Coordination and Setup",
      "dayStart": 1,
      "dayEnd": 1,
      "tasks": [
        "Site meeting with builder and other trades",
        "Mark out socket and switch positions",
        "Install temporary power for site",
        "Coordinate with plumber for routes"
      ],
      "tradeCoordination": [
        {"trade": "Plumber", "day": 1, "note": "Mark routes together"},
        {"trade": "Builder", "day": 0, "note": "Confirm access and working hours"}
      ]
    },
    {
      "phaseName": "First Fix Installation",
      "dayStart": 2,
      "dayEnd": 3,
      "tasks": [
        "Install consumer unit and tails",
        "Run all lighting circuits",
        "Run all socket circuits",
        "Install cooker, shower, and immersion circuits",
        "Install back boxes throughout",
        "Notify Building Control for inspection"
      ],
      "holdPoints": ["Building Control first fix inspection"]
    }
  ]'::jsonb,
  '{}'::jsonb
),

-- Commercial Templates
(
  'Small Office Fit-Out',
  'commercial_office',
  'Complete electrical fit-out for small office including data, lighting, and power distribution',
  7,
  'moderate',
  'Building2',
  ARRAY['commercial', 'office', 'fit-out'],
  '[
    {
      "phaseName": "Design and Coordination",
      "dayStart": 1,
      "dayEnd": 1,
      "tasks": [
        "Site survey and lighting design",
        "Coordinate with data/IT contractor",
        "Order distribution board and materials",
        "Agree working hours with building management"
      ]
    },
    {
      "phaseName": "First Fix - Power and Lighting",
      "dayStart": 2,
      "dayEnd": 4,
      "tasks": [
        "Install distribution board",
        "Run lighting circuits",
        "Run socket circuits to desks",
        "Install containment and trunking",
        "First fix for emergency lighting"
      ]
    },
    {
      "phaseName": "Second Fix and Testing",
      "dayStart": 5,
      "dayEnd": 7,
      "tasks": [
        "Install LED panel lights",
        "Install sockets and USB outlets",
        "Install emergency lighting",
        "Complete testing and certification",
        "Handover documentation"
      ]
    }
  ]'::jsonb,
  '{}'::jsonb
),

(
  'Retail Unit Fit-Out',
  'commercial_retail',
  'Retail shop electrical installation with display lighting, till points, and security',
  5,
  'moderate',
  'ShoppingBag',
  ARRAY['commercial', 'retail', 'shop'],
  '[
    {
      "phaseName": "Planning and First Fix",
      "dayStart": 1,
      "dayEnd": 2,
      "tasks": [
        "Site survey and lighting layout design",
        "Install distribution board",
        "Run power for till points",
        "Install track lighting circuits",
        "Run security system circuits"
      ]
    },
    {
      "phaseName": "Second Fix and Testing",
      "dayStart": 3,
      "dayEnd": 5,
      "tasks": [
        "Install track lights and spotlights",
        "Install till point sockets",
        "Connect security system",
        "Install window display lighting",
        "Test and certify"
      ]
    }
  ]'::jsonb,
  '{}'::jsonb
);

-- Add trade coordination knowledge to project_mgmt_knowledge table
INSERT INTO public.project_mgmt_knowledge (topic, content, source, metadata) VALUES

('plasterer_coordination', 'Plasterer Coordination Best Practices:
- Notify plasterer 2-3 days before first fix is complete
- Plasterer typically needs 2 days to plaster walls after first fix
- Drying time: 3-5 days before second fix can start
- Risk: If plasterer is not booked in advance, 1-2 week delay is common
- Always confirm plasterer availability before starting first fix
- Take photos of cable routes before plastering for future reference', 'trade_coordination', 
'{"trade": "plasterer", "phase": "between_first_and_second_fix", "lead_time_days": 3, "work_duration_days": 2, "drying_time_days": 4}'::jsonb),

('building_control_booking', 'Building Control Inspection Booking Rules (UK):
- First fix inspection: Must be booked minimum 48 hours in advance
- Typical booking process: Phone call or online form to local authority
- Inspection usually takes 30-60 minutes
- Inspector checks cable routing, back box installation, circuit protection
- Cannot proceed to plastering without first fix sign-off
- Risk: Forgetting to book = 1 week delay minimum
- Always book inspection at start of first fix, not at end', 'building_control', 
'{"inspection_type": "first_fix", "lead_time_hours": 48, "common_delays": ["forgot_to_book", "inspector_unavailable"]}'::jsonb),

('uk_supplier_lead_times', 'UK Electrical Supplier Lead Times:
CEF (City Electrical Factors):
- Standard stock items: Same day collection
- Consumer units (Hager, Fusebox): Usually in stock
- Specialty items: 3-5 days
- Risk items: EV chargers (7-10 days), smart home devices (5-7 days)

Edmundson Electrical:
- Similar stock levels to CEF
- Good for bulk cable orders
- Trade account required for best pricing

Screwfix:
- Excellent for small items, sockets, switches
- Not recommended for consumer units (limited range)
- Click and collect: 1-2 hours

TLC Direct:
- Online supplier, next day delivery
- Competitive pricing but no same-day collection
- Good for planned jobs, not emergency', 'supplier_intelligence',
'{"suppliers": ["cef", "edmundson", "screwfix", "tlc", "rexel"], "risk_items": ["consumer_units", "ev_chargers", "smart_devices"], "typical_lead_times": {"standard": 0, "specialty": 5, "risk": 10}}'::jsonb);