-- Create storage bucket for profile photos
insert into storage.buckets (id, name, public)
values ('profiles', 'profiles', true)
on conflict (id) do nothing;

-- Allow public read access
create policy "Public Access"
on storage.objects for select
using (bucket_id = 'profiles');

-- Allow authenticated users to upload their own photos
create policy "Authenticated users can upload photos"
on storage.objects for insert
to authenticated
with check (bucket_id = 'profiles');

-- Allow users to update their own photos
create policy "Users can update own photos"
on storage.objects for update
to authenticated
using (bucket_id = 'profiles');

-- Allow users to delete their own photos
create policy "Users can delete own photos"
on storage.objects for delete
to authenticated
using (bucket_id = 'profiles');

