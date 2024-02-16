import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
// import { useState } from "react";
import "./App.css";
import Home from "./pages/home";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Home />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;