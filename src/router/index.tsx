import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "@/shared/components/layout/RootLayout";
import { CountryDetailPage } from "@/features/pages/CountryDetailPage";
import { HomePage } from "@/features/pages/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/country/:code",
        element: <CountryDetailPage />,
      },
    ],
  },
]);
