import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Welcome to BCBA Profiles
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Connect with Board Certified Behavior Analysts (BCBAs) and discover their professional journeys.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/search"
            className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            Search Profiles
          </Link>
          <Link
            href="/login"
            className="px-8 py-3 bg-white text-blue-600 text-lg font-semibold rounded-md hover:bg-gray-50 transition-colors border-2 border-blue-600"
          >
            Get Started
          </Link>
        </div>
      </div>

      <div className="mt-24 grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Search</h2>
          <p className="text-gray-600">
            Search through public BCBA profiles and discover professionals in your area.
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect</h2>
          <p className="text-gray-600">
            Share your professional journey and connect with other BCBAs.
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Learn</h2>
          <p className="text-gray-600">
            Discover the stories and experiences of BCBA professionals.
          </p>
        </div>
      </div>
    </div>
  );
}
