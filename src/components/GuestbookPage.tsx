import EntryForm from './EntryForm';
import EntryList from './EntryList';

export default function GuestbookPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Guestbook
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Share your thoughts and connect with others
          </p>
        </header>

        {/* Main Content */}
        <div className="space-y-8">
          <EntryForm />
          <EntryList />
        </div>
      </div>
    </div>
  );
}
