import React from 'react';
import { Link } from 'lucide-react';
import { MediaMetadata } from '@/types/media';

interface URLPreviewProps {
  url: string;
  metadata: MediaMetadata;
}

export const URLPreview: React.FC<URLPreviewProps> = ({ url, metadata }) => {
  const { siteName, favicon, ogImage } = metadata;

  return (
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-lg overflow-hidden border hover:border-gray-300 transition-colors"
    >
      <div className="flex items-start gap-4 p-4">
        <div className="flex-shrink-0">
          {favicon ? (
            <img
              src={favicon}
              alt={siteName || 'Site favicon'}
              className="w-6 h-6"
              onError={(e) => {
                e.currentTarget.src = '';
                e.currentTarget.classList.add('hidden');
              }}
            />
          ) : (
            <Link className="w-6 h-6 text-gray-400" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {metadata.title || 'Lien externe'}
          </h3>
          {metadata.description && (
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
              {metadata.description}
            </p>
          )}
          <p className="mt-1 text-xs text-gray-400 truncate">
            {siteName || new URL(url).hostname}
          </p>
        </div>

        {ogImage && (
          <div className="flex-shrink-0 ml-4">
            <img
              src={ogImage}
              alt=""
              className="w-16 h-16 object-cover rounded"
              onError={(e) => {
                e.currentTarget.classList.add('hidden');
              }}
            />
          </div>
        )}
      </div>
    </a>
  );
};
