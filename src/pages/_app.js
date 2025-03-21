import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/reactQuery";

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
