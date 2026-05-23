-- Bellevue admin: Housekeeping module
-- Adds cleaning-status fields to rooms + auto-dirty trigger on checkout.
-- Idempotent: safe to re-run.

-- ---------------- Extend rooms ----------------
alter table public.rooms
  add column if not exists cleaning_status text not null default 'clean'
    check (cleaning_status in (
      'clean','dirty','in_progress','inspected','do_not_disturb','out_of_service'
    ));

alter table public.rooms
  add column if not exists last_cleaned_at timestamptz;

alter table public.rooms
  add column if not exists housekeeper text;

alter table public.rooms
  add column if not exists housekeeping_notes text;

create index if not exists rooms_cleaning_status_idx
  on public.rooms (cleaning_status);

-- ---------------- Auto-dirty on checkout ----------------
-- When a booking transitions to 'checked_out', flip the associated room
-- to 'dirty' and clear the assigned housekeeper so it shows up in the
-- housekeeping queue immediately.
create or replace function public.room_dirty_on_checkout()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.status = 'checked_out'
     and (old.status is null or old.status <> 'checked_out') then
    update public.rooms
       set cleaning_status = 'dirty',
           housekeeper = null
     where id = new.room_id;
  end if;
  return new;
end;
$$;

drop trigger if exists bookings_room_dirty_trigger on public.bookings;
create trigger bookings_room_dirty_trigger
  after update of status on public.bookings
  for each row execute function public.room_dirty_on_checkout();
