import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import "react-phone-number-input/style.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RegisterPhonePage from "./pages/registerPhone";
import SendMessagePage from "./pages/sendMessage";
import ShowQrPage from "./pages/showQr";
import NotFoundPage from "./pages/404";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RegisterPhonePage />,
  },
  {
    path: "/:id",
    element: <SendMessagePage />,
  },
  {
    path: "/:id/showqr",
    element: <ShowQrPage />,
  },
  {
    path: "*",
    element: <div>404</div>,
  },
  {
    path: "/404",
    element: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
