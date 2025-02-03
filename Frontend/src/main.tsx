import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";

export function Root() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <StrictMode>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_G_CLIENT_ID}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<Root />);
