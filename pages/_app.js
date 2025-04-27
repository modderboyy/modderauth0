import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/layout/Layout';
import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      </QueryClientProvider>
    </ThemeProvider>
  );
}