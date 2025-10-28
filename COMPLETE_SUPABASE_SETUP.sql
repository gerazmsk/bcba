-- Profiles table (1:1 with auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  logo_url text not null default 'https://cdn.example.com/default-logo.png',
  first_name text not null,
  last_name text not null,
  bcba text not null default 'BCBA',

  about text,
  home_town text,
  current_city text,
  happy_place text,
  favorite_color text,
  favorite_hobby text,
  favorite_food text,

  is_public boolean not null default true
);

-- Text search index
create index if not exists idx_profiles_search
on public.profiles using gin (
  to_tsvector(
    'simple',
    coalesce(first_name,'') || ' ' ||
    coalesce(last_name,'')  || ' ' ||
    coalesce(about,'')      || ' ' ||
    coalesce(home_town,'')  || ' ' ||
    coalesce(current_city,'')|| ' ' ||
    coalesce(happy_place,'')|| ' ' ||
    coalesce(favorite_color,'')|| ' ' ||
    coalesce(favorite_hobby,'')|| ' ' ||
    coalesce(favorite_food,'')
  )
);

-- Auto update timestamp
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute procedure set_updated_at();

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies
drop policy if exists "Read public profiles" on public.profiles;
create policy "Read public profiles"
on public.profiles for select
using (is_public = true);

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
on public.profiles for select
to authenticated
using (auth.uid() = id);

drop policy if exists "Users can insert/update their own profile" on public.profiles;
create policy "Users can insert/update their own profile"
on public.profiles
for all
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

-- Create storage bucket for profile photos
insert into storage.buckets (id, name, public)
values ('profiles', 'profiles', true)
on conflict (id) do nothing;

-- Storage policies
drop policy if exists "Public Access" on storage.objects;
create policy "Public Access"
on storage.objects for select
using (bucket_id = 'profiles');

drop policy if exists "Authenticated users can upload photos" on storage.objects;
create policy "Authenticated users can upload photos"
on storage.objects for insert
to authenticated
with check (bucket_id = 'profiles');

drop policy if exists "Users can update own photos" on storage.objects;
create policy "Users can update own photos"
on storage.objects for update
to authenticated
using (bucket_id = 'profiles');

drop policy if exists "Users can delete own photos" on storage.objects;
create policy "Users can delete own photos"
on storage.objects for delete
to authenticated
using (bucket_id = 'profiles');

