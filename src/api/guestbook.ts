import type { CreateEntryRequest, EntriesResponse, GuestbookEntry } from '../types/guestbook';

export const fetchEntries = async (page: number = 1): Promise<EntriesResponse> => {
  const response = await fetch(`api/entries?page=${page}&limit=15`);

  if (!response.ok) {
    throw new Error('Failed to fetch entries');
  }

  return response.json();
};

export const createEntry = async (entry: CreateEntryRequest): Promise<GuestbookEntry> => {
  const response = await fetch(`/api/entries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entry),
  });

  if (!response.ok) {
    throw new Error('Failed to create entry');
  }

  return response.json();
};
