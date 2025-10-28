'use client';

import { useState } from 'react';
import { Profile } from '@/lib/types';
import { generateBioPDF, getBioHTML } from '@/lib/pdf-generator';

interface DownloadBioButtonProps {
  profile: Profile;
}

export default function DownloadBioButton({ profile }: DownloadBioButtonProps) {
  const [downloading, setDownloading] = useState(false);

  const handlePreview = () => {
    const html = getBioHTML(profile);
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(html);
      newWindow.document.close();
    }
  };

  const handleDownload = async () => {
    try {
      setDownloading(true);
      await generateBioPDF(profile);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={handlePreview}
        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
      >
        Preview HTML
      </button>
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
      >
        {downloading ? 'Generating...' : 'Download Bio (PDF)'}
      </button>
    </div>
  );
}

