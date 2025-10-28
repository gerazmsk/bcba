import { notFound } from 'next/navigation';
import { createServerComponentClient } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  try {
    // Check if env vars are set
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Missing Supabase credentials');
      return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8">
            <h1 className="text-2xl font-bold text-red-900 mb-4">Configuration Error</h1>
            <p className="text-red-700">Supabase credentials are not configured. Please check your environment variables.</p>
          </div>
        </div>
      );
    }
    
    const supabase = createServerComponentClient();
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Database error:', error.message);
      notFound();
    }

    if (!profile) {
      console.error('No profile found for id:', id);
      notFound();
    }

    if (!profile.is_public) {
      console.log('Profile is private');
      notFound();
    }

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
          <div className="text-center mb-8">
            <img
              src={profile.logo_url}
              alt={`${profile.first_name} ${profile.last_name}`}
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://cdn.example.com/default-logo.png';
              }}
            />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {profile.first_name} {profile.last_name}
            </h1>
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 text-lg font-semibold rounded">
              {profile.bcba}
            </span>
          </div>

          <div className="space-y-6">
            {profile.about && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">About</h2>
                <p className="text-gray-700 whitespace-pre-wrap">{profile.about}</p>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {profile.home_town && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Home Town</h3>
                  <p className="text-gray-900">{profile.home_town}</p>
                </div>
              )}
              {profile.current_city && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Current City</h3>
                  <p className="text-gray-900">{profile.current_city}</p>
                </div>
              )}
              {profile.happy_place && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Happy Place</h3>
                  <p className="text-gray-900">{profile.happy_place}</p>
                </div>
              )}
              {profile.favorite_color && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Favorite Color</h3>
                  <p className="text-gray-900">{profile.favorite_color}</p>
                </div>
              )}
              {profile.favorite_hobby && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Favorite Hobby</h3>
                  <p className="text-gray-900">{profile.favorite_hobby}</p>
                </div>
              )}
              {profile.favorite_food && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Favorite Food</h3>
                  <p className="text-gray-900">{profile.favorite_food}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Page error:', error);
    notFound();
  }
}


