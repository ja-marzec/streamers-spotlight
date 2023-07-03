import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  StreamerDetails,
  StreamersVotingWithSubmition,
  ErrorPage,
  streamerDetailsLoader,
  streamersVotingLoader,
  PageLayout
} from "./routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PageLayout>
        <StreamersVotingWithSubmition />
      </PageLayout>
    ),
    errorElement: (
      <PageLayout>
        <ErrorPage />
      </PageLayout>
    ),
    loader: streamersVotingLoader,
  },
  {
    path: "/:streamerId",
    element: (
      <PageLayout>
        <StreamerDetails />
      </PageLayout>
    ),
    loader: streamerDetailsLoader,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
