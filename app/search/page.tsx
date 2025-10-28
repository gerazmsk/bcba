'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@/lib/supabaseClient';
import { Profile } from '@/lib/types';
import ProfileCard from '@/components/ProfileCard';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const searchProfiles = async () => {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('is_public', true)
        .limit(50);

      if (error) {
        console.error('Error searching profiles:', error);
        setLoading(false);
        return;
      }

      if (!query.trim()) {
        // If no query, show all public profiles
        setProfiles(data || []);
        setLoading(false);
        return;
      }

      // Client-side filtering (ILIKE equivalent)
      const searchTerm = query.toLowerCase();
      const filtered = data?.filter((profile) => {
        const searchText = [
          profile.first_name,
          profile.last_name,
          profile.about,
          profile.home_town,
          profile.current_city,
          profile.happy_place,
          profile.favorite_color,
          profile.favorite_hobby,
          profile.favorite_food,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return searchText.includes(searchTerm);
      });

      setProfiles(filtered || []);
      setLoading(false);
    };

    const timer = setTimeout(searchProfiles, 300); // Debounce
    return () => clearTimeout(timer);
  }, [query, supabase]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Search BCBA Profiles
        </h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name, city, interests..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />
          <svg
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {!loading && query && profiles.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg">No profiles found matching your search.</p>
        </div>
      )}

      {!loading && !query && profiles.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg">No public profiles yet. Create your profile to get started!</p>
        </div>
      )}

      {!loading && profiles.length > 0 && (
        <>
          <p className="text-gray-600 mb-6">
            Found {profiles.length} profile{profiles.length !== 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

