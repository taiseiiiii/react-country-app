import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../shared/components/layout/RootLayout";
import { HomePage } from "../features/pages/HomePage";
import { CountryDetailPage } from "../features/pages/CountryDetailPage";

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
