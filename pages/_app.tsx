import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence initial={false} mode="popLayout">
        <Component {...pageProps} />
      </AnimatePresence>
    </QueryClientProvider>
  );
}
