'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@/lib/supabaseClient';
import Input from '@/components/Input';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        }
      }
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    if (authData.user) {
      // Create profile with default values
      const { error: profileError } = await supabase.from('profiles').insert({
        id: authData.user.id,
        first_name: firstName || 'User',
        last_name: lastName || 'User',
      });

      if (profileError) {
        // If profile creation fails, still redirect - they can edit it
        console.error('Profile error:', profileError);
      }
      
      router.push('/dashboard/profile');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Sign up
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            label="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <Input
            type="text"
            label="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
        </form>
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

