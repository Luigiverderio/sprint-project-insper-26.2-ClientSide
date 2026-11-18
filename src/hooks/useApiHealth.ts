import { useQuery } from '@tanstack/react-query'
import { apiGet } from '../api/client'

/** Checks the backend `/health` endpoint (card T10). */
export function useApiHealth() {
  return useQuery({
    queryKey: ['health'],
    queryFn: ({ signal }) => apiGet<unknown>('/health', { signal }),
    retry: false,
    staleTime: 30_000,
  })
}
