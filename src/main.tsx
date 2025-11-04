import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./styles/main.scss";
import { ThemeProvider } from "./features/theme/context/ThemeProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
