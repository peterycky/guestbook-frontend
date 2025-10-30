import { format } from 'date-fns';
import type { GuestbookEntry } from '../types/guestbook';

interface EntryCardProps {
  entry: GuestbookEntry;
}

export default function EntryCard({ entry }: EntryCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      {/* Header with avatar and timestamp */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {/* Avatar */}
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {entry.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">
              {entry.name}
            </h3>
            <time className="text-sm text-gray-400">
              {format(new Date(entry.createdAt), 'MMM d, yyyy')}
            </time>
          </div>
        </div>
      </div>
      
      {/* Message content */}
      <div className="border-l-2 border-blue-600 pl-4">
        <p className="text-gray-300 leading-relaxed">
          {entry.message}
        </p>
      </div>
    </div>
  );
}
