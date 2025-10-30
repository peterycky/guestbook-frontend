import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateEntryRequest } from '../types/guestbook';
import { createEntry } from './guestbook';

export function useCreateEntry(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEntry,
    onMutate: async (newEntry: CreateEntryRequest) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['entries'] });

      // Snapshot the previous value
      const previousEntries = queryClient.getQueryData(['entries']);

      // Optimistically update to the new value
      queryClient.setQueryData(['entries'], (old: any) => {
        if (!old) return old;

        const optimisticEntry = {
          id: `temp-${Date.now()}`,
          name: newEntry.name,
          message: newEntry.message,
          createdAt: new Date().toISOString(),
        };

        return {
          ...old,
          pages: [
            {
              entries: [optimisticEntry, ...old.pages[0]?.entries || []],
              hasMore: old.pages[0]?.hasMore || false,
              nextPage: old.pages[0]?.nextPage,
            },
            ...old.pages.slice(1),
          ],
        };
      });

      return { previousEntries };
    },
    onError: (_err, _newEntry, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      queryClient.setQueryData(['entries'], context?.previousEntries);
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['entries'] });
    },
    onSuccess: () => {
      onSuccess?.();
    },
  });
}
