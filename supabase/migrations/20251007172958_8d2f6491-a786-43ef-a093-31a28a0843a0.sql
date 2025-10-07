-- Re-categorize all existing products in pricing_embeddings using smart keyword matching
UPDATE pricing_embeddings
SET category = 
  CASE 
    -- EV Charging (highest priority)
    WHEN item_name ILIKE '%ev%' OR item_name ILIKE '%electric vehicle%' OR item_name ILIKE '%charging%' OR item_name ILIKE '%charger%'
      THEN 'EV Charging'
    
    -- Protection Equipment
    WHEN item_name ILIKE '%mcb%' OR item_name ILIKE '%rcd%' OR item_name ILIKE '%rcbo%' 
      OR item_name ILIKE '%consumer unit%' OR item_name ILIKE '%fuseboard%' 
      OR item_name ILIKE '%spd%' OR item_name ILIKE '%surge%' OR item_name ILIKE '%isolator%'
      THEN 'Protection Equipment'
    
    -- Cables
    WHEN item_name ILIKE '%cable%' OR item_name ILIKE '%swa%' OR item_name ILIKE '%flex%' 
      OR item_name ILIKE '%wire%' OR item_name ILIKE '%twin%' OR item_name ILIKE '%earth%'
      THEN 'Cables'
    
    -- Cable Management
    WHEN item_name ILIKE '%trunking%' OR item_name ILIKE '%conduit%' OR item_name ILIKE '%tray%' 
      OR item_name ILIKE '%cable clip%' OR item_name ILIKE '%dado%' OR item_name ILIKE '%mini trunking%'
      THEN 'Cable Management'
    
    -- Lighting
    WHEN item_name ILIKE '%led%' OR item_name ILIKE '%downlight%' OR item_name ILIKE '%batten%' 
      OR item_name ILIKE '%bulb%' OR item_name ILIKE '%lamp%' OR item_name ILIKE '%lighting%'
      THEN 'Lighting'
    
    -- Accessories (Sockets, Switches)
    WHEN item_name ILIKE '%socket%' OR item_name ILIKE '%switch%' OR item_name ILIKE '%dimmer%' 
      OR item_name ILIKE '%faceplate%' OR item_name ILIKE '%accessory%'
      THEN 'Accessories'
    
    -- Fixings & Consumables
    WHEN item_name ILIKE '%screw%' OR item_name ILIKE '%rawlplug%' OR item_name ILIKE '%connector%' 
      OR item_name ILIKE '%terminal%' OR item_name ILIKE '%grommet%' OR item_name ILIKE '%wago%' 
      OR item_name ILIKE '%crimp%' OR item_name ILIKE '%junction%'
      THEN 'Fixings & Consumables'
    
    -- Default fallback
    ELSE 'Components'
  END
WHERE category = 'Electrical Components' OR category IS NULL;