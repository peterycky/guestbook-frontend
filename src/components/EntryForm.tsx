import { useForm } from '@tanstack/react-form';
import { useCreateEntry } from '../api/useCreateEntry';
import type { CreateEntryRequest } from '../types/guestbook';

export default function EntryForm() {
  const form = useForm({
    defaultValues: {
      name: '',
      message: '',
    } as CreateEntryRequest,
    onSubmit: async ({ value }) => {
      mutation.mutate(value);
    },
  });

  const mutation = useCreateEntry(() => {
    form.reset();
  });

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
      <h2 className="text-xl font-semibold mb-6 text-white">Leave a Message</h2>
      
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <form.Field
          name="name"
          validators={{
            onChange: ({ value }) =>
              value.length < 4 ? 'Name must be at least 4 characters' : undefined,
          }}
        >
          {(field) => (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your name"
                disabled={mutation.isPending}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="mt-1 text-sm text-red-400">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field
          name="message"
          validators={{
            onChange: ({ value }) => {
              if (value.length === 0) return 'Message is required';
              if (value.length > 500) return 'Message must be 500 characters or less';
              return undefined;
            },
          }}
        >
          {(field) => (
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Your message..."
                disabled={mutation.isPending}
              />
              <div className="flex justify-between items-center mt-1">
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-red-400">{field.state.meta.errors[0]}</p>
                )}
                <p className="text-sm text-gray-400 ml-auto">
                  {field.state.value.length}/500
                </p>
              </div>
            </div>
          )}
        </form.Field>

        <form.Subscribe
          selector={(state) => [state.canSubmit]}
        >
          {([canSubmit]) => (
            <button
              type="submit"
              disabled={!canSubmit || mutation.isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md"
            >
              {mutation.isPending ? 'Posting...' : 'Post Message'}
            </button>
          )}
        </form.Subscribe>
      </form>

      {mutation.isError && (
        <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded-md">
          <p className="text-red-300 text-sm">
            Failed to post message. Please try again.
          </p>
        </div>
      )}
    </div>
  );
}
