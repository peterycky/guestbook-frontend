import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchEntries } from './guestbook';

export function useEntries() {
  return useInfiniteQuery({
    queryKey: ['entries'],
    queryFn: ({ pageParam = 1 }) => fetchEntries(pageParam),
    getNextPageParam: (lastPage) => lastPage.hasMore ? (lastPage.nextPage || 1) : undefined,
    initialPageParam: 1,
  });
}
