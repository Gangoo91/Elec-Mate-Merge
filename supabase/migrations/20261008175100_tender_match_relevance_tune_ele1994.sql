-- ELE-1994 review, tuning after testing the matcher on the live feed: plain
-- "heating" and "ventilation" pulled in boiler and gas contracts (heat pumps
-- still match by name), and building condition surveys are not installation
-- work.
create or replace function public._tender_is_electrical_work(p_title text, p_desc text, p_cpv text[])
returns boolean
language sql
immutable
set search_path to 'public'
as $$
  with x as (
    select lower(coalesce(p_title, '')) as ti,
           lower(coalesce(p_title, '') || ' ' || left(coalesce(p_desc, ''), 3000)) as blob,
           coalesce(p_cpv, '{}') as cpv
  )
  select
    -- not installation work at all
    not (
      x.ti ~ '(sexual health|ambulance|cleaning|legal|solicitor|surveyor services|architect|masterplan|feasibility|consultan|advisor|design team|modelling|prisoner|records|peatland|temporary accommodation|sanitaryware|fencing|play area|footpath|lock gates|walkway|balcon|activity plan|certification integration|management tool|software|back office|epc wrapper|portfolio management system|heat-transfer additive|vessel|ferry|catering|insurance|recruitment|agency staff|training services|auditing|preliminary market engagement|condition survey|boiler|\yrcv)'
      or x.ti ~ '\yvehicles?\y(?! charg)'
      or x.ti ~ '(electricity supply|supply of electricity|market for electricity|energy supply|gas supply)'
      or x.ti ~ '(lift (replacement|modernisation|servicing|refurbishment|maintenance)|passenger lift|mobility lift)'
      or exists (select 1 from unnest(x.cpv) cp
                  where left(cp, 2) in ('03','09','15','18','22','30','33','34','37','39','55','60','63','64','65','66','70','72','73','75','77','79','80','85','90','92','98')
                    and left(cp, 5) <> '34928')  -- 34928 = street lighting equipment
    )
    and (
      x.blob ~ '(electric|rewir|lighting|\ylights?\y|illumination|eicr|periodic inspection|condition report|fire alarm|fire detection|pava|emergency light|cctv|door entry|access control|ev charg|charging (point|infrastructure|solution)|evci|solar|\ypv\y|photovoltaic|battery storage|heat pump|\ybms\y|building management system|\ym ?& ?e\y|substation|switchgear|\yhv\y|\ylv\y|cabl|distribution board|consumer unit|\ypat\y|portable appliance|testing|traffic signal|street ?light|smart meter|renewable|decarboni|retrofit|compliance (works|check)|property (safety|maintenance)|responsive repair|repairs? and maintenance|voids|planned (and capital )?works|capital works|refurbish|fit-?out|minor works|building works|modernisation works|hard fm|measured term|scada|transformer)'
      or exists (select 1 from unnest(x.cpv) cp
                  where left(cp, 4) in ('4531','4532','4535','4526','4545','4544','4521','4523','4500','4530',
                                        '5070','5071','5061','5042','5023','5111','3162','3152','3153','3171',
                                        '3121','3122','3123','3124','3134','3168','3172','3161','3150','0931','0933',
                                        '4211','4241'))
    )
  from x
$$;

revoke all on function public._tender_is_electrical_work(text, text, text[]) from public, anon, authenticated;
