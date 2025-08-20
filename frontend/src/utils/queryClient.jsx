import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (was cacheTime)
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
})


function QueryProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
   
    </QueryClientProvider>
  );
}

export default QueryProvider