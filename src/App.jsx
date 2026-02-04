import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MembershipStep1 from "./components/MembershipStep1";
import MembershipStep2 from "./components/MembershipStep2";
import MembershipStep3 from "./components/MembershipStep3";
import MembershipStep4 from "./components/MembershipStep4";

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
  {
    path: "/step-3",
    element: <MembershipStep3 />,
  },
  {
    path: "/step-4",
    element: <MembershipStep4 />,
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
