'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@/lib/supabaseClient';
import { Profile } from '@/lib/types';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import Checkbox from '@/components/Checkbox';
import { validateProfileForm } from '@/lib/validators';

// Prevent static rendering
export const dynamic = 'force-dynamic';

export default function DashboardProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    about: '',
    home_town: '',
    current_city: '',
    happy_place: '',
    favorite_color: '',
    favorite_hobby: '',
    favorite_food: '',
    is_public: true,
  });
  const [avatarUrl, setAvatarUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) {
        setUploading(false);
        return;
      }

      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        setErrors({ submit: 'Failed to upload photo' });
        setUploading(false);
        return;
      }

      const { data } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath);

      setAvatarUrl(data.publicUrl);
      setUploading(false);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploading(false);
    }
  };

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/login');
        return;
      }

      let { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      // If profile doesn't exist, create it
      if (error && error.code === 'PGRST116') {
        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: session.user.id,
            first_name: 'User',
            last_name: 'User',
          })
          .select()
          .single();
        
        if (insertError) {
          console.error('Error creating profile:', insertError);
          setLoading(false);
          return;
        }
        data = newProfile;
      } else if (error) {
        console.error('Error loading profile:', error);
        setLoading(false);
        return;
      }

      if (data) {
        setProfile(data);
        setFormData({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          about: data.about || '',
          home_town: data.home_town || '',
          current_city: data.current_city || '',
          happy_place: data.happy_place || '',
          favorite_color: data.favorite_color || '',
          favorite_hobby: data.favorite_hobby || '',
          favorite_food: data.favorite_food || '',
          is_public: data.is_public,
        });
        setAvatarUrl(data.logo_url || '');
      }
      setLoading(false);
    };

    loadProfile();
  }, [supabase, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess(false);

    const validationErrors = validateProfileForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSaving(true);

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/login');
      return;
    }

    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', session.user.id)
      .single();

    let error;
    if (existingProfile) {
      // Update existing profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          ...formData,
          logo_url: avatarUrl || 'https://cdn.example.com/default-logo.png'
        })
        .eq('id', session.user.id);
      error = updateError;
    } else {
      // Create new profile
      const { error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: session.user.id,
          ...formData,
          logo_url: avatarUrl || 'https://cdn.example.com/default-logo.png'
        });
      error = insertError;
    }

    if (error) {
      console.error('Error saving profile:', error);
      setErrors({ submit: `Failed to save profile: ${error.message}` });
    } else {
      setSuccess(true);
      console.log('Profile saved successfully with data:', formData);
      setTimeout(() => setSuccess(false), 3000);
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Edit Profile
        </h1>

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800 font-medium">Profile saved successfully!</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo Upload Section */}
          <div className="flex flex-col items-center gap-4">
            <img
              src={avatarUrl || 'https://cdn.example.com/default-logo.png'}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
              onError={(e) => {
                e.currentTarget.src = 'https://cdn.example.com/default-logo.png';
              }}
            />
            
            <div className="flex flex-col items-center gap-2">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  disabled={uploading}
                  className="hidden"
                  id="photo-upload"
                />
                <span className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors inline-block">
                  {uploading ? 'Uploading...' : 'Upload Photo'}
                </span>
              </label>
              <p className="text-sm text-gray-500">Or paste a photo URL below</p>
            </div>

            <Input
              type="url"
              label="Profile Photo URL (optional)"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://example.com/your-photo.jpg"
              className="w-full"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Input
              type="text"
              label="First name"
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              required
              error={errors.first_name}
            />
            <Input
              type="text"
              label="Last name"
              value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              required
              error={errors.last_name}
            />
          </div>

          <Textarea
            label="About"
            value={formData.about}
            onChange={(e) => setFormData({ ...formData, about: e.target.value })}
            rows={4}
            placeholder="Tell us about yourself..."
            error={errors.about}
            maxLength={2000}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <Input
              type="text"
              label="Home town"
              value={formData.home_town}
              onChange={(e) => setFormData({ ...formData, home_town: e.target.value })}
              error={errors.home_town}
            />
            <Input
              type="text"
              label="Current city"
              value={formData.current_city}
              onChange={(e) => setFormData({ ...formData, current_city: e.target.value })}
              error={errors.current_city}
            />
            <Input
              type="text"
              label="Happy place"
              value={formData.happy_place}
              onChange={(e) => setFormData({ ...formData, happy_place: e.target.value })}
              error={errors.happy_place}
            />
            <Input
              type="text"
              label="Favorite color"
              value={formData.favorite_color}
              onChange={(e) => setFormData({ ...formData, favorite_color: e.target.value })}
              error={errors.favorite_color}
            />
            <Input
              type="text"
              label="Favorite hobby"
              value={formData.favorite_hobby}
              onChange={(e) => setFormData({ ...formData, favorite_hobby: e.target.value })}
              error={errors.favorite_hobby}
            />
            <Input
              type="text"
              label="Favorite food"
              value={formData.favorite_food}
              onChange={(e) => setFormData({ ...formData, favorite_food: e.target.value })}
              error={errors.favorite_food}
            />
          </div>

          <div className="border-t border-gray-200 pt-6">
            <Checkbox
              label="Make my profile public"
              checked={formData.is_public}
              onChange={(e) => setFormData({ ...formData, is_public: e.target.checked })}
            />
            <p className="mt-2 text-sm text-gray-600">
              When enabled, your profile will be visible to anyone on the search page.
            </p>
          </div>

          {errors.submit && <p className="text-sm text-red-600">{errors.submit}</p>}

          <button
            type="submit"
            disabled={saving}
            className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}

