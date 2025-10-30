export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

export interface CreateEntryRequest {
  name: string;
  message: string;
}

export interface EntriesResponse {
  entries: GuestbookEntry[];
  hasMore: boolean;
  nextPage?: number;
}
