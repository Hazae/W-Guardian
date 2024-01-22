import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { useState } from "react";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  const [count, setCount] = useState(0);

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
