import { useEntries } from '../api/useEntries';
import EntryCard from './EntryCard';
import LoadingSpinner from './LoadingSpinner';

export default function EntryList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useEntries();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="text-center p-8">
        <p className="text-red-400">Failed to load entries. Please try again.</p>
      </div>
    );
  }

  const entries = data?.pages.flatMap(page => page.entries) || [];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        Messages ({entries.length})
      </h2>
      
      {entries.length === 0 ? (
        <div className="text-center p-8">
          <p className="text-gray-400">No entries yet. Be the first to leave a message!</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {entries.map((entry) => (
              <EntryCard key={entry.id} entry={entry} />
            ))}
          </div>

          {hasNextPage && (
            <div className="text-center pt-6">
              <button
                type="button"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-6 py-2 rounded-md"
              >
                {isFetchingNextPage ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
