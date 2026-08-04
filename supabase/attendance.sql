create table if not exists public.attendance (
  id uuid primary key default gen_random_uuid(),
  side text not null check (side in ('groom', 'bride')),
  attending boolean not null,
  name text not null check (char_length(trim(name)) between 1 and 40),
  meal boolean not null,
  created_at timestamptz not null default now()
);

alter table public.attendance
drop column if exists privacy_agreed;

alter table public.attendance enable row level security;

revoke all on table public.attendance from anon, authenticated;
grant insert on table public.attendance to anon, authenticated;

drop policy if exists "Anyone can submit attendance" on public.attendance;
create policy "Anyone can submit attendance"
on public.attendance
for insert
to anon, authenticated
with check (true);
