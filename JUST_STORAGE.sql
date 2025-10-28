-- Just create storage bucket for photos (ignore if already exists)

insert into storage.buckets (id, name, public)
values ('profiles', 'profiles', true)
on conflict (id) do nothing;

