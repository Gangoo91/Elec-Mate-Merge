-- The capture sheet in the released app sends self_assessment = 0 for "not rated", which the
-- 1-5 check rejects, so saving evidence from it failed. Treat anything outside 1-5 as not rated.
create or replace function public.tg_portfolio_self_assessment_unrated()
returns trigger language plpgsql set search_path = public as $$
begin
  if new.self_assessment is not null and (new.self_assessment < 1 or new.self_assessment > 5) then
    new.self_assessment := null;
  end if;
  return new;
end $$;

drop trigger if exists a0_self_assessment_unrated on public.portfolio_items;
create trigger a0_self_assessment_unrated
  before insert or update of self_assessment on public.portfolio_items
  for each row execute function public.tg_portfolio_self_assessment_unrated();
