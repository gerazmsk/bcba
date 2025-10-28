import Link from 'next/link';
import { Profile } from '@/lib/types';

interface ProfileCardProps {
  profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Link href={`/p/${profile.id}`}>
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 cursor-pointer">
        <div className="flex items-start gap-4">
          <img
            src={profile.logo_url}
            alt={`${profile.first_name} ${profile.last_name}`}
            className="w-16 h-16 rounded-full object-cover flex-shrink-0"
            onError={(e) => {
              e.currentTarget.src = 'https://cdn.example.com/default-logo.png';
            }}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-semibold text-gray-900 truncate">
                {profile.first_name} {profile.last_name}
              </h3>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded whitespace-nowrap">
                {profile.bcba}
              </span>
            </div>
            {profile.current_city && (
              <p className="text-gray-600 text-sm truncate">
                {profile.current_city}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

