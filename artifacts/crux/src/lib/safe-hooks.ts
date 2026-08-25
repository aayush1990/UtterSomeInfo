import {
  getGetCruxQueryKey,
  getGetLearnedPoliciesQueryKey,
  getGetPortfolioQueryKey,
  getGetPreferencesQueryKey,
  getGetRunningLoopsQueryKey,
  getListCruxesQueryKey,
  useAskCrux,
  useGetCrux,
  useGetLearnedPolicies,
  useGetPortfolio,
  useGetPreferences,
  useGetRunningLoops,
  useListCruxes,
  useResolveCrux,
  useUpdatePreferences,
} from '@workspace/api-client-react';
import { MOCK_CRUXES, MOCK_PORTFOLIO, MOCK_RUNNING_LOOPS, MOCK_LEARNED, MOCK_PREFERENCES } from './mock-data';

export function useSafeCruxes() {
  const { data, isLoading, isError } = useListCruxes({ query: { queryKey: getListCruxesQueryKey(), retry: 1 } });
  return { data: isError || !data ? MOCK_CRUXES : data, isLoading: isLoading && !isError };
}

export function useSafeCrux(id: string) {
  const { data, isLoading, isError } = useGetCrux(id, { query: { queryKey: getGetCruxQueryKey(id), retry: 1 } });
  const mockCrux = MOCK_CRUXES.find(c => c.id === id);
  return { data: isError || !data ? mockCrux : data, isLoading: isLoading && !isError };
}

export function useSafePortfolio() {
  const { data, isLoading, isError } = useGetPortfolio({ query: { queryKey: getGetPortfolioQueryKey(), retry: 1 } });
  return { data: isError || !data ? MOCK_PORTFOLIO : data, isLoading: isLoading && !isError };
}

export function useSafeRunningLoops() {
  const { data, isLoading, isError } = useGetRunningLoops({ query: { queryKey: getGetRunningLoopsQueryKey(), retry: 1 } });
  return { data: isError || !data ? MOCK_RUNNING_LOOPS : data, isLoading: isLoading && !isError };
}

export function useSafeLearnedPolicies() {
  const { data, isLoading, isError } = useGetLearnedPolicies({ query: { queryKey: getGetLearnedPoliciesQueryKey(), retry: 1 } });
  return { data: isError || !data ? MOCK_LEARNED : data, isLoading: isLoading && !isError };
}

export function useSafePreferences() {
  const { data, isLoading, isError } = useGetPreferences({ query: { queryKey: getGetPreferencesQueryKey(), retry: 1 } });
  return { data: isError || !data ? MOCK_PREFERENCES : data, isLoading: isLoading && !isError };
}
