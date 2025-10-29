'use client';

import { Profile } from '@/lib/types';
import { getBioHTML } from '@/lib/pdf-generator';

interface DownloadBioButtonProps {
  profile: Profile;
}

export default function DownloadBioButton({ profile }: DownloadBioButtonProps) {
  const handlePrint = () => {
    const html = getBioHTML(profile);
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(html);
      newWindow.document.close();
      // Wait for content to load, then trigger print dialog
      newWindow.onload = () => {
        setTimeout(() => {
          newWindow.print();
        }, 250);
      };
    }
  };

  return (
    <button
      onClick={handlePrint}
      className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
    >
      Print
    </button>
  );
}

