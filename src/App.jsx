import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MembershipStep1 from "./components/MembershipStep1";
import MembershipStep2 from "./components/MembershipStep2";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <MembershipStep1 />,
  },
  {
    path: "/step-2",
    element: <MembershipStep2 />,
  },
]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <RouterProvider router={router} />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
