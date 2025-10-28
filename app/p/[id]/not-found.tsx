import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">
          Profile Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          This profile is either private or doesn't exist.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/search"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
          >
            Search Profiles
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-200 text-gray-900 font-semibold rounded-md hover:bg-gray-300 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

